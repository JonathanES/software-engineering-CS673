import React from "react";
import { connect } from 'react-redux';

import {Card, Button, CardTitle, CardText, Row, Col, Container, CardImg, CardHeader, CardBody,
    CardSubtitle, CardFooter } from 'reactstrap';


import ProjectCard from "./projectCard.jsx";
import ProjectCardGrid from "./projectCardGrid.jsx";


import { getListOfProjects, showCategories, showCategories_old } from '../../socket/projectSocket';
import { getUserPrev } from '../../socket/taskSocket';
import ProjectTask from '../Task/projectTask.js';
import ProjectUpdate from '../project/projectUpdate.js';
import ProjectForm from './ProjectForm';
import TaskForm from '../task-design/TaskForm';
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
        this.icg = new ProjectCardGrid(props, 6, this.listOfProjects) ; //project = await listofp())

        // this.icg = new ProjectCardGrid(props, 6, project) ; //project = await listofp())
    }

    async listofp() {
        return Promise((resolve, reject) => {
            getListOfProjects(this.props.userId, (err, data) => {
                resolve(data)
            })
        })
    }
    // constructor(props, numberOfCards, issues, cardsPerRow=4){
    //     this.props = props;
    //     this.numberOfCards = numberOfCards;
    //     this.issues = issues;
    //     this.cardRows = [];
    //     this.cardsPerRow = cardsPerRow;
    //     this.cardSize = 12/cardsPerRow;
    // }




    componentDidUpdate(prevProps){
        // if (prevProps.task.taskName != this.props.task.taskName){
        //     const getListofTasksForUser = this.state.getListofTasksForUser;
        //     getListofTasksForUser.forEach(task => {
        //         if (task.taskID == this.props.task.taskID)
        //             task = this.props.task;
        //     })
        //     this.setState({getListofTasksForUser: getListofTasksForUser});
        // }
    }

    async componentDidMount() {

        //console.log('isProjectSelected:',this.props.isProjectSelected);
        //console.log('isProjectTasksSelected:',this.props.isProjectTasksSelected);

       getListOfProjects(this.props.userId, (err, data) => {
            this.setState({ listOfProjects: data });
            this.icg.updateGrid(data);

        });
        // const projects = await this.listofp();
        // this.icg.updateGrid(projects);
        // socket.on('GET_PROJECTCATEGORIES', data => {
        //     this.props.dispatch({ type: 'USER_IS_PROJECTTASK_DEMAND', project: this.state.project, 
        //             projectCategoryList: data.length > 0 ? data : [] });
        // });
    }

    handleChange(event) {
    
    }

    handlePictureClick(project) {
        console.log(project.projectID);
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

   
    //this.icg = new ProjectCardGrid(this.props, 6, this.listOfProjects);


    render() {
        return (
            <div>
                {this.props.isProjectSelected && this.icg.getGrid()

                }

                {/* {this.props.isProjectSelected && <div width="20%">
                    {this.state.listOfProjects.map(project =>
                        <Card body width="20%">
                            <CardHeader className="text-center" style={{ backgroundColor: "#157ffb" }} 
                                onClick={(e) => {
                                    this.handlePictureClick(project); 
                                    e.preventDefault()
                                }
                            }>
                            {project.projectName}
                            </CardHeader>
                            <CardImg top width="20%" src="../images/projectbackground.png" alt="Card image cap" 
                                onClick={(e) => {
                                    this.handlePictureClick(project); 
                                    e.preventDefault()
                                }}
                            />
                            <CardBody className="text-center">
                                <Button color="secondary">update</Button>
                            </CardBody>
                        </Card>
                    )}
                </div>
                } */}

                {this.props.isProjectSelected &&
                    <Button id="add-project-button" class="addprojectbtn" color="secondary" onClick={(e) => this.handleClick(e)}>Add Project </Button>
                }

                {/* {this.props.isProjectSelected && <div class="project">
                    <ul>
                        {this.state.listOfProjects.map(project =>
                            <li>
                                <a id={project.projectID} onClick={(e) => {
                                    this.handlePictureClick(project
                                        // {
                                        //     projectID: project.projectID, projectName: project.projectName
                                        // }
                                    ); e.preventDefault()
                                }}></a>
                                <div>
                                    <span id={project.projectID} onClick={(e) => {
                                        this.handlePictureClick( project
                                            // {
                                            //     projectID: project.projectID, projectName: project.projectName
                                            // }
                                        ); e.preventDefault()
                                    }} class="project-content">{project.projectName}</span>
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
                } */}
                {/* {this.props.isProjectSelected && <ProjectTask dispatch={this.props.dispatch} />} */}
                {this.props.isProjectUpdateSelected && <ProjectUpdate dispatch={this.props.dispatch} />}
                {this.props.isProjectTasksSelected && <ProjectTask dispatch={this.props.dispatch} />}
                {this.props.isProjectForm && <ProjectForm dispatch ={this.props.dispatch} />}
                {this.props.isAddTaskForm && <TaskForm dispatch={this.props.dispatch}/>}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Project);
