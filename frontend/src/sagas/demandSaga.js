import {put, takeEvery} from 'redux-saga/effects'

function* handleMessageDemand(){
    yield put({type: "MESSAGE_DEMAND"});
}
function* handleProjectDemand(){
    yield put({type: "PROJECT_DEMAND"});
}

function* handleRegisterDemand(){
    yield put({type: "REGISTER_DEMAND"});
}

function* handleConnexionDemand(){
    yield put({type: "CONNEXION_DEMAND"});
}

function* handleIssueDemand(){
    yield put({type: "ISSUE_DEMAND"});
}

function* handleTaskDemand(){
    yield put({type: "TASK_DEMAND"});
}

// function* handleProjectTaskDemand(action){
//     yield put({type: "PROJECTTASK_DEMAND", projectID:action.projectID});
// }

function* handleAddTaskDemand(action){
    yield put({type: "ADD_TASK_DEMAND", categoryID:action.categoryID});
}

function* handleLogOut(){
    yield put({type: "LOGOUT"});
    yield put({type: "DEMAND_LOGOUT"})
}

function *demandSaga(){
    yield takeEvery('USER_MESSAGE_DEMAND', handleMessageDemand);
    yield takeEvery('USER_PROJECT_DEMAND', handleProjectDemand);
    yield takeEvery('USER_LOGOUT', handleLogOut);
    yield takeEvery('USER_REGISTER_DEMAND', handleRegisterDemand);
    yield takeEvery('USER_CONNEXION_DEMAND', handleConnexionDemand);
    yield takeEvery('USER_ISSUE_DEMAND', handleIssueDemand);
    yield takeEvery('USER_TASK_DEMAND', handleTaskDemand);
    yield takeEvery('USER_ADD_TASK_DEMAND', handleAddTaskDemand);
    //yield takeEvery('USER_PROJECTTASK_DEMAND', handleProjectTaskDemand);
}

export default demandSaga;