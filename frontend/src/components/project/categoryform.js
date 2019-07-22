import React from "react";
import { connect } from 'react-redux';
import { addCategory } from '../../socket/projectSocket';

import '../../css/categoryForm.css'


const mapStateToProps = state => ({
    username: state.user.username,
    userId: state.user.userId,
    projectID: state.project.projectID
});


class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            projectID: props.projectID,
            categoryName: '',

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        console.log(this.props.projectID);
    }

    handleClick(event) {
        // this.props.dispatch({ type: 'USER_CREATE_PROJECT_DEMAND'})
    }


    handleChange(event) {
        switch (event.target.id) {
            case "categoryName":
                this.setState({ categoryName: event.target.value });
                break;
            default:
                break;
        }
    }


    handleSubmit(event) {

        //console.log('After clicking add project button');
        //console.log('Handle Submit: userID', this.state.userId, ' Project Name:', this.state.projectName, ' Due Date:', this.state.dueDate)
        switch (event.target.className) {

            case "add_category_button":
                if (this.state.categoryName == "") {
                    //console.log('it came here')
                    break;
                }
                console.log('Project ID:', this.props.projectID, ' Cat Name: ', this.state.categoryName);
                addCategory(this.props.projectID, this.state.categoryName, (err, data) => {
                    this.setState({ categoryName: '' });
                    this.props.dispatch({type: 'USER_UPDATE_CATEGORY_LIST', projectCategoryList: data});
                    this.props.dispatch({ type: 'USER_ADD_CATEGORY_DEMAND' });
                })
                break;
            default:
                break;

        }
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div id="myModal" class="modal-fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" onClick={(e) => { this.props.dispatch({ type: 'USER_ADD_CATEGORY_DEMAND' }); e.preventDefault() }}></button>
                                <h4 class="modal-title">Add New Category</h4>
                            </div>
                            <form onClick={this.handleSubmit} style={{ position: "absolute", left: "10" }}>
                                <input id="categoryName" type="text" value={this.state.categoryName} onChange={this.handleChange} />
                                <button class="add_category_button" id="add-cat-button" type="submit">Add Category</button>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-default" data-dismiss="modal"
                                        onClick={(e) => { this.props.dispatch({ type: 'USER_ADD_CATEGORY_DEMAND' }); e.preventDefault() }}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(CategoryForm);
