import { combineReducers } from 'redux';

import user from './user';
import message from './message';
import project from './project';
import demand from './demand';
import task from "./task";
import category from './category'
import calendar from './calendar';
import milestone from './milestone'

const reducers = combineReducers({
  user, message, project, demand, task, category, calendar, milestone
});

export default reducers;
