import {put, takeEvery} from 'redux-saga/effects'

function* handleLogin(action){
    yield put({type: "LOGIN", username: action.username, id_user: action.id_user, isLoggedIn: action.isLoggedIn});
}

function* handleLogOut(){
    yield put({type: "LOGOUT"});
}

function* handleRegisterDemand(){
    yield put({type: "REGISTER_DEMAND"});
}

function* handleConnexionDemand(){
    yield put({type: "CONNEXION_DEMAND"});
}


function *userSaga(){
    yield takeEvery('USER_LOGIN', handleLogin);
    yield takeEvery('USER_LOGOUT', handleLogOut);
    yield takeEvery('USER_REGISTER_DEMAND', handleRegisterDemand);
    yield takeEvery('USER_CONNEXION_DEMAND', handleConnexionDemand);
}

export default userSaga;