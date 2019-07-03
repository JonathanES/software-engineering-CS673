import React from 'react';

import { connect } from 'react-redux';
import '../css/project.css'

const mapStateToProps = state => ({
    registerDemand: state.user.registerDemand,
    connexionDemand: state.user.connexionDemand,
    username: state.user.username,
    tasks: state.user.tasks
});

const Menu = ({ dispatch, connexionDemand, registerDemand, username }) => (
    <aside>
      <figure>
        <div id="avatar"></div>
        <figcaption>(profile name)</figcaption>
      </figure>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Tasks</a></li>
          <li><a href="#">Issues</a></li>
          <li><a href="#">Upload files</a></li>
          <li><a href="#">Messages</a></li>
          <li><a href="#">Calendar</a></li>
        </ul>
      </nav>
    </aside>
);
/*
<div className="header">
            <nav>
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        {connexionDemand && !registerDemand && <a onClick={(e) =>  dispatch({ type: 'USER_CONNEXION_DEMAND'})} id="connect" >Login</a>}
                        {!registerDemand &&  !connexionDemand && <a className="red" onClick={(e) => dispatch({ type: 'USER_LOGOUT'})} id="disconnect">{username} Logout</a>}
                        {registerDemand &&  !connexionDemand && <a className="red" onClick={(e) =>  dispatch({ type: 'USER_REGISTER_DEMAND'})} id="register">Register</a>}
                        {!registerDemand &&  !connexionDemand && <a className="red" onClick={(e) =>  dispatch({ type: 'TASK_CONTROL'})} id="task">Tasks</a>}
                    </ul>
                </div>
            </nav>
            <div className="links">
                {registerDemand &&  !connexionDemand && <a onClick={(e) =>  dispatch({ type: 'USER_CONNEXION_DEMAND'})} id="connect" >Login</a>}
                {!registerDemand &&  !connexionDemand && <a className="red" onClick={(e) =>  dispatch({ type: 'TASK_CONTROL'})} id="task"> Tasks</a>}
                {!registerDemand &&  !connexionDemand && <a className="red" onClick={(e) => dispatch({ type: 'USER_LOGOUT'})} id="disconnect"> Logout</a>}
                {!registerDemand &&  connexionDemand && <a className="red" onClick={(e) =>  dispatch({ type: 'USER_REGISTER_DEMAND'})} id="register">Register</a>}
                
            </div>
        </div>
*/

export default connect(mapStateToProps)(Menu);