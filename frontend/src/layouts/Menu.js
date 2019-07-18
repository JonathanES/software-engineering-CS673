import React from 'react';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
    registerDemand: state.demand.registerDemand,
    connexionDemand: state.demand.connexionDemand,
    username: state.user.username,
});

const Menu = ({ dispatch, connexionDemand, registerDemand }) => (
    <div>
        <aside>
            {!connexionDemand && !registerDemand &&
                <div>
                    <figure>
                        <div id="avatar"></div>
                        <figcaption>(profile name)</figcaption>
                    </figure>
                    <nav>
                        <ul>    
                            <li><a href="#" onClick={(e) => {
                                dispatch({ type: 'USER_PROJECT_DEMAND' })
                                dispatch({ type: 'USER_VIEW_PROJECT' })
                            }
                            }>Projects</a></li>
                            {<li><a onClick={(e) => dispatch({ type: 'USER_TASK_DEMAND' })} id="task">Tasks</a></li>}
                            <li><a href="#" onClick={(e) => dispatch({ type: 'USER_ISSUE_DEMAND' })}>Issues</a></li>
                            <li><a href="#" onClick={(e) => dispatch({ type: 'USER_MESSAGE_DEMAND' })}>Messages</a></li>
                            {registerDemand && !connexionDemand && <li><a onClick={(e) => dispatch({ type: 'USER_CONNEXION_DEMAND' })} id="connect" >Login</a></li>}
                            {!registerDemand && !connexionDemand && <li><a className="red" onClick={(e) => dispatch({ type: 'USER_LOGOUT' })} id="disconnect"> Logout</a></li>}
                            {!registerDemand && connexionDemand && <li><a className="red" onClick={(e) => dispatch({ type: 'USER_REGISTER_DEMAND' })} id="register">Register</a></li>}

                        </ul>
                    </nav>
                </div>
            }
        </aside>
    </div>
);

/*

    <div>
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
    </div>
    */

export default connect(mapStateToProps)(Menu);