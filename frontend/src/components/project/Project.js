import React from "react";
import { connect } from 'react-redux';
import { getListOfProjects, showCategories, showCategories_old } from '../../socket/projectSocket';
import { getUserPrev } from '../../socket/taskSocket';
import ProjectTask from '../Task/projectTask.js';
import ProjectUpdate from '../project/projectUpdate.js';
import ProjectForm from './ProjectForm';
import TaskForm from '../task-design/TaskForm';
import ProjectTaskUpdate from '../Task/projectTaskUpdate';
//import {userId} from '../../socket/userSocket';
import { socket } from '../../socket/config'
import '../../css/project.css'


const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    isProjectSelected: state.project.isProjectSelected,
    isProjectUpdateSelected: state.project.isProjectUpdateSelected,
    isProjectTasksSelected: state.project.isProjectTasksSelected,
    isProjectForm: state.project.isProjectForm,
    isAddTaskForm: state.project.isAddTaskForm,
    isUpdateTaskForm: state.project.isUpdateTaskForm,
    listOfProjects: state.project.listOfProjects,
    //isProjectTaskDemand: state.project.isProjectTaskDemand,
    //projectForm: state.project.projectForm,
    project: {}
    
});

class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: props.userId,
            username: props.username,
            projectID: '',
            listOfProjects: [],
            projectcategories: [],
            projectName: "User Projects"

        };

        this.handlePictureClick = this.handlePictureClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);

    }

    componentDidUpdate(prevProps) {

        // if (prevProps.listOfProjects.length < this.props.listOfProjects.length){

        // }

        // if (typeof this.props.listOfProjects != "undefined") {
        //     console.log('inside componentDidUpdate');
        //     console.log(this.props.listOfProjects.length);
        //     for (let i = 0; i < this.props.listOfProjects.length; i++) {
        //         console.log('i:',i);
        //         console.log('prevProps.project[i].isDeleted:',prevProps.project[i].isDeleted)
        //         console.log('this.props.project[i].isDeleted:',this.props.project[i].isDeleted)
        //         if (prevProps.project[i].isDeleted != this.props.project[i].isDeleted) {

        //             let listOfp = this.state.listOfProjects;
        //             listOfp = listOfp.filter(project => project[i].isDeleted != this.props.project[i].isDeleted);
        //             this.setState({ listOfProjects: listOfp })

        //         }
        //     }
        // }
    }

    componentDidMount() {

        //console.log('isProjectSelected:',this.props.isProjectSelected);
        //console.log('isProjectTasksSelected:',this.props.isProjectTasksSelected);

        getListOfProjects(this.props.userId, (err, data) => {
           this.props.dispatch({type: 'USER_LIST_OF_PROJECT_DEMAND', listOfProjects:data});

        });



        // socket.on('GET_PROJECTCATEGORIES', data => {
        //     this.props.dispatch({ type: 'USER_IS_PROJECTTASK_DEMAND', project: this.state.project, 
        //             projectCategoryList: data.length > 0 ? data : [] });
        // });
    }

    handleChange(event) {
    
    }

    handlePictureClick(project) {
        //console.log(project.projectID);
        this.setState({project: project})
        //showCategories(project.projectID)
        /*, (err, data) => {
            console.log(data);
            this.props.dispatch({ type: 'USER_IS_PROJECT_DEMAND', projectID: project.projectID, projectCategoryList: data.length > 0 ? data : [], projectName: project.projectName });
        });*/

        showCategories_old(project.projectID, (err,data) =>{
            //this.props.dispatch({type: 'USER_IS_PROJECT_DEMAND',projectID: project.projectID, projectCategoryList: data.length > 0 ? data : [], projectName: project.projectName });
            this.props.dispatch({type: 'USER_IS_PROJECTTASK_DEMAND',project: project, projectCategoryList: data.length > 0 ? data : []});
            //this.props.dispatch({type: 'USER_IS_PROJECT_DEMAND',projectID: project.projectID, projectCategoryList: data.length > 0 ? data : [], projectName: project.projectName });
        })
    }

    handleUpdateClick(project) {
        console.log(project);
        let projectID = parseInt(project.projectID);
        console.log(projectID);
        this.props.dispatch({ type: 'USER_PROJECTUPDATEFORM', project: project });
        getUserPrev(projectID, this.state.userID, (err, data) => {
            console.log(data);
            if (data[0].AccountTypeID == 1) {
                
                this.props.dispatch({ type: 'USER_PROJECTUPDATEFORM', project: project });
            }
            else {
                console.log('Sorry you don\'t have the admin privilidges');
            }
        })

    }


    handleClick(e) {
        this.props.dispatch({ type: 'USER_PROJECTFORM_DEMAND' });
        e.preventDefault();
    }


    render() {
        return (
            <div>
                {this.props.isProjectSelected && <div class="project">
                    <ul>
                        {this.props.listOfProjects.map(project =>
                            <li style={{display:"inline block",backgroundColor:'white',
                            borderRadius:"50"}}>
                                <a id={project.projectID} onClick={(e) => {
                                    this.handlePictureClick(project); e.preventDefault()
                                }}></a>
                                <div>
                                    <span id={project.projectID} onClick={(e) => {this.handlePictureClick( project); e.preventDefault()}} 
                                    class="project-content">{project.projectName}</span>
                                </div>
                                {<a class="updatebtn" id={project.projectID} onClick={(e) => this.handleUpdateClick(project)}> </a>}
                            </li>
                        )}
                        
                    </ul>
                    {this.props.isProjectSelected &&
                        <form onClick={this.handleClick}>
                            <button id="add-project-button" class="addprojectbtn" onClick={(e) => this.handleClick(e)}>Add Project</button>
                        </form>
                    }
                </div>
                }
                {/* {this.props.isProjectSelected && <ProjectTask dispatch={this.props.dispatch} />} */}
                {this.props.isProjectUpdateSelected && <ProjectUpdate dispatch={this.props.dispatch} />}
                {this.props.isProjectTasksSelected && <ProjectTask dispatch={this.props.dispatch} />}
                {this.props.isProjectForm && <ProjectForm dispatch ={this.props.dispatch} />}
                {this.props.isAddTaskForm && <TaskForm dispatch={this.props.dispatch}/>}
                {/* {this.props.isUpdateTaskForm && <ProjectTaskUpdate dispatch={this.props.dispatch}/>} */}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Project);
