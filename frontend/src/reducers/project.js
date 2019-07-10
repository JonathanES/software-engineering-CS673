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
          isProjectSelected: false
        }


      default:
        return {
            ...state,
            projectID: action.ProjectID,
          };
    }
  };
  
  export default project;

