const defaultState = {
    projectID: '',
    categories: [],
    isProjectSelected : false,
    isProjectUpdateSelected: false,
    addCategory: false,
  };
  
  const project = (state = defaultState, action) => {
    switch (action.type) {
      case 'IS_PROJECT_DEMAND':
        return{
          ...state,
          projectID: action.projectID,
          isProjectSelected: !state.isProjectSelected

        }
        case 'PROJECTUPDATE_DEMAND':
          return{
            ...state,
            projectID:action.projectID
          }

        case 'VIEW_PROJECT': return {
          ...state,
          projectID: action.projectID,
          isProjectSelected: false
        }

        case 'PROJECTFORM_DEMAND':
          return{
            ...state,
            projectID: action.projectID,
            isProjectSelected: false,
            projectForm: action.projectForm
          }

          case ' VIEW_PROJECTTASKS':
            return{
              ...state,
              projectID: action.projectID
            }

            case 'ADD_CATEGORY_DEMAND': return {
              addCategory: !state.addCategory,
              isProjectSelected: true
            }


      default:
        return {
            ...state,
            projectID: action.ProjectID,
          };
    }
  };
  
  export default project;

