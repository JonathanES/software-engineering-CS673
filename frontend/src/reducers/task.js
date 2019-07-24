const defaultState = {
  addTask: false,
  task:{},
  categoryID:'',
};

const task = (state = defaultState, action) => {
  switch (action.type) {
    // case 'ADD_TASK_DEMAND':
    //   return {
    //     ...state,
    //     addTask: !state.addTask,
    //     categoryID: action.categoryID
    //   }

    case 'UPDATE_TASK_DEMAND':
      return{
        ...state,
        updateTask: !state.updateTask,
        task: action.task
      }

    

    default:
      return {
        ...state,
        projectID: action.ProjectID,
        projectName: action.ProjectName
      };
  }
};

export default task;