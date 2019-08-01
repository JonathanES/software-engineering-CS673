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
            projectcategories: [],
            projectName: "User Projects",
            disabled:false,

        };

        this.handlePictureClick = this.handlePictureClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);

        this.onChange =this.onChange.bind(this);
        this.addproject = this.addproject.bind(this);
           

    }

    componentDidUpdate(prevProps) {

    }

    projectList(userID) {
        return new Promise(resolve => {
            getListOfProjects(this.props.userId, (err, data) => {
                resolve(data);
            });
        })

    }
    async componentDidMount() {

        const res = await this.projectList(this.props.userId);
        if (!this.props.isAddTaskForm)
            this.props.dispatch({ type: 'USER_LIST_OF_PROJECT_DEMAND', listOfProjects: res });
    }

    handleChange(event) {

    }

    handlePictureClick(project) {

        if (typeof project == 'undefined') {
            return;
        }
        else
        {
            //this.setState({disabled:true}); 
            this.setState({ project: project })
            showCategories_old(project.projectID, (err, data) => {
                this.props.dispatch({ type: 'USER_IS_PROJECTTASK_DEMAND', project: project, projectCategoryList: data.length > 0 ? data : [] });
            })
            // this.setState({disabled:false});
        }
    }

    handleUpdateClick(project) {
        //console.log(project);
        let projectID = parseInt(project.projectID);
        //console.log(projectID);
        this.props.dispatch({ type: 'USER_PROJECTUPDATEFORM', project: project });
        getUserPrev(projectID, this.state.userID, (err, data) => {
            ///console.log(data);
            if (data[0].AccountTypeID == 1) {

                this.props.dispatch({ type: 'USER_PROJECTUPDATEFORM', project: project });
            }
            else {
                console.log('Sorry you don\'t have the admin privilidges');
            }
        })

    }

    addproject(){
        //this.props.dispatch({ type: 'USER_PROJECTFORM_DEMAND' });
        //this.props.onButtonClick(this.state.value);
        this.setState({ disabled: false });

    }

    onChange(e) {
        this.setState({ value: e.target.value });
      }

    handleClick(e) {
        this.setState({disabled:true})
        this.props.dispatch({ type: 'USER_PROJECTFORM_DEMAND' });
        e.preventDefault();
    }


    render() {
        return (
            <div id="projectMainContainer">
                {this.props.isProjectSelected && <div className="project">
                    <ul>
                        {this.props.listOfProjects.map(project =>
                            <li key={"Project"+project.projectID}>
                                <a id={project.projectID} onClick={(e) => {
                                    this.handlePictureClick(project); e.preventDefault()
                                }}></a>
                                <div>
                                    <span id={project.projectID} onClick={(e) => { this.handlePictureClick(project); e.preventDefault() }}
                                        className="project-content">{project.projectName}</span>
                                </div>
                                {<a className="updatebtn" id={project.projectID} onClick={(e) => this.handleUpdateClick(project)}> </a>}
                            </li>
                        )}

                    </ul>
                    {/* {this.props.isProjectSelected &&
                        <form onClick={this.handleClick}>
                            <button id="add-project-button" className="addprojectbtn" onClick={(e) => this.handleClick(e)}>Add Project</button>
                        </form>
                    } */}

                    {this.props.isProjectSelected &&
                        <form onClick={this.handleClick}>
                            <button  id="add-project-button" className="addprojectbtn" onClick={this.addproject}>Add Project</button>
                        </form>
                    }
                </div>
                }
                {/* {this.props.isProjectSelected && <ProjectTask dispatch={this.props.dispatch} />} */}
                {this.props.isProjectUpdateSelected && <ProjectUpdate dispatch={this.props.dispatch} />}
                {this.props.isProjectTasksSelected && <ProjectTask dispatch={this.props.dispatch} />}
                {this.props.isProjectForm && <ProjectForm dispatch={this.props.dispatch} />}
                {this.props.isAddTaskForm && <TaskForm dispatch={this.props.dispatch} />}

                {this.props.isUpdateTaskForm && <ProjectTaskUpdate dispatch={this.props.dispatch}/>}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Project);