const defaultState = {
    taskOfDay: [],
    isTaskOfDay: false,
    viewCalendarTask: true,
    viewCalendarCategories: false,
    viewCalendarProjects: false,
    selectedDate: ''
  };
  
  const calendar = (state = defaultState, action) => {
    switch (action.type) {
  
      case 'DEMAND_TASK_OF_DAY':
        return{
          ...state,
          isTaskOfDay: !state.isTaskOfDay,
          taskOfDay: action.taskOfDay,
          selectedDate: action.selectedDate,
          viewCalendarTask: true,
          viewCalendarCategories: false,
          viewCalendarProjects: false
        }
      case 'DEMAND_VIEW_CALENDAR_PROJECT':
        return {
          ...state,
          isTaskOfDay: true,
          viewCalendarProjects: true,
          viewCalendarCategories: false,
          viewCalendarTask: false,
          selectedDate: action.selectedDate
        }
        case 'DEMAND_VIEW_CALENDAR_CATEGORIES':
        return {
          ...state,
          viewCalendarProjects: false,
          viewCalendarCategories: true,
          viewCalendarTask: false
        }
  
      default:
        return {
          ...state
        };
    }
  };
  
  export default calendar;