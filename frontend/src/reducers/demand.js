const defaultState = {
    registerDemand: false,
    connexionDemand: true,
    projectDemand: false,
    messageDemand: false,
    issueDemand: false,
    taskDemand: false
};

const user = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN_DEMAND': return {
            connexionDemand: typeof action.username !== "undefined" ? false : state.connexionDemand,
            registerDemand: typeof action.username !== "undefined" ? false : state.registerDemand
        }
        case 'REGISTER_DEMAND':
            return {
                ...state,
                registerDemand: true,
                connexionDemand: false,
                projectDemand: false,
                messageDemand: false,
                issueDemand: false,
                taskDemand: false
            };
        case 'CONNEXION_DEMAND':
            return {
                ...state,
                connexionDemand: true,
                registerDemand: false,
                projectDemand: false,
                messageDemand: false,
                issueDemand: false,
                taskDemand: false
            };
        case 'DEMAND_LOGOUT':
            return {
                ...state,
                connexionDemand: true,
                registerDemand: false,
                projectDemand: false,
                issueDemand: false,
                taskDemand: false,
                messageDemand: false
            }
        case 'MESSAGE_DEMAND':
            return {
                ...state,
                messageDemand: true,
                connexionDemand: false,
                registerDemand: false,
                projectDemand: false,
                issueDemand: false,
                taskDemand: false
            };
        case 'PROJECT_DEMAND':
            return {
                ...state,
                projectDemand: true,
                messageDemand: false,
                connexionDemand: false,
                registerDemand: false,
                issueDemand: false,
                taskDemand: false
            };
        case 'ISSUE_DEMAND':
            return {
                ...state,
                issueDemand: true,
                projectDemand: false,
                messageDemand: false,
                connexionDemand: false,
                registerDemand: false,
                taskDemand: false
            };
        case 'TASK_DEMAND':
            return {
                ...state,
                taskDemand: true,
                issueDemand: false,
                projectDemand: false,
                messageDemand: false,
                connexionDemand: false,
                registerDemand: false,
            };
        default:
            return state;
    }
};

export default user;