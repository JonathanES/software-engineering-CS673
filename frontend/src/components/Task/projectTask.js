import React from "react";
// import {Moment} from "react-moment"
import moment from 'moment'
import { connect } from 'react-redux';
import { addCategory } from '../../socket/projectSocket';
import CategoryForm from '../project/categoryform';
import '../../css/projectTask.css'
import '../../css/group-chat.css'


const mapStateToProps = state => ({
    projectID: state.project.projectID,
    projectTaskList: state.project.projectTaskList,
    projectName: state.project.projectName,

    addCategory: state.category.addCategory,

    username: state.user.username,
    userId: state.user.userId,
    //taskname: state.Task.newtask
});

class ProjectTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            username: props.username,
            listOfTasks: [],
            categoryID: '',
            getListofTasksForUser: [],
            newtask: '',
            catName: '',
            modalIsOpen: '',
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleAddCategory = this.handleAddCategory.bind(this);
    }

    componentDidMount() {
        console.log(this.props.projectID);
    }

    handleChange(event) {
        this.setState({ catName: event.target.value });
        //console.log("inside handleChange:" + event.target.value);
    }

    handleMouseOver(e) {
        if (e.target.className == "cat-task_li_li") {
            let child = e.target.childNodes[0].childNodes[1]
            child.style.display = "block"
        }
    }

    handleMouseOut(e) {
        if (e.target.className == "cat-task_li_li" || e.target.parentNode.className == "cat-task_li_li") {
            if (e.target.className == "cat-task_li_li") {
                let child = e.target.childNodes[0].childNodes[1]
                child.style.display = "none"
            } else {
                let child = e.target.parentNode.childNodes[0].childNodes[1]
                child.style.display = "none"
            }
        }
    }
    handleClick(event) {
        event.preventDefault();

        //console.log(event);
        //console.log(event.target.id);

        switch (event.target.className) {

            case "add_category_button":
                //console.log('add cat btn pressed');
                if (this.state.catName == "") {
                    //console.log('it came here')
                    break;
                }
                console.log('Project ID:', this.props.projectID, ' Cat Name: ', this.state.catName);
                addCategory(this.props.projectID, this.state.catName, (err, data) => {
                    console.log('Add Project button pressed');
                    this.setState({ catName: '' });
                    console.log("inside handleSubmit");
                })
                break;

            case "add_task_button":

                console.log('ProjectID:', this.props.projectID);
                console.log(this.props.projectTaskList[0].CategoryID);
                console.log('catID:', event.target.id);
                this.setState({ categoryID: event.target.id })
                console.log('categoryID', this.state.categoryID);
                this.props.dispatch({ type: 'USER_ADD_TASKFORM_DEMAND', categoryID: event.target.id });
                break;

            default:
                console.log('is this called');
                break;
        }
    }

    handleAddCategory() {
        this.props.dispatch({ type: 'USER_ADD_CATEGORY_DEMAND' });
    }


    render() {

        return (
            <div style={{ overflowX: 'auto' }}>
                <h3> You are viewing Project : {this.props.projectName} </h3>
                <input id="add-button" type="image" src={require("../../images/plus.svg")} onClick={(e) => {this.props.dispatch({ type: 'USER_ADD_CATEGORY_DEMAND' });e.preventDefault()}} />

                {this.props.addCategory && <CategoryForm dispatch={this.props.dispatch} />}
                {this.props.projectTaskList.map(category =>
                    <li class="cat-task_li" style={{ width: '300px', height: "auto", borderRadius: '5px', backgroundColor: "#e6e6e6", position: "relative" }} id={category.projectID} onClick={this.handleClickProject}>
                        <span class="categorytitle">{category.CategoryName}</span>
                        {category.listOfTasks.map(task =>
                            <li class="cat-task_li_li" onMouseOver={(e) => this.handleMouseOver(e)} onMouseLeave={(e) => this.handleMouseOut(e)} style={{ width: '94%', borderRadius: '5px', marginLeft: '3%', marginTop: '8px', marginBottom: '0', height: "auto", padding: "5px" }}>
                                <div class="cat_tast_head">
                                    <span class="state">{task.StatusName} </span>

                                    <img src={require("./../../images/edit.png")} style={{ display: this.state.modalIsOpen, width: "15px", height: "15px" }} />
                                </div>
                                {/* done|||bstart not start*/}
                                <span class="cat_task_span">{task.TaskName}</span>
                                <div class="cat_tast_footer">
                                    <span class="time">{moment(task.DueDate).format('D MMM')}</span>
                                    {/* {<Moment format = "D MMM" >{task.DueDate}</Moment>} */}
                                    <img src={require("./../../images/admin-tool.png")} class="photo" />
                                </div>
                            </li>
                        )}
                        <div class="footer">
                            <form onClick={this.handleClick} class="footerform">
                                {/* <input id="add-task-input" type="text" value={this.state.newtask} onChange={this.handleChange} /> */}
                                {/* <button id="add-task-button" type="submit">Add Task</button> */}
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAIAAAC0D9CtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAc5JREFUeNqEU72uAVEQvnus/4uIv0QoNIotvYRKrZAIwjt4AA2JKFUSGvEGvIFQC4lCoZBQIPG3Wdy93z2zOZvY4k6xmTkz3zcz39kj6br+ZbHH4/F6vWRZdrvd1qxkxbzf70ajARhjrF6v+/3+jwImvM1mMxgMQH8+nzVN++G23+9BOplM5vP5Z5/1et3v99EBrACoqopzSZIwns/nAwvCfD6fyWTMPqvVCgAkLpcLAHSIEG2PxyP50+kUNSYml8vF43EQU1v6IqQvQo/HUygUbDYbTmTCqNzId7lctVotkUhcr9der7fb7YDRuBn7nE6ndrtNMRFXKpV0Ok1pwFqtFrJC3mq1ymgNU0fGksmkCL1ebyQSMeg5IxY2tQaS9MWpOHw+n9CANNS52e12icS53+/dbhdzog7EGC8YDAIwGo0WiwVqsH2pVMIIEONPA1zCNzdQgu9wODSbTeRAJAQMBAKpVMrhcJhaz2az7XYrBoDdbjdyaA1cK3oShYEJh8OUwwyQgdYjgAhjsZhxY0K05XI5Ho/L5TJk6HQ6WAYVuEdFUYbDYTQazWazhJGFRAo3OMA4nU4Ig4pQKIRti8XiP29BvB84+EGt2V8BBgD1nkAsc+cNegAAAABJRU5ErkJggg==" class="photos" />
                                <button class="add_task_button" id={category.CategoryID} type="submit">Add New Task</button>
                                {/* <button id={"add-task-button"} type="submit">Add Task</button> */}
                            </form>
                        </div>
                    </li>
                )}

                {/* <form onClick={this.handleClick} style={{ position: "absolute", left: "10" }}>
                    <input id="catName" type="text" value={this.state.catName} onChange={this.handleChange} />
                    <button class="add_category_button" id="add-cat-button" type="submit">Add Category</button>
                </form> */}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ProjectTask);