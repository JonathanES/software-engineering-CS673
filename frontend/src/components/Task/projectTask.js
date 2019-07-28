import React from "react";
// import {Moment} from "react-moment"
import moment from 'moment'
import { connect } from 'react-redux';
import { addCategory } from '../../socket/projectSocket';
import CategoryForm from '../project/categoryform';
import '../../css/projectTask.css'
// import '../../css/group-chat.css'


const mapStateToProps = state => ({
    projectID: state.project.projectID,
    projectCategoryList: state.project.projectCategoryList,
    projectName: state.project.projectName,
    iisProjectSelected: state.project.isProjectSelected,
    isProjectTasksSelected: state.project.isProjectTasksSelected,

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
            category: {},
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
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {

        //console.log('isProjectTasksSelected:',this.props.isProjectTasksSelected)


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
    handleClick(event,catinfo) {
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

                //console.log('ProjectID:', this.props.projectID);
                //console.log(this.props.projectCategoryList[0].CategoryID);
                //console.log(catinfo)
                //console.log('catID:', event.target.id);
                this.setState({ category: catinfo })
                //console.log('categoryID', this.state.categoryID);
                this.props.dispatch({ type: 'USER_ADD_TASKFORM_DEMAND', category: catinfo });
                break;

            default:
                console.log('is this called');
                break;
        }
    }

    handleAddCategory() {
        this.props.dispatch({ type: 'USER_ADD_CATEGORY_DEMAND' });
    }

    handleUpdate(task){
        console.log('why here');
        console.log(task);
        this.props.dispatch({type:'USER_PROJECT_TASK_UPDATE', task:task});
    }


    render() {

        return (
            <div style={{ overflowX: 'auto' }}>
                {this.props.isProjectTasksSelected && <div class="title"
                    style={{ padding: "5%", alignItems: 'top', fontSize:"26px", color:'black' }}> You are viewing: {this.props.projectName}
                    <a href=" " title="Add Category" style={{ backgroundcolor: '#FFFFFF', color: '#000000', textdecoration: 'none' }}>
                        <input id="add-button" type="image" style={{ height: "20px", width: '20px' }}
                            src={require("../../images/plus.svg")} onClick={(e) => {
                                this.props.dispatch({ type: 'USER_ADD_CATEGORY_DEMAND' });
                                e.preventDefault()
                            }} />
                    </a>
                </div>}
                <div>
                    {this.props.addCategory && <CategoryForm dispatch={this.props.dispatch} />}
                    <ul style={{ verticalAlign: 'top', padding: '10px' }}>
                    {/* <ul > */}
                        {this.props.projectCategoryList.map(category =>
                        <li class="cat-task_li" onClick={this.handleUpdate} 
                            style={{ width: '300px',maxHeight:'500px' ,  height: "auto", 
                                     paddingBlock:'10px', verticalAlign:'top', 
                                     marginTop: '8px', borderRadius: '5px', 
                                     backgroundColor: "#white", position: "relative" , 
                                     display: 'inline-block'}} 
                                     id={category.projectID} onClick={this.handleClickProject}>
                                      
                            <span class="categorytitle">{category.CategoryName}</span>
                            <span class="footer">
                                    <input class="add_task_button" src={require("../../images/add_button_2.png")} style={{width:'5%' }} id={category.CategoryID } onClick={(e)=>this.handleClick(e,category)} type="image"/>
                                    <button class="add_task_button" id={category.CategoryID} type="submit">Add New Task</button>
                                    <br></br>
                            </span>
                            {category.listOfTasks.map(task =>
                                <li class="cat-task_li_li" onClick={() => this.handleUpdate(task)} onMouseOver={(e) => this.handleMouseOver(e)} 
                                    onMouseLeave={(e) => this.handleMouseOut(e)} 
                                    style={{ width: '94%', height: '200px', 
                                    borderRadius: '5px', marginLeft: '3%', 
                                    marginTop: '8px', marginBottom: '0', height: "auto", padding: "5px" }}>
                                    <div class="cat_tast_head">
                                        <span class="cat_task_span">{task.TaskName}</span>
                                        
                                        <img src={require("./../../images/edit.png")} 
                                            style={{ display: this.state.modalIsOpen, width: "15px", height: "15px" }} />
                                    </div>

                                    {/* done|||bstart not start*/}
                                    <span class="state" style={{background: task.StatusName == 'Done'?'green': '#f4d03c' }}>{task.StatusName} </span>
                                    {/* <span class="cat_task_span">{task.TaskName}</span> */}
                                    <div class="cat_tast_footer">
                                        <span class="time">{moment(task.DueDate).format('D MMM')}</span>
                                        {/* <img src={require("./../../images/admin-tool.png")} class="photo" /> */}
                                    </div>
                                </li>
                            )}
                            {/* <span class="footer">
                                    <br></br>
                                    <input class="add_task_button" src={require("../../images/add_button_2.png")} style={{width:'5%' }} id={category.CategoryID } onClick={(e)=>this.handleClick(e,category)} type="image"/>
                                    <button class="add_task_button" id={category.CategoryID} type="submit">Add New Task</button>
                            </span> */}
                        </li>
                    )}
                    </ul>
                    </div>
            </div>
            
            
        )    

                // );
    }
}

export default connect(mapStateToProps)(ProjectTask);