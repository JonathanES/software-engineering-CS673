const defaultState = {
  addTask: false,
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

    

    default:
      return {
        ...state,
        projectID: action.ProjectID,
        projectName: action.ProjectName
      };
  }
};

export default task;