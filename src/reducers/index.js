import { combineReducers } from 'redux';

import rootSaga from '../saga';
import todo from './todo';

export default combineReducers({todo});
