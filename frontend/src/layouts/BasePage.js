import React from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import MainPage from './MainPage';
import Login from '../components/login/Login'
import Inscription from '../components/register/Register';
import PasswordForgotten from '../components/passwordForgotten/PasswordForgotten';
import { CookiesProvider } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const mapStateToProps = (state) => ({
    registerDemand: state.demand.registerDemand,
    connexionDemand: state.demand.connexionDemand,
    passwordDemand: state.demand.passwordDemand
});

const BasePage = ({ dispatch, connexionDemand, registerDemand, passwordDemand }) => (
    <div>
        {!passwordDemand && !connexionDemand && !registerDemand && <Menu />}
        {!registerDemand && !connexionDemand && !passwordDemand &&<MainPage />}
        <CookiesProvider>
        {registerDemand && !connexionDemand && !passwordDemand && <Inscription dispatch={dispatch} />}
        {connexionDemand && !registerDemand && !passwordDemand && <Login dispatch={dispatch} cookies={cookies}/>}
        </CookiesProvider>
        {passwordDemand && !connexionDemand && !registerDemand && <PasswordForgotten dispatch={dispatch}/>}
    </div>
);
export default connect(mapStateToProps)(BasePage);
