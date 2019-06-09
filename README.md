
 ---------------------------------------------------------------------
    |                                                                   |
    |                SWELLODESK | SWELLO TEAM
    |                                                                   |
    ---------------------------------------------------------------------

## How to use the project

1. Clone
2. Install the dependencies - `npm install` at the root, `npm install` at the root of the backend directory, `npm install` at the root of the frontend direcory
3. `npm run dev` to launch the frontend and backend at the same time

Example of how the login works in the current architecture:
1) The user login request is received by the login component (frontend/src/components/login/Login.js)
2) email and password are sent to the login thanks to the socket function login (frontend/src/socket/userSocket)
3) the socket emit a request to the backend socket.emit('USER_LOGIN', email, password);
4) this socket request is received in the backend/socket/handler/managers/userManager.js (client.on('USER_LOGIN', async (email, password))
5) the email and password will be sent to the function in the userController (backend/controller/userController.js) called getSingleUser
6) When the controller has finished treating the data, it will be returned to the frontend (            client.emit('LOGIN', result);
)
7) the frontend will receive the information from the backend in the file frontend/src/socket/userSocket.js   This line of code is the one that lets you receive the response from the backend socket.on('LOGIN', data => cb(null, data) ); It also makes a callback so that the response will be retrieved in the file (frontend/src/components/login/Login.js
8) In the file Login.js, it will dispatch the response to the userSaga section (frontend/src/sagas/userSaga.js)
      this.props.dispatch({ type: 'USER_LOGIN', username: data.username, id_user: data.id_user });
9) The userSagas receive the dispatch:     yield takeEvery('USER_LOGIN', handleLogin); and pass the information the handleLogin function
10) handleLogin will put these information in the userReducer.
11) The goal of the reducer is to make the code cleaner when we share informations accross different component/class in React.




