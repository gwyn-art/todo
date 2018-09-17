import todo from './todo';

export default function* rootSaga() {
	yield [todo()];
}
