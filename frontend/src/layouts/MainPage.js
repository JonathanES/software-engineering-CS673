import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/login/login';
import Inscription from '../components/register/register'
import Menu from './Menu';

const mapStateToProps = state => ({
    username: state.user.username,
    id_user: state.user.id_user,
    registerDemand: state.user.registerDemand,
    connexionDemand: state.user.connexionDemand
});

const MainPage = ({ dispatch, connexionDemand, registerDemand}) => (
    <div id="wrapper">
        <Menu />
        {registerDemand && !connexionDemand && <Inscription dispatch={dispatch} />}
        {connexionDemand && !registerDemand && <Login dispatch={dispatch} />}
    </div>
);

export default connect(mapStateToProps)(MainPage);
