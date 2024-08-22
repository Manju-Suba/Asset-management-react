import { GET_ALL_SOFTWARE, GET_CLOSE_TO_EXPIRY_SOFTWARE, GET_EXPIRED_SOFTWARE } from '../actionType';

const INIT_STATE = {
    AllSoftware: [],
    CloseToExpiry: [],
    Expired: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_SOFTWARE:
            return { ...state, AllSoftware: action.payload };
        case GET_CLOSE_TO_EXPIRY_SOFTWARE:
            return { ...state, CloseToExpiry: action.payload };
        case GET_EXPIRED_SOFTWARE:
            return { ...state, Expired: action.payload };
        default:
            return state;
    }
};
