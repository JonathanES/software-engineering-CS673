import React from "react";
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addProject, getListOfProjects, showCategories } from '../../socket/projectSocket';
import {getuserprev} from '../../socket/taskSocket';
import ProjectTask from '../Task/projectTask.js';
import ProjectForm from '../project/ProjectForm';
//import {userId} from '../../socket/userSocket';
import '../../css/project.css'

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    //projectID: state.project.projectID,
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
            pID: '',
            getListofProjects : [],
            listOfProjects: [],
            projectcategories: [],
            projectName: "User Projects"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);

    }

    componentDidMount() {
        

        getListOfProjects(this.state.userId, (err, data) => {
            this.setState({ listOfProjects: data });
            //console.log('getlistofProjects for user:', this.state.userId);
            //console.log('getlistofProjects for projectID:', this.state.pID);

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

    handleUpdateClick(event) {

        // console.log("update button for project id:",event.currentTarget.id, " is pressed for user:", this.state.userId );
        let pID = parseInt(this.newMethod(event));
        // getuserprev(this.newMethod(event), this.state.userId, (err,data) => {
        getuserprev(pID, this.state.userId, (err,data) => {
            console.log(data[0].AccountTypeID);

            if(data[0].AccountTypeID == 1){
                console.log('Call the update page with id: ', pID);

                this.props.dispatch({type:'USER_PROJECTUPDATE_DEMAND', projectID: pID});
            }
            else{
                console.log('Sorry you don\'t have the admin privilidges' );
            }
        })
        
    }

    newMethod(event) {
        return event.currentTarget.id;
    }

    handleClick(event) {

        console.log('event id:', event.currentTarget.id);
        
        switch (event.currentTarget.id) {
            case "add-project-button":
                //console.log('Project ID:', this.project.projectID)
                console.log('Add Task button pressed before call');
                this.props.dispatch({ type: 'USER_PROJECTFORM_DEMAND' });
                break;
            // case "updatebtn" + event.currentTarget.id:
            //     // this.setState({uID: this.state.userId});
            //     console.log("update button for project id:",event.currentTarget.id, " is pressed for user:", this.state.userId );
            //     // getuserprev()
            default:
                console.log('src/component/project/project.js Project button is clicked:', event.currentTarget.id);
                this.setState({pID: event.currentTarget.id});
                console.log('getlistofProjects for projectID:', this.props.pID);

                showCategories(event.currentTarget.id, (err,data) => {
                    this.setState({projectName: data.length == 0 ? this.state.projectName : data[0].ProjectName})
                    this.props.dispatch({type:'USER_PROJECT_TASK_DEMAND', projectID:event.currentTarget.id, projectTaskList:data});
                });
        
                this.props.dispatch({type:'USER_IS_PROJECT_DEMAND', projectID:event.currentTarget.id});
                
            }
            event.preventDefault();
    }


    render() {
        return (
            <div>
                <div class="project">
                    <div class="title">{this.state.projectName}</div>
                    <ul >
                        {!this.props.isProjectSelected && this.state.listOfProjects.map(project =>
                            <li>
                                <a id={project.projectID} onClick={this.handleClick}></a>
                                <div>
                                    <span id={project.projectID} onClick={this.handleClick} class="project-content">{project.projectName}</span>
                                </div>
                                {<a class="updatebtn" id ={project.projectID} onClick={this.handleUpdateClick}> </a>}
                            </li>
                        )}
                        {this.props.isProjectSelected && <ProjectTask dispatch={this.props.dispatch} />}
                    </ul>
                    {!this.props.isProjectSelected &&
                    <div>
                        <form onClick={this.handleClick}>
                            {/* <input id="add-task-input" type="text" value={this.state.newtask} onChange={this.handleChange} /> */}
                            {/* <button id="add-project-button" class="addprojectbtn" type="click" onClick={this.handleClick}>Add Project</button> */}
                            <button id="add-project-button" class="addprojectbtn" onClick={this.handleClick}>Add Project</button>
                        </form>
                    </div>
                    }


                </div>

                {/* <div class="add_task"> */}

            </div>
        );
    }
}

//export default Project;
export default connect(mapStateToProps)(Project);
