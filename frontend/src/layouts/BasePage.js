import React from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import MainPage from './MainPage';
import Login from '../components/login/Login'
import Inscription from '../components/register/Register';

const mapStateToProps = state => ({
    registerDemand: state.demand.registerDemand,
    connexionDemand: state.demand.connexionDemand
});

const BasePage = ({ dispatch, connexionDemand, registerDemand }) => (
    <div>
        <Menu />
        <MainPage />
        {registerDemand && !connexionDemand && <Inscription dispatch={dispatch} />}
        {connexionDemand && !registerDemand && <Login dispatch={dispatch} />}
    </div>
);
export default connect(mapStateToProps)(BasePage);
