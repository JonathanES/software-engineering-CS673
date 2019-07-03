import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/login/Login';
import Inscription from '../components/register/Register';
import Chat from '../components/chat/Chat';
import Menu from './Menu';

const mapStateToProps = state => ({
    username: state.user.username,
    id_user: state.user.id_user,
    registerDemand: state.user.registerDemand,
    connexionDemand: state.user.connexionDemand
});

const MainPage = ({ dispatch, connexionDemand, registerDemand }) => (
    <div id="test">
        <Menu />
        <main>
            {registerDemand && !connexionDemand && <Inscription dispatch={dispatch} />}
            {connexionDemand && !registerDemand && <Login dispatch={dispatch} />}
            {!connexionDemand && !registerDemand && <a href="#" class="cta"> Create your Project </a>}
        </main>
    </div>
);

export default connect(mapStateToProps)(MainPage);
