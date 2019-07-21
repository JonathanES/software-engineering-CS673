import React from "react";
import { connect } from 'react-redux';
import io from "socket.io-client";
import { addProject, getListOfProjects, showCategories } from '../../socket/projectSocket';
import { getuserprev } from '../../socket/taskSocket';
import ProjectTask from '../Task/projectTask.js';
import ProjectForm from '../project/ProjectForm';
//import {userId} from '../../socket/userSocket';
import { socket } from '../../socket/config'
import '../../css/project.css'

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    //projectID: state.project.projectID,
    isProjectSelected: state.project.isProjectSelected,
    projectForm: state.project.projectForm,
    project: {}
    //taskname: state.Task.newtask
});

class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            username: props.username,
            pID: 0,
            //getListofProjects : [],
            listOfProjects: [],
            projectcategories: [],
            projectName: "User Projects"

        };

        this.handlePictureClick = this.handlePictureClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);

    }

    componentDidMount() {
        getListOfProjects(this.props.userId, (err, data) => {
            this.setState({ listOfProjects: data });
            //console.log('getlistofProjects for user:', this.state.userId);
            //console.log('getlistofProjects for projectID:', this.state.pID);
        });
        socket.on('GET_PROJECTCATEGORIES', data => {
            this.props.dispatch({ type: 'USER_IS_PROJECT_DEMAND', projectID: this.state.project.projectId, projectCategoryList: data.length > 0 ? data : [], projectName: this.state.project.projectName });
        });
    }

    handleChange(event) {
        // this.setState({ newproject: event.target.value });
        //console.log("inside handleChange:" + event.target.value);
    }
    handlePictureClick(project) {
        console.log(project);
        this.setState({project: project})
        showCategories(project.projectId)/*, (err, data) => {
            console.log(data);
            this.props.dispatch({ type: 'USER_IS_PROJECT_DEMAND', projectID: project.projectId, projectCategoryList: data.length > 0 ? data : [], projectName: project.projectName });
        });*/
    }

    handleUpdateClick(event) {

        // console.log("update button for project id:",event.currentTarget.id, " is pressed for user:", this.state.userId );
        let pID = parseInt(this.newMethod(event));
        // getuserprev(this.newMethod(event), this.state.userId, (err,data) => {
        getuserprev(pID, this.state.userId, (err, data) => {
            //console.log(data[0].AccountTypeID);

            if (data[0].AccountTypeID == 1) {
                //console.log('Call the update page with id: ', pID);

                this.props.dispatch({ type: 'USER_PROJECTUPDATE_DEMAND', projectID: pID });
            }
            else {
                console.log('Sorry you don\'t have the admin privilidges');
            }
        })

    }

    newMethod(event) {
        return event.currentTarget.id;
    }

    handleClick(e) {
        this.props.dispatch({ type: 'USER_PROJECTFORM_DEMAND' });
        e.preventDefault();
    }


    render() {
        return (
            <div>
                <div class="project">
                    {/* <div class="title">You are working on Project : {this.state.projectName}</div> */}
                    <ul >
                        {!this.props.isProjectSelected && this.state.listOfProjects.map(project =>
                            <li>
                                <a id={project.projectID} onClick={(e) => {
                                    this.handlePictureClick(
                                        {
                                            projectId: project.projectID, projectName: project.projectName
                                        }
                                    ); e.preventDefault()
                                }}></a>
                                <div>
                                    <span id={project.projectID} onClick={(e) => {
                                        this.handlePictureClick(
                                            {
                                                projectId: project.projectID, projectName: project.projectName
                                            }
                                        ); e.preventDefault()
                                    }} class="project-content">{project.projectName}</span>
                                </div>
                                {<a class="updatebtn" id={project.projectID} onClick={this.handleUpdateClick}> </a>}
                            </li>
                        )}
                        {this.props.isProjectSelected && <ProjectTask dispatch={this.props.dispatch} />}
                    </ul>
                    {!this.props.isProjectSelected &&
                        <form onClick={this.handleClick}>
                            <button id="add-project-button" class="addprojectbtn" onClick={(e) => this.handleClick(e)}>Add Project</button>
                        </form>
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Project);
