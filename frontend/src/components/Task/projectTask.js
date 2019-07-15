import React from "react";
import { connect } from 'react-redux';
import { addTask } from '../../socket/taskSocket';
import { addCategory, showCategories } from '../../socket/projectSocket';
import '../../css/projectTask.css'



const mapStateToProps = state => ({
    projectID: state.project.projectID,
    username: state.user.username,
    userId: state.user.userId,
    projectTaskList: state.task.projectTaskList
    //taskname: state.Task.newtask
});

class ProjectTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pID: props.projectID,
            userId: props.userId,
            username: props.username,
            listOfTasks: [],
            categoryID:0,
            getListofTasksForUser:[],
            newtask: '',
            catName: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {

        //console.log("toto");
        //getMessage();
        // getTasksUsers(this.state.userId, (err, data) => {
        //     console.log('inside getTaskUsers in ../src/components/Task/Task.js')
        //     this.setState({ getListofTasksForUser: data });
        //     console.log(this.state.getListofTasksForUser);
        // });

        
        console.log('Show Categories called for Project:', this.state.pID);
        // showCategories(this.state.pID, (err, data) => {
        //     this.setState({projectID : this.state.pID});
        //     console.log(data);
        //     console.log('Does it ever comes here!! Line 47 of projectTask')
        //     console.log('ProjectID:',this.state.pID);
        //     //this.setState({projectName:  data[0].ProjectName})
        //     this.setState({ projectName: data.length == 0 ? this.state.projectName : data[0].ProjectName });
        //     //console.log(data[0].ProjectName);
        //     //console.log(data[0].ProjectID);
        //     //console.log(data[0]);
        //     //this.setState({ pID: this.state.ProjectID});
        //     //this.props.dispatch()
        //     this.props.dispatch({ type: 'USER_PROJECTTASK_DEMAND', projectTaskList: data });
        //     //this.setState({projectTaskList: ''});
        // });
    }

    handleChange(event) {
        this.setState({ catName: event.target.value });
        //console.log("inside handleChange:" + event.target.value);
    }

    

    handleSubmit(event) {
        event.preventDefault();

        //console.log(event);
        //console.log(event.target.id);

        switch (event.target.id) {
            case "add-task-button":

                console.log('ProjectID:',this.state.pID );
                console.log(this.props.projectTaskList[0].CategoryID);
                this.setState({categoryID: this.props.projectTaskList[0].CategoryID}) 
                console.log('categoryID', this.state.categoryID);   
                this.props.dispatch({ type: 'USER_ADD_TASKFORM_DEMAND', categoryID:this.props.projectTaskList[0].CategoryID });
                break;        

            case "add-cat-button":
                    console.log('add cat btn pressed');
                    console.log('Project ID:' , this.state.pID, ' Cat Name: ', this.state.catName);
                    addCategory(this.state.pID, this.state.catName, (err, data) => {
                        console.log('Add Project button pressed');
                        this.setState({ catName: '' });
                        console.log("inside handleSubmit");
                    })
                break;

            default:
                break;

        }
        
    }

    render() {
        return (
            <div id="propnav">
                <ul class="category_ul">
                    {this.props.projectTaskList.map(category =>
                        <li class="cat-task" id={category.projectID} onClick={this.handleClickProject}>
                            <span class="category">{category.CategoryName}</span>
                            {category.listOfTasks.map(task =>
                                <li>
                                    <span class="cat_task">{task.TaskName}</span>
                                </li>
                            )}
                            <form onClick={this.handleSubmit}>
                                {/* <input id="add-task-input" type="text" value={this.state.newtask} onChange={this.handleChange} /> */}
                                <button id="add-task-button" type="submit">Add Task</button>
                                {/* <button id={"add-task-button"} type="submit">Add Task</button> */}
                            </form>
                        </li>
                    )}
                    <div>


                    </div>
                </ul>
                <form onClick={this.handleSubmit}>
                    <input id="catName" type="text" value={this.state.catName} onChange={this.handleChange} />
                    <button id="add-cat-button" type="submit">Add Category</button>
                </form>
            </div>

        );
    }
}

export default connect(mapStateToProps)(ProjectTask);