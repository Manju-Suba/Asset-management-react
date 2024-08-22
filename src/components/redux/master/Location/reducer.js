import { GET_LOCATION_LIST } from '../../actionType';

const INIT_STATE = {
    LocationList: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LOCATION_LIST:
            return { ...state, LocationList: action.payload };
        default:
            return state;
    }
};
