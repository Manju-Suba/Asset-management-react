import { GET_EMPLOYEE_LIST } from '../../actionType';

const INIT_STATE = {
    EmployeeList: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_EMPLOYEE_LIST:
            return { ...state, EmployeeList: action.payload };
        default:
            return state;
    }
};
