import * as firebase from 'firebase';
import config from './config';

firebase.initializeApp(config);

const databaseRef = firebase.firestore();
let tasks = null;

export const tokenUpdate = () => {
	const token = JSON.parse(localStorage.getItem('token'));
	if (token) {
		tasks = databaseRef.collection('user_tasks').doc(token);
	} else {
		tasks = databaseRef.collection('user_tasks');
	}
};

tokenUpdate();

export const tasksRef = tasks;
