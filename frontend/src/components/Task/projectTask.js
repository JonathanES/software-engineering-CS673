import React from "react";
import { connect } from 'react-redux';
import { addTask, getTasksUsers, getListofTasksForCategories } from '../../socket/taskSocket';
import '../../css/task.css'

const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    projectTaskList: state.task.projectTaskList
    //taskname: state.Task.newtask
});

class ProjectTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            username: props.username,
            getListofTasks: [],
            newtask: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        console.log("toto");
        //getMessage();
        getTasksUsers(this.state.userId, (err, data) => {
            console.log('inside getTaskUsers in ../src/components/Task/Task.js')
            //console.log(data);

            // data.forEach(elt => {
            //     elt.isadd = 'false'
            //     elt.color = "rgb(155, 121, 156)";
            // })
            this.setState({ getListofTasksForUser: data });
        });
    }

    handleChange(event) {
        this.setState({ newtask: event.target.value });
        //console.log("inside handleChange:" + event.target.value);
    }
    handleSubmit(event) {
        console.log('Add Task button pressed before call');

        addTask(this.state.username, this.state.newtask, (err, data) => {
            console.log('Add Task button pressed');
            this.setState({ newtask: data });
            console.log("inside handleSubmit");

        })
        event.preventDefault();
    }

    render() {
        return (
            <div id="propnav">
                <ul>
                    {this.props.projectTaskList.map(category =>
                        <li id={category.projectID} onClick={this.handleClickProject}>
                            <span>{category.CategoryName}</span>
                            {category.listOfTasks.map(task =>
                                <li>
                                    <span>{task.TaskName}</span>
                                </li>
                            )}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ProjectTask);