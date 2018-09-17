import TYPES from '../actions/types';

const initialState = {
	tasks: [],
	token: localStorage.getItem('token')
};

export default (state = initialState, { type, ...action }) => {
	switch (type) {
		case TYPES.FETCH_SUCCESS:
			return {
				...state,
				checked: true,
				tasks: action.data.tasks.sort((x, y) => x.finish_date < y.finish_date)
			};
		case TYPES.CREATE_TODO_SUCCESS:
			return {
				...state,
				checked: true,
				token: action.data.token
			};
		default:
			return state;
	}
};
