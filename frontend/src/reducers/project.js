const defaultState = {
  project: {},
  projectID: '',
  category: {},
  projectCategoryList: [],
  projectName: '',
  categories: [],
  listOfProjects: [],
  dueDate: '',
  isDeleted: '',
  isProjectSelected: false,
  isProjectUpdateSelected: false,
  isProjectTasksSelected: false,
  isProjectForm: false,
  isAddTaskForm: false,
  isUpdateTaskForm: false,
  taskDate: new Date()
};

const project = (state = defaultState, action) => {
  switch (action.type) {
    case 'IS_PROJECT_DEMAND':
      return {
        ...state,
        project: action.project,
        projectID: action.project.projectID,
        projectCategoryList: action.projectCategoryList,
        projectName: action.project.projectName,
        projectDueDate: action.project.dueDate,
        isDelete: action.project.isDeleted,
        isProjectSelected: true,
        isProjectUpdateSelected: false,
        isProjectTasksSelected: false,
        isProjectForm: false,
        isAddTaskForm: false,
        isUpdateTaskForm: false,
      }

    case 'PROJECTUPDATEFORM':
      return {
        ...state,
        project: action.project,
        isProjectUpdateSelected: true,
        isProjectSelected: false,
        isProjectTasksSelected: false,
        isProjectForm: false,
        isAddTaskForm: false,
        isUpdateTaskForm: false,

      }

    case 'LIST_OF_PROJECT_DEMAND':
      return{
        ...state,
        listOfProjects: action.listOfProjects,
        isProjectSelected: true,
        isProjectUpdateSelected: false,
        isProjectTasksSelected: false,
        isProjectForm: false,
        isAddTaskForm: false,
        isUpdateTaskForm: false,
      }

    case 'VIEW_PROJECT': return {
      ...state,
      projectID: action.projectID,
      isProjectSelected: true,
      isProjectUpdateSelected: false,
      isProjectTasksSelected: false,
      isProjectForm: false,
      isAddTaskForm: false,
      isUpdateTaskForm: false,
    }

    case 'IS_PROJECTTASK_DEMAND':
      return {
        ...state,
        project: action.project,
        projectID: action.project.projectID,
        projectCategoryList: action.projectCategoryList,
        projectName: action.project.projectName,
        projectDueDate: action.project.dueDate,
        isDelete: action.project.isDeleted,
        isProjectSelected: false,
        isProjectUpdateSelected: false,
        isProjectTasksSelected: true,
        isProjectForm: false,
        isAddTaskForm: false,
        isUpdateTaskForm: false,
      }



    case 'PROJECTFORM_DEMAND':
      return {
        ...state,
        isProjectForm: true,
        isProjectSelected: false,
        isProjectUpdateSelected: false,
        isProjectTasksSelected: false,
        isAddTaskForm: false,
        isUpdateTaskForm: false,
      }


    case 'ADD_TASKFORM_DEMAND':
      return {
        ...state,
        category: action.category,
        taskDate: action.selectedDate,
        isProjectForm: false,
        isProjectSelected: false,
        isProjectUpdateSelected: false,
        isProjectTasksSelected: false,
        isAddTaskForm: true,
        isUpdateTaskForm: false,
      }

      case 'UPDATE_RETURN':
      return {
        ...state,
        project: action.project,
        isProjectSelected: true,
        isProjectUpdateSelected: false,
        isProjectTasksSelected: false,
        isProjectForm: false,
        isAddTaskForm: false,
        isUpdateTaskForm: false,
      }

      case 'PROJECT_TASK_UPDATE':
        return{
          ...state,
          isUpdateTaskForm:true,
          task:action.task,
          isProjectForm: false,
          isProjectSelected: false,
          isProjectUpdateSelected: false,
          isProjectTasksSelected: false,
          isAddTaskForm: false,
        }




    case ' VIEW_PROJECTTASKS':
      return {
        ...state,
        projectID: action.projectID
      }
    case "UPDATE_CATEGORY_LIST":
      return {
        ...state,
        projectCategoryList: action.projectCategoryList
      }

    case ' UPDATE_DELETEPROJECT':
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

