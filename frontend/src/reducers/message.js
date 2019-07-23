const defaultState = {
  addGroup: false,
  listOfGroups: [],
  groupId: '',
  addUserToGroup : false
};

const message = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_GROUP_DEMAND': return {
      addGroup: !state.addGroup
    }
    case 'GET_GROUPS_DEMAND': return {
      listOfGroups: action.listOfGroups
    }
    case 'ADD_USER_TO_GROUP_DEMAND':
      return {
        groupId: action.groupId,
        addUserToGroup: !state.addUserToGroup
      }
    default:
      return state;
  }
};

export default message;