import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/task_add.css'

const mapStateToProps = state => ({
  addTask: state.message.addTask
});


class TaskForm extends Component {
    constructor(props) {
        super();
        this.state = {
            // playlistName: ''
            task:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            case "task":
                this.setState({ task: event.target.value });
                break;
            default:
                break;
        }
    }
    handleSubmit(event) {
        // this.props.dispatch({ type: 'USER_ADD_GROUP_DEMAND' });
        this.props.dispatch({ type: 'USER_ADD_TASK_DEMAND' });
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <div id="taskForm_Model" class="taskFormModel fade" role="dialog">
                    <div class="taskFormDialog">

                        <div class="taskFormContent">
                            <div class="taskform-header">
                                <button type="button" class="taskFormClose" data-dismiss="taskForm" onClick={this.handleSubmit}>&times;</button>
                                <h4 class="taskFormTitle">Add Task</h4>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <input id="taskName" type="text" value={this.state.message} onChange={this.handleChange} />
                                <button class="taskFormSubmit" type="submit">Submit</button>
                                <div class="taskFormBody">
                                    <p>Some text</p>
                                </div>
                                <div class="taskFormFooter">
                                    <button  type="submit" class="btn btn-default" data-dismiss="taskForm">Close</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(TaskForm);