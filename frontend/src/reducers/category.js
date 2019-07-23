const defaultState = {
    addCategory: false,
  };
  
  const category = (state = defaultState, action) => {
    switch (action.type) {
      case 'ADD_CATEGORY_DEMAND': return {
        addCategory: !state.addCategory
      }
      default:
        return {
          ...state,
        };
    }
  };
  
  export default category;
  
  