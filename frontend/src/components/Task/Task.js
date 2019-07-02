import React from "react";
import { connect } from 'react-redux';
import io from "socket.io-client";
import {addTask } from '../../socket/userSocket'

const mapStateToProps = state => ({
    username: state.user.username,
    id_user: state.user.id_user,
    //taskname: state.Task.newtask
});

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newtask: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.socket = io('http://localhost:8000');

        this.socket.on('ADD_TASK', function (data) {
            console.log("Add Task function called in Task.js / Task Class / socket.on");
            addTask(data);
        });

        const addTask = data => {
            this.setState({ newTask: data });
        }
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
            <div id="add_task">
                <form onSubmit={this.handleSubmit}>
                    <input id="add-task-input" type="text" value={this.state.newtask} onChange={this.handleChange} />
                    <button id="add-task-button" type="submit">Add Task</button>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Task);