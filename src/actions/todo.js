export const TYPES = {
	FETCH: 'FETCH',
	FETCH_SUCCESS: 'FETCH_SUCCESS',
	FINISH: 'FINISH',
	EDIT: 'EDIT',
	ADD: 'ADD',
	REMOVE: 'REMOVE',
	CREATE_TODO: 'CREATE_TODO',
	CREATE_TODO_SUCCESS: 'CREATE_TODO_SUCCESS'
};

export const fetch = () => ({
	type: TYPES.FETCH
});

export const finish = id => ({
	type: TYPES.FINISH,
	data: {
		id
	}
});

export const edit = data => ({
	type: TYPES.EDIT,
	data: {
		...data
	}
});

export const add = data => ({
	type: TYPES.ADD,
	data: {
		...data
	}
});

export const remove = id => ({
	type: TYPES.REMOVE,
	data: {
		id
	}
});

export const createTodo = () => ({
	type: TYPES.CREATE_TODO
});
