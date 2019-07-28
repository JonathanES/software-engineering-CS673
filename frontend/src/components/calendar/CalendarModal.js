import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/calendar-modal.css'
import { getListOfProjects, showCategories_old } from '../../socket/projectSocket';
import moment from 'moment';


const mapStateToProps = state => ({
    userId: state.user.userId,
    taskOfDay: state.calendar.taskOfDay,
    listOfProjects: state.project.listOfProjects,
    viewCalendarProjects: state.calendar.viewCalendarProjects,
    viewCalendarCategories: state.calendar.viewCalendarCategories,
    viewCalendarTask: state.calendar.viewCalendarTask,
    selectedDate: state.calendar.selectedDate
});

class AddUserGroup extends Component {
    constructor(props) {
        super();
        this.state = {
            listOfProjects: [],
            listOfCategories: []
        }
        this.handleTaskClick = this.handleTaskClick.bind(this);
        this.handleProjectClick = this.handleProjectClick.bind(this);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
    }

    componentDidMount() {
        getListOfProjects(this.props.userId, (err, data) => {
            this.setState({ listOfProjects: data });
        });
    }

    handleTaskClick(task) {
        console.log('Calling Task Update');
        this.props.dispatch({ type: 'USER_GET_TASK_DETAIL_DEMAND', task: task });
    }

    handleProjectClick(project) {
        showCategories_old(project.projectID, (err, data) => {
            this.props.dispatch({ type: 'USER_DEMAND_VIEW_CALENDAR_CATEGORIES' });
            this.setState({ listOfCategories: data });
        })
    }

    handleCategoryClick(category) {
        console.log(category)
        this.props.dispatch({ type: 'USER_ADD_TASK_FROM_CALENDAR_DEMAND', category: category, selectedDate: this.props.selectedDate });
    }



    render() {
        return (
            <div id="modal-calendar" class="modal-fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" onClick={() => { this.props.dispatch({ type: 'USER_DEMAND_TASK_OF_DAY', taskOfDay: this.props.taskOfDay }); }}>&times;</button>
                            <h4 class="modal-title">{moment(this.props.selectedDate).format('DD-MM-YY')}</h4>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div id="view-task">
                                {this.props.viewCalendarTask && this.props.taskOfDay.length > 0 &&
                                    this.props.taskOfDay.map(task =>
                                        <div id="task" onClick={(e) => { { this.handleTaskClick(task); e.preventDefault() } }}>
                                            <div id="task-title">
                                                {task.taskName}
                                            </div>
                                            <div id="container">
                                                <div id="left">
                                                    {task.status}
                                                </div>
                                                <div id="center">
                                                    {
                                                        moment.duration(moment(task.dueDate, "YYYY-MM-DD").diff(moment().startOf('day'))).asDays() < 0 ? `You are over the date by ${- moment.duration(moment(task.dueDate, "YYYY-MM-DD").diff(moment().startOf('day'))).asDays()} days` : `You have ${moment.duration(moment(task.dueDate, "YYYY-MM-DD").diff(moment().startOf('day'))).asDays()} days left`
                                                    }
                                                </div>
                                                <div id="right" className={(task.priorityID == 1) ? "yellow" : (task.priorityID == 2 ? "orange" : "red")}>
                                                    <span>{task.priority}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    this.props.viewCalendarProjects &&
                                    <div>
                                        {this.state.listOfProjects.map(project =>
                                            <div id="task" onClick={(e) => { this.handleProjectClick(project); e.preventDefault() }}>
                                                {project.projectName}
                                            </div>
                                        )}
                                    </div>
                                }
                                {
                                    this.props.viewCalendarCategories &&
                                    <div>
                                        {this.state.listOfCategories.map(category =>
                                            <div id="task" onClick={(e) => { this.handleCategoryClick(category); e.preventDefault() }}>
                                                {category.CategoryName}
                                            </div>
                                        )}
                                    </div>
                                }
                            </div>
                            <div class="modal-footer">
                                {this.props.viewCalendarTask && <button type="submit" class="btn-addTask" data-dismiss="modal" onClick={() => { this.props.dispatch({ type: 'USER_DEMAND_VIEW_CALENDAR_PROJECT', taskOfDay: this.props.taskOfDay }); }}>Add task</button>}
                                <button type="submit" class="btn-closeIt" data-dismiss="modal" onClick={() => { this.props.dispatch({ type: 'USER_DEMAND_TASK_OF_DAY', taskOfDay: this.props.taskOfDay }); }}>Close</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddUserGroup);