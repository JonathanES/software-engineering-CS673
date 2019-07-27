const defaultState = {
    taskOfDay: [],
    isTaskOfDay: false
  };
  
  const calendar = (state = defaultState, action) => {
    switch (action.type) {
  
      case 'DEMAND_TASK_OF_DAY':
        return{
          ...state,
          isTaskOfDay: !state.isTaskOfDay,
          taskOfDay: action.taskOfDay
        }
  
      default:
        return {
          ...state
        };
    }
  };
  
  export default calendar;