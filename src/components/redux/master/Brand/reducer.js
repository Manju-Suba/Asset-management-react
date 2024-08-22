import { GET_BRAND_LIST } from '../../actionType';

const INIT_STATE = {
    BrandList: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_BRAND_LIST:
            return { ...state, BrandList: action.payload };
        default:
            return state;
    }
};
