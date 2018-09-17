import { put, call, takeEvery, select } from 'redux-saga/effects';
import createToken from 'uuid/v4';
import TYPES from '../actions/types';
import { tasksRef, tokenUpdate } from '../firestore';
import { func } from 'prop-types';

let dataRef = tasksRef;

function* fetch({ type, token }) {
	try {
		const data = yield call(() => dataRef.get().then(doc => doc.data()));

		yield put({
			type: TYPES.FETCH_SUCCESS,
			data: data
		});
	} catch (error) {
		console.error(error);
	}
}

function* finish({ type, data }) {
	try {
		const tasks = yield select(getTasks);
		tasks[data.id].finished = !tasks[data.id].finished;

		yield call(() => dataRef.update({ tasks: tasks }));

		yield put({
			type: TYPES.FETCH
		});
	} catch (error) {
		console.error(error);
	}
}

function* edit({ type, data }) {
	try {
		const tasks = yield select(getTasks);
		tasks[data.id] = { ...tasks[data.id], ...data.values };

		yield call(() => dataRef.update({ tasks: tasks }));

		yield put({
			type: TYPES.FETCH
		});
	} catch (error) {
		console.error(error);
	}
}

function* add({ type, data }) {
	try {
		const tasks = yield select(getTasks);
		tasks.push({ ...data.values, key: createToken(), finished: false });

		yield call(() => dataRef.update({ tasks: tasks }));

		yield put({
			type: TYPES.FETCH
		});
	} catch (error) {
		console.error(error);
	}
}

function* remove({ type, data }) {
	console.log('data: ', data);
	try {
		const tasks = yield select(getTasks);
		tasks.splice(data.id, data.id);
		console.log('tasks: ', tasks);

		yield call(() => dataRef.set({ tasks: tasks }));

		yield put({
			type: TYPES.FETCH
		});
	} catch (error) {
		console.error(error);
	}
}

function* createTodo() {
	try {
		const token = createToken();

		yield call(() => dataRef.doc(token).set({ tasks: [] }));
		localStorage.setItem('token', JSON.stringify(token));
		dataRef = dataRef.doc(token);

		yield put({
			type: TYPES.CREATE_TODO_SUCCESS,
			data: {
				token
			}
		});
	} catch (error) {
		console.error(error);
	}
}

export default function* rootSaga() {
	yield [
		takeEvery(TYPES.FETCH, fetch),
		takeEvery(TYPES.FINISH, finish),
		takeEvery(TYPES.EDIT, edit),
		takeEvery(TYPES.ADD, add),
		takeEvery(TYPES.REMOVE, remove),
		takeEvery(TYPES.CREATE_TODO, createTodo)
	];
}

const getTasks = state => state.todo.tasks;
