import { combineReducers } from 'redux';

import user from './user';
import message from './message';
import project from './project';
import demand from './demand';

const reducers = combineReducers({
  user, message, project, demand
});

export default reducers;