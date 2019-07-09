const defaultState = {
    projectID: ''
  };
  
  const project = (state = defaultState, action) => {
    switch (action.type) {
      

      default:
        return {
            ...state,
            projectID: action.ProjectID,
          };
    }
  };
  
  export default project;

