import React from "react";
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addProject, getListOfProjects } from '../../socket/projectSocket';
import {userId} from '../../socket/userSocket';
import '../../css/project.css'

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    //taskname: state.Task.newtask
});

class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            username: props.username,
            getListofProjects : [],
            newtask: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        //getMessage();
        getListOfProjects(this.state.userId, (err, data) => {
            //console.log('inside getTaskUsers in ../src/components/Task/Task.js')
            //console.log(data);

            // data.forEach(elt => {
            //     elt.isadd = 'false'
            //     elt.color = "rgb(155, 121, 156)";
            // })
            this.setState({ getListofProjects: data });
        });
    }

    handleChange(event) {
        this.setState({ newproject: event.target.value });
        //console.log("inside handleChange:" + event.target.value);
    }
    handleSubmit(event) {
        console.log('Add Task button pressed before call');

        addProject(this.state.username, this.state.newproject, (err, data) => {
            console.log('Add Project button pressed');
            this.setState({ newproject: data });
            console.log("inside handleSubmit");

        })
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div class="direct">
                    <div class="title">User Projetcs</div>
                    <ul>
                        {this.state.getListofProjects.map(project =>
                            <li>
                                <div id={project.projectName} onClick={this.handleClick}>
                                </div>
                                <div class="user-project" >
                                    <span class="span-user-left">{project.projectName}</span>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                {/* <div class="add_task"> */}
                <div>
                    <form onSubmit={this.handleSubmit}>
                        {/* <input id="add-task-input" type="text" value={this.state.newtask} onChange={this.handleChange} /> */}
                        <button id="add-project-button" type="submit">Add Project</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Project);
