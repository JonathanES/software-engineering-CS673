const defaultState = {
  addMilestone: false,
  milestone:{},
  categoryID:'',
};

const milestone = (state = defaultState, action) => {
  switch (action.type) {
    // case 'ADD_MILESTONE_DEMAND':
    //   return {
    //     ...state,
    //     addMilestone: !state.addMilestone,
    //     categoryID: action.categoryID
    //   }

    case 'UPDATE_MILESTONE_DEMAND':
      return{
        ...state,
        updateMilestone: !state.updateMilestone,
        milestone: action.milestone
      }



    default:
      return {
        ...state,
        projectID: action.ProjectID,
        projectName: action.ProjectName
      };
  }
};

export default milestone;
