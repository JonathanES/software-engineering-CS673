import React from 'react';
import { connect } from 'react-redux';
import Chat from '../components/chat/Chat';
import Project from '../components/project/Project';
import Task from '../components/Task/Task';
import TaskForm from '../components/task-design/TaskForm';
import Calendar from '../components/calendar/Calendar';
import Issues from '../components/issue-design/issues';
import Milestones from '../components/milestone-design/milestones'


const mapStateToProps = state => ({
    username: state.user.username,
    id_user: state.user.id_user,
    projectID: state.project.projectID,
    registerDemand: state.demand.registerDemand,
    connexionDemand: state.demand.connexionDemand,
    messageDemand: state.demand.messageDemand,
    projectDemand: state.demand.projectDemand,
    issueDemand: state.demand.issueDemand,
    taskDemand: state.demand.taskDemand,
    projectTaskDemand: state.demand.projectTaskDemand,
    projectFormDemand: state.demand.projectFormDemand,
    taskFormDemand: state.demand.taskFormDemand,
    calendarDemand: state.demand.calendarDemand,
    milestoneDemand: state.demand.milestoneDemand,
    //projectUpdateDemand: state.demand.projectUpdateDemand,
    categoryID: state.demand.categoryID
});


const MainPage = ({ dispatch, messageDemand, projectDemand, issueDemand, taskDemand, calendarDemand, projectFormDemand, projectTaskDemand, taskFormDemand,milestoneDemand}) => ( //, projectUpdateDemand }) => (
    <div className="main-page">
        {messageDemand && <Chat dispatch={dispatch} />}
        {projectDemand && <Project dispatch={dispatch} />}
        {issueDemand && <Issues dispath={dispatch} />}
        {taskDemand && <Task dispatch={dispatch} />}
        {milestoneDemand && <Milestones dispatch={dispatch} />}
        {calendarDemand && <Calendar dispatch={dispatch}/>}
        {/* {projectTaskDemand && <ProjectTask dispatch={dispatch} />} */}
        {/* {projectFormDemand && <ProjectForm dispatch={dispatch} />} */}
        {/* {taskFormDemand && <TaskForm dispatch={dispatch} />} */}
        {/* {projectUpdateDemand && <ProjectUpdate dispatch={dispatch} />} */}
    </div>
);

export default connect(mapStateToProps)(MainPage);
