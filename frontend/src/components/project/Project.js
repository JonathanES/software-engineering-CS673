import React from "react";
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addProject, getListOfProjects, showCategories } from '../../socket/projectSocket';
import ProjectTask from '../Task/projectTask.js';
//import {userId} from '../../socket/userSocket';
import '../../css/project.css'

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    projectID: state.project.projectID,
    isProjectSelected: state.project.isProjectSelected
    //taskname: state.Task.newtask
});

class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            username: props.username,
            projectID: props.projectID,
            getListofProjects : [],
            projectcategories: [],
            newtask: '',
            projectName: "User Projetcs"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickProject= this.handleClickProject.bind(this);

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
        console.log('Add Project button pressed before call');

        addProject(this.state.username, this.state.newproject, (err, data) => {
            console.log('Add Project button pressed');
            this.setState({ newproject: data });
            console.log("inside handleSubmit");

        })
        event.preventDefault();
    }

    handleClick(event) {
        console.log('Add Task button pressed before call');

        showCategories(this.state.projectID, (err, data) => {
            console.log('Add Project button pressed');
            this.setState({ projectcategories: data });
            console.log("inside handleSubmit");

        })
        event.preventDefault();
    }

    handleClickProject(event) {
        showCategories(event.currentTarget.id, (err,data) => {
            console.log(data);
            console.log(event);
            //this.setState({projectName:  data[0].ProjectName})
            this.setState({projectName: data.length == 0 ? this.state.projectName : data[0].ProjectName})
           this.props.dispatch({type:'USER_PROJECT_TASK_DEMAND', projectTaskList:data});
        });

        this.props.dispatch({type:'USER_IS_PROJECT_DEMAND'});
        

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div class="direct">
                    <div class="title">{this.state.projectName}</div>
                    <ul>
                        {!this.props.isProjectSelected && this.state.getListofProjects.map(project =>
                            <li>
                                <div id={project.projectID} onClick={this.handleClickProject}>
                                    {/* <div class={project.isadd == "true" ? "yuan yuanselect" : "yuan"}></div> */}
                                    <div class="user-project" >
                                        <span class="span-project-mid">{project.projectName}</span>
                                    </div>
                                </div>
                            </li>
                        )}
                        {this.props.isProjectSelected && <ProjectTask  dispatch={this.props.dispatch}/>}
                    </ul>
                </div>

                {/* <div class="add_task"> */}
                <div>
                    <form onSubmit={this.handleSubmit}>
                        {/* <input id="add-task-input" type="text" value={this.state.newtask} onChange={this.handleChange} /> */}
                        <button id="add-project-button" type="submit" onClick={this.handleClick}>Add Project</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Project);
