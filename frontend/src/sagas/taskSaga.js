import {put, takeEvery} from 'redux-saga/effects'

function *handleAddTaskDemand(action){
    yield put({type: 'ADD_TASKFORM_DEMAND', categoryID: action.categoryID});
}

 function *taskSaga(){
    yield takeEvery('USER_ADD_TASKFORM_DEMAND', handleAddTaskDemand);
}



export default taskSaga;