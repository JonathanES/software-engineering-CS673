const defaultState = {
    username: '',
    userId: ''
  };
  
  const user = (state = defaultState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          username: action.username,
          userId: action.userId
        };
        case 'LOGOUT':
        return {
          ...state,
          username: '',
          userID: ''
        };        
      default:
        return state;
    }
  };
  
  export default user;