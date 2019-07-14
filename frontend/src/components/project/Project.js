import React from "react";
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addProject, getListOfProjects, showCategories } from '../../socket/projectSocket';
import ProjectTask from '../Task/projectTask.js';
import ProjectForm from '../project/ProjectForm';
//import {userId} from '../../socket/userSocket';
import '../../css/project.css'

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    projectID: state.project.projectID,
    isProjectSelected: state.project.isProjectSelected,
    projectForm: state.project.projectForm
    //taskname: state.Task.newtask
});

class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            username: props.username,
            projectID: '',
            listOfProjects: [],
            projectName: "User Projects",
            //projectForm:
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
        

        getListOfProjects(this.state.userId, (err, data) => {
            this.setState({ listOfProjects: data });
            console.log('getlistofProjects for user:', this.state.userId);
            console.log('getlistofProjects for projectID:', this.state.projectID);

        });
    }

    handleChange(event) {
        // this.setState({ newproject: event.target.value });
        //console.log("inside handleChange:" + event.target.value);
    }
    handleSubmit(event) {
        // console.log('Add Project button pressed before call');
        // this.props.dispatch({ type: 'USER_GET_PROJECTFORM' });
        
        // addProject(this.state.username, this.state.newproject, (err, data) => {
        //     console.log('Add Project button pressed');
        //     this.setState({ newproject: data });
        //     console.log("inside handleSubmit");

        // })
        // event.preventDefault();
    }

    handleClick(event) {

        // console.log('Add Task button pressed before call');

        // showCategories(this.state.projectID, (err, data) => {
        //     console.log('Add Project button pressed');
        //     this.setState({ projectcategories: data });
        //     console.log("inside handleSubmit");

        // })
        // event.preventDefault();
        //event.preventDefault();

        switch (event.target.id) {
            case "add-project-button":
                console.log('Add Task button pressed before call');
                this.props.dispatch({ type: 'USER_PROJECTFORM_DEMAND' });
                break;

            default:
                console.log('src/component/project/project.js Project button is clicked:', event.currentTarget.id);
                this.setState({projectID: event.target.id});
                console.log('getlistofProjects for projectID:', this.state.projectID);
                console.log('projectID assigned:',this.state.projectID);
                //this.props.dispatch({ type: 'ProjectTask dispatch={dispatch} />
                this.props.dispatch({ type: 'USER_VIEW_PROJECTTASKS', projectID: event.target.id });
                this.props.dispatch({ type: 'USER_PROJECTTASK_DEMAND'});
                // showCategories(event.currentTarget.id, (err, data) => {
                //     console.log('function return:', data);
                //     console.log('Add Project button pressed for project id:', event.currentTarget.id );
                //     this.setState({ projectcategories: data });
                //     this.props.dispatch({ type: 'USER_PROJECTTASK_DEMAND', projectTaskList: data });
                //     //console.log("inside handleSubmit");

                // })
            }
            event.preventDefault();
    }


    render() {
        return (
            <div>
                <div class="direct">
                    <div class="title">{this.state.projectName}</div>
                    <ul class="projects">
                        {/* {!this.props.isProjectSelected && this.state.listOfProjects.map(project => */}
                        {this.state.listOfProjects.map(project =>
                            <li class="project_list">
                                {/* <div id={project.projectID} onClick={this.handleClickProject}> */}
                                <div id={project.projectID} onClick={this.handleClick}>
                                    {/* <div class={project.isadd == "true" ? "yuan yuanselect" : "yuan"}></div> */}
                                    <div class="user-project" >
                                        <span class="span-project-mid">{project.projectName}</span>
                                    </div>
                                </div>
                            </li>
                        )}
                        {/* {this.props.isProjectSelected && <ProjectTask dispatch={this.props.dispatch} />} */}
                    </ul>

                    <div>
                        <form onClick={this.handleClick}>
                            {/* <input id="add-task-input" type="text" value={this.state.newtask} onChange={this.handleChange} /> */}
                            {/* <button id="add-project-button" class="addprojectbtn" type="click" onClick={this.handleClick}>Add Project</button> */}
                            <button id="add-project-button" class="addprojectbtn" onClick={this.handleClick}>Add Project</button>
                        </form>
                    </div>

                </div>

                {/* <div class="add_task"> */}

            </div>
        );
    }
}

//export default Project;
export default connect(mapStateToProps)(Project);
