import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/login/Login';
import Inscription from '../components/register/Register';
import Chat from '../components/chat/Chat';
import Menu from './Menu';

const mapStateToProps = state => ({
    username: state.user.username,
    id_user: state.user.id_user,
    registerDemand: state.demand.registerDemand,
    connexionDemand: state.demand.connexionDemand,
    messageDemand: state.demand.messageDemand,
    projectDemand: state.demand.projectDemand,
    issueDemand: state.demand.issueDemand,
    taskDemand: state.demand.taskDemand
});

const MainPage = ({ dispatch, connexionDemand, registerDemand, messageDemand, projectDemand, issueDemand, taskDemand  }) => (
    <div id="test">
        <Menu />
        <main>
            {registerDemand && !connexionDemand && <Inscription dispatch={dispatch} />}
            {connexionDemand && !registerDemand && <Login dispatch={dispatch} />}
            {messageDemand && <Chat dispatch={dispatch} />}
            {projectDemand && <a href="#" class="cta"> Create your Project </a>}
            {issueDemand && <h1>Issue page</h1>}
            {taskDemand && <h1>Task page</h1>}
        </main>
    </div>
);

export default connect(mapStateToProps)(MainPage);
