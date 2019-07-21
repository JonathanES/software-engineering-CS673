import {put, takeEvery, actionChannel} from 'redux-saga/effects'




function* handleProjectDemand(action){
    yield put({type: "IS_PROJECT_DEMAND",projectID:action.projectID, projectTaskList: action.projectTaskList, projectName:action.projectName});
}

 function* handleViewProjectTasks(action){
     yield put({type: 'VIEW_PROJECTTASKS', projectID: action.projectID })

 }

function* handleViewProjectsDemand(action){
    yield put({type: 'VIEW_PROJECT', projectID: action.projectID});
}

// function* handleAddProjectDemand(action){
//     yield put({type: 'PROJECTFORM_DEMAND', projectForm: action.projectForm});
// }

function* handleAddProjectDemand(){
    yield put({type: 'PROJECTFORM_DEMAND'});
}

function* handleProjectUpdateDemand(action){
    yield put({type: "PROJECTUPDATEFORM_DEMAND", projectID: action.projectID, projectName:action.projectName });
}

function *handleCategoryCreationDemand(){
    yield put({type: 'ADD_CATEGORY_DEMAND'});
}

 function *projectSaga(){
    yield takeEvery('USER_IS_PROJECT_DEMAND', handleProjectDemand);
    yield takeEvery('USER_VIEW_PROJECT', handleViewProjectsDemand);
    yield takeEvery('USER_PROJECTFORM_DEMAND', handleAddProjectDemand);
    yield takeEvery('USER_VIEW_PROJECTTASKS', handleViewProjectTasks);
    yield takeEvery('USER_PROJECTUPDATE_DEMAND', handleProjectUpdateDemand);
    yield takeEvery('USER_ADD_CATEGORY_DEMAND', handleCategoryCreationDemand);
}

export default projectSaga;