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
      
        case 'PROJECT_ADD_TASK_DEMAND':
          return{
            ...state,
            projectAddTask: action.projectAddTask
  
          }

      default:
        return {
            ...state,
            projectID: action.ProjectID,
          };
    }
  };
  
  export default project;

