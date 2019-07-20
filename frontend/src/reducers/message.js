const defaultState = {
  addGroup: false,
  listOfGroups: []
};

const message = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_GROUP_DEMAND': return {
      addGroup: !state.addGroup
    }
    case 'GET_GROUPS_DEMAND': return {
      listOfGroups: action.listOfGroups
    }
    default:
      return state;
  }
};

export default message;