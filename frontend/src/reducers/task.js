const defaultState = {
    projectID: '',
    projectTaskList: [],
  };
  
  const project = (state = defaultState, action) => {
    switch (action.type) {
      case 'PROJECT_TASK_DEMAND':
        return{
          ...state,
          projectTaskList: action.projectTaskList

        }


      default:
        return {
            ...state,
            projectID: action.ProjectID,
          };
    }
  };
  
  export default project;

