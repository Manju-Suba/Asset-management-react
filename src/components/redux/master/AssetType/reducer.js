import { GET_ASSET_TYPE, GET_ASSET_BY_CATEGORY } from '../../actionType';

const INIT_STATE = {
    AssetType: [],
    AssetTypeByCate: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ASSET_TYPE:
            return { ...state, AssetType: action.payload };
        case GET_ASSET_BY_CATEGORY:
            return { ...state, AssetTypeByCate: action.payload };
        default:
            return state;
    }
};
