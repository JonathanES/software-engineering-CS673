import {put, takeEvery} from 'redux-saga/effects'




function* handleProjectTaskDemand(action){
    yield put({type: "PROJECT_TASK_DEMAND", projectTaskList: action.projectTaskList});
}

 function *taskSaga(){
    yield takeEvery('USER_PROJECT_TASK_DEMAND', handleProjectTaskDemand);
}

export default taskSaga;