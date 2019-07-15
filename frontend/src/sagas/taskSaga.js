import {put, takeEvery} from 'redux-saga/effects'




 function* handleProjectTaskDemand(action){
     yield put({type: "PROJECT_TASK_DEMAND", projectID:action.projectID, projectTaskList: action.projectTaskList});
 }

function *handleAddTaskDemand(action){
    yield put({type: 'ADD_TASKFORM_DEMAND', categoryID: action.categoryID});
}


 function *taskSaga(){
    yield takeEvery('USER_PROJECT_TASK_DEMAND', handleProjectTaskDemand);
    yield takeEvery('USER_ADD_TASKFORM_DEMAND', handleAddTaskDemand);
}



export default taskSaga;