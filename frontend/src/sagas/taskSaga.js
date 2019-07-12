import {put, takeEvery} from 'redux-saga/effects'




function* handleProjectTaskDemand(action){
    yield put({type: "PROJECT_TASK_DEMAND", projectTaskList: action.projectTaskList});
}

function *handleAddTaskDemand(){
    yield put({type: 'ADD_TASK_DEMAND'});
}


 function *taskSaga(){
    yield takeEvery('USER_PROJECT_TASK_DEMAND', handleProjectTaskDemand);
    yield takeEvery('USER_ADD_TASK_DEMAND', handleAddTaskDemand);
}



export default taskSaga;