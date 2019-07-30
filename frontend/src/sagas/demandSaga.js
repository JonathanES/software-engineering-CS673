import { put, takeEvery, all } from 'redux-saga/effects'

function* handleMessageDemand() {
    yield put({ type: "MESSAGE_DEMAND" });
}
function* handleProjectDemand() {
    yield put({ type: "PROJECT_DEMAND" });
}

function* handleRegisterDemand() {
    yield put({ type: "REGISTER_DEMAND" });
}

function* handleConnexionDemand() {
    yield put({ type: "CONNEXION_DEMAND" });
}

function* handleIssueDemand() {
    yield put({ type: "ISSUE_DEMAND" });
}

function* handleTaskDemand() {
    yield put({ type: "TASK_DEMAND" });
}

// function* handleProjectTaskDemand(action){
//     yield put({type: "PROJECTTASK_DEMAND", projectID:action.projectID});
// }

function* handleAddTaskDemand(action) {
    yield put({ type: "ADD_TASK_DEMAND", categoryID: action.categoryID });
}

function* handleLogOut() {
    yield put({ type: "LOGOUT" });
    yield put({ type: "DEMAND_LOGOUT" })
}

function* handlePasswordDemand() {
    yield put({ type: "PASSWORD_DEMAND" });
}

function* handleCalendarDemand() {
    yield put({ type: "CALENDAR_DEMAND" });
}

function* handleGetTaskDetailDemand(action) {
    yield put({ type: "TASK_DEMAND" });
    console.log(action.task);
    yield put({ type: 'INFO_TASK_DEMAND', task: action.task });
    yield put ({ type: "USER_DEMAND_TASK_OF_DAY"});


}

function* handleAddTaskFromCalendarDemand(action) {
    yield put({ type: "PROJECT_DEMAND" });
    console.log(action.category);
    yield put({ type: 'ADD_TASKFORM_DEMAND', category: action.category, selectedDate: action.selectedDate });
    yield put ({ type: "USER_DEMAND_TASK_OF_DAY"});
}

function *handleMilestoneDemand(){
    yield put({type: "MILESTONE_DEMAND"});
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
    yield takeEvery('USER_PASSWORD_DEMAND', handlePasswordDemand);
    yield takeEvery('USER_CALENDAR_DEMAND', handleCalendarDemand);
    yield takeEvery('USER_GET_TASK_DETAIL_DEMAND', handleGetTaskDetailDemand);
    yield takeEvery('USER_ADD_TASK_FROM_CALENDAR_DEMAND', handleAddTaskFromCalendarDemand);
    yield takeEvery('USER_MILESTONE_DEMAND', handleMilestoneDemand);


    //yield takeEvery('USER_PROJECTTASK_DEMAND', handleProjectTaskDemand);
}

export default demandSaga;
