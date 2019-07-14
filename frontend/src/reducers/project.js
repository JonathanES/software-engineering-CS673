const defaultState = {
    projectID: '',
    isProjectSelected : false
  };
  
  const project = (state = defaultState, action) => {
    switch (action.type) {
      case 'IS_PROJECT_DEMAND':
        return{
          ...state,
          isProjectSelected: !state.isProjectSelected

        }
        case 'VIEW_PROJECT': return {
          ...state,
          projectID: action.projectID,
          isProjectSelected: false
        }

        case 'USER_GET_PROJECTFORM':
          return{
            ...state,
            isProjectSelected: false,
            projectForm: action.projectForm
          }


      default:
        return {
            ...state,
            projectID: action.ProjectID,
          };
    }
  };
  
  export default project;

