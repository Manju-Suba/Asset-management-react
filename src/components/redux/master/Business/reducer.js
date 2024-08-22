import { GET_EDIT_BUSINESS, GET_ALL_BUSINESS } from '../../actionType';

const INIT_STATE = {
    getAllBusinessList: [],
    getEditBusinessList: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_BUSINESS:
            return { ...state, getAllBusinessList: action.payload };
        case GET_EDIT_BUSINESS:
            return { ...state, getEditBusinessList: action.payload };
        default:
            return state;
    }
};
