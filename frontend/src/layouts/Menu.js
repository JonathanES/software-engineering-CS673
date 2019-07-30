import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const mapStateToProps = state => ({
    registerDemand: state.demand.registerDemand,
    connexionDemand: state.demand.connexionDemand,
    username: state.user.username
});

const cookies = new Cookies();

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'project'
        };
    }

    componentDidMount(){
        this.props.dispatch({ type: 'USER_PROJECT_DEMAND' });
        this.props.dispatch({ type: 'USER_VIEW_PROJECT' });	
    }
    render() {
        return (
            <aside>
                <figure>
                    <div id="avatar"></div>
                    <figcaption>{this.props.username}</figcaption>
                </figure>
                <ul className="ul-menu">
                    <li><a href="#" className={this.state.selected == "project" ? "red" : ""} onClick={(e) => {
                        this.props.dispatch({ type: 'USER_PROJECT_DEMAND' });
                        this.props.dispatch({ type: 'USER_VIEW_PROJECT' });	
                        this.setState({ selected: "project" });
                    }
                    }>Projects</a></li>
                    {<li><a href="#" className={this.state.selected == "task" ? "red" : ""} onClick={(e) => {
                        this.props.dispatch({ type: 'USER_TASK_DEMAND' });
                        this.setState({ selected: "task" });

                    }
                    }>Tasks</a></li>}
                     <li><a href="#" onClick={(e) => dispatch({ type: 'USER_MILESTONE_DEMAND' })}>Milestones</a></li>

                    <li><a href="#" className={this.state.selected == "issue" ? "red" : ""} onClick={(e) => {
                        this.props.dispatch({ type: 'USER_ISSUE_DEMAND' })
                        this.setState({ selected: "issue" });
                    }}>Issues</a></li>

                    <li><a href="#" className={this.state.selected == "message" ? "red" : ""} onClick={(e) => {
                        this.props.dispatch({ type: 'USER_MESSAGE_DEMAND' })
                        this.setState({ selected: "message" });
                    }}>Messages</a></li>

                    <li><a href="#" className={this.state.selected == "calendar" ? "red" : ""} onClick={(e) => {
                        this.props.dispatch({ type: 'USER_CALENDAR_DEMAND' })
                        this.setState({ selected: "calendar" });
                    }}>Calendar</a></li>
                    {this.props.registerDemand && !this.props.connexionDemand && <li><a onClick={(e) => this.props.dispatch({ type: 'USER_CONNEXION_DEMAND' })} id="connect" >Login</a></li>}
                    {!this.props.registerDemand && !this.props.connexionDemand && <li><a href="#" className={this.state.selected == "logout" ? "red" : ""} onClick={(e) => {
                        this.props.dispatch({ type: 'USER_LOGOUT' });
                        this.setState({ selected: "logout" });
                        if (cookies) {
                            cookies.remove('username');
                            cookies.remove('userId');
                        }

                    }} id="disconnect"> Logout</a></li>}
                    {!this.props.registerDemand && this.props.connexionDemand && <li><a className="red" onClick={(e) => this.props.dispatch({ type: 'USER_REGISTER_DEMAND' })} id="register">Register</a></li>}
                </ul>
            </aside>
        )
    }
}
// const Menu = ({ dispatch, connexionDemand, registerDemand, username }) => (
//     <aside>
//         <figure>
//             <div id="avatar"></div>
//             <figcaption>{username}</figcaption>
//         </figure>
//         <ul className="ul-menu">
//             <li><a href="#" className={selected == "project" ? "red" : ""} onClick={(e) => {
//                 dispatch({ type: 'USER_PROJECT_DEMAND' });
//                 selected = "project";
//             }
//             }>Projects</a></li>
//             {<li><a href="#" onClick={(e) => dispatch({ type: 'USER_TASK_DEMAND' })}>Tasks</a></li>}
//             <li><a href="#" onClick={(e) => dispatch({ type: 'USER_ISSUE_DEMAND' })}>Issues</a></li>
//             <li><a href="#" onClick={(e) => dispatch({ type: 'USER_MESSAGE_DEMAND' })}>Messages</a></li>
//             <li><a href="#" onClick={(e) => dispatch({ type: 'USER_CALENDAR_DEMAND' })}>Calendar</a></li>
//             {registerDemand && !connexionDemand && <li><a onClick={(e) => dispatch({ type: 'USER_CONNEXION_DEMAND' })} id="connect" >Login</a></li>}
//             {!registerDemand && !connexionDemand && <li><a className="red" onClick={(e) => {
//                 dispatch({ type: 'USER_LOGOUT' });
//                 if (cookies) {
//                     cookies.remove('username');
//                     cookies.remove('userId');
//                 }

//             }} id="disconnect"> Logout</a></li>}
//             {!registerDemand && connexionDemand && <li><a className="red" onClick={(e) => dispatch({ type: 'USER_REGISTER_DEMAND' })} id="register">Register</a></li>}

//         </ul>
//     </aside>
// );


export default connect(mapStateToProps)(Menu);
