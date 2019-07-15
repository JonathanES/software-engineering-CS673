const defaultState = {
    projectID: '',
    categories: [],
    isProjectSelected : false
  };
  
  const project = (state = defaultState, action) => {
    switch (action.type) {
      case 'IS_PROJECT_DEMAND':
        return{
          ...state,
          projectID: action.projectID,
          isProjectSelected: !state.isProjectSelected

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


      default:
        return {
            ...state,
            projectID: action.ProjectID,
          };
    }
  };
  
  export default project;

