const defaultState = {
    projectID: '',
    projectTaskList: [],
    addTask: false
  };
  
  const project = (state = defaultState, action) => {
    switch (action.type) {
      case 'PROJECT_TASK_DEMAND':
        return{
          ...state,
          projectTaskList: action.projectTaskList

        }

      case 'ADD_TASK_DEMAND':
        return{
          ...state,
          addTask: !state.addTask
        }


      default:
        return {
            ...state,
            projectID: action.ProjectID,
          };
    }
  };
  
  export default project;

