const defaultState = {
  project:{},
  projectID: '',
  projectCategoryList: [],
  projectName: '',
  categories: [],
  dueDate:'',
  isDeleted:'',
  isProjectSelected: true,
  isProjectUpdateSelected: false,
  isProjectTasksSelected: false
  
};

const project = (state = defaultState, action) => {
  switch (action.type) {
    case 'IS_PROJECT_DEMAND':
      console.log(action);
      return {
        ...state,
        project:action.project,
        projectID: action.project.projectID,
        projectCategoryList: action.projectCategoryList,
        projectName: action.project.projectName,
        projectDueDate: action.project.dueDate,
        isDelete:action.project.isDeleted,
        isProjectSelected: true,
        isProjectUpdateSelected: false,
        isProjectTasksSelected: false
      }

      case 'PROJECTUPDATEFORM':
        //console.log(action);
        return{
          ...state,
          project:action.project,
          isProjectUpdateSelected: true,
          isProjectSelected: false,
          isProjectTasksSelected: false,
          

        }

        case 'VIEW_PROJECT': return {
          ...state,
          projectID: action.projectID,
          isProjectSelected: true,
          isProjectUpdateSelected: false,
          isProjectTasksSelected: false
        }

        case 'IS_PROJECTTASK_DEMAND':
      console.log(action);
      return {
        ...state,
        project:action.project,
        projectID: action.project.projectID,
        projectCategoryList: action.projectCategoryList,
        projectName: action.project.projectName,
        projectDueDate: action.project.dueDate,
        isDelete:action.project.isDeleted,
        isProjectSelected: false,
        isProjectUpdateSelected: false,
        isProjectTasksSelected: true
      }





    case 'PROJECTUPDATE_DEMAND':
      return {
        ...state,
        projectID: action.projectID
      }

    

    case 'PROJECTFORM_DEMAND':
      return {
        ...state,
        projectID: action.projectID,
        isProjectSelected: false,
        projectForm: action.projectForm
      }

    case ' VIEW_PROJECTTASKS':
      return {
        ...state,
        projectID: action.projectID
      }
      case "UPDATE_CATEGORY_LIST":
        return {
          ...state,
          projectCategoryList: action.projectCategoryList
        }
    
    case ' UPDATE_DELETEPROJECT':
      return{
        ...state,
        projectID: action.projectID
      }









    default:
      return {
        ...state
      };
  }
};

export default project;

