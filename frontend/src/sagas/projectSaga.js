import {put, takeEvery } from 'redux-saga/effects'




function* handleProjectDemand(action){
    yield put({type: "IS_PROJECT_DEMAND",project:action.project, projectCategoryList: action.projectCategoryList});
}

// function* handleProjectDemand(){
//     yield put({type: "IS_PROJECT_DEMAND"});
//}

function* handleProjectTaskDemand(action){
    yield put({type: "IS_PROJECTTASK_DEMAND",project:action.project, projectCategoryList: action.projectCategoryList});
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

function* handleProjectUpdate(action){
    yield put({type: "PROJECTUPDATEFORM", project: action.project });
}

function* handleCategoryListDemand(action){
    yield put({type: "UPDATE_CATEGORY_LIST",  projectCategoryList: action.projectCategoryList});
}

function* handleDeleteProjectDemand(action){
    yield put({type: "UPDATE_PROJECT_ISDELETED",  projectID: action.projectID, isDeleted: action.isDeleted});
}

function *handleAddTaskDemand(action){
    yield put({type: 'ADD_TASKFORM_DEMAND', category: action.category});
}

function *handleUpdateReturn(){
    yield put({type: 'UPDATE_RETURN'});
}




 function *projectSaga(){
    yield takeEvery('USER_IS_PROJECT_DEMAND', handleProjectDemand);
    yield takeEvery('USER_IS_PROJECTTASK_DEMAND', handleProjectTaskDemand);
    yield takeEvery('USER_VIEW_PROJECT', handleViewProjectsDemand);
    yield takeEvery('USER_PROJECTFORM_DEMAND', handleAddProjectDemand);
    yield takeEvery('USER_VIEW_PROJECTTASKS', handleViewProjectTasks);
    yield takeEvery('USER_PROJECTUPDATEFORM', handleProjectUpdate);
    yield takeEvery('USER_UPDATE_CATEGORY_LIST', handleCategoryListDemand);
    yield takeEvery('USER_UPDATE_PROJECT_ISDELETED', handleDeleteProjectDemand);
    yield takeEvery('USER_ADD_TASKFORM_DEMAND', handleAddTaskDemand);
    yield takeEvery('USER_UPDATE_RETURN', handleUpdateReturn);
}

export default projectSaga;