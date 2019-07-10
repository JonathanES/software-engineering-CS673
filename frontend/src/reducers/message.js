const defaultState = {
  addGroup: false
  };
  
  const message = (state = defaultState, action) => {
    switch (action.type) {
      case 'ADD_GROUP_DEMAND': return {
        addGroup: !state.addGroup
    }
      default:
        return state;
    }
  };
  
  export default message;