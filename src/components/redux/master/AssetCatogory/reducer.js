import { GET_ASSET_CATEGORY } from '../../actionType';

const INIT_STATE = {
    AssetCategoryData: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ASSET_CATEGORY:
            return { ...state, AssetCategoryData: action.payload };
        default:
            return state;
    }
};
