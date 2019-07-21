const defaultState = {
  projectID: '',
  projectCategoryList: [],
  projectName: '',
  categories: [],
  isProjectSelected: false,
  isProjectUpdateSelected: false,
};

const project = (state = defaultState, action) => {
  switch (action.type) {
    case 'IS_PROJECT_DEMAND':
      return {
        ...state,
        projectID: action.projectID,
        projectCategoryList: action.projectCategoryList,
        projectName: action.projectName,
        isProjectSelected: !state.isProjectSelected
      }
    case 'PROJECTUPDATE_DEMAND':
      return {
        ...state,
        projectID: action.projectID
      }

    case 'VIEW_PROJECT': return {
      ...state,
      projectID: action.projectID,
      isProjectSelected: false
    }

    case 'PROJECTFORM_DEMAND':
      return {
        ...state,
        projectID: action.projectID,
        isProjectSelected: false,
        projectForm: action.projectForm
      }

    case ' VIEW_PROJECTTASKS':
      return {
        ...state,
        projectID: action.projectID
      }

    default:
      return {
        ...state
      };
  }
};

export default project;

