import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './saga';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

let middleware;
let initialState = {
	invites: []
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
	sagaMiddleware = createSagaMiddleware();

middleware = applyMiddleware(sagaMiddleware);

const store = createStore(reducers, initialState, composeEnhancers(middleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<App />
		</MuiPickersUtilsProvider>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
