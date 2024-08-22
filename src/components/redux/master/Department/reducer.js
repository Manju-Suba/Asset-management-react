import { GET_DEPARTMENT_LIST } from '../../actionType';

const INIT_STATE = {
    DepartmentList: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_DEPARTMENT_LIST:
            return { ...state, DepartmentList: action.payload };
        default:
            return state;
    }
};
