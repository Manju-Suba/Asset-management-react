import { GET_ASSET_ACTIVITY_REPORT, GET_ASSET_LOCATION_REPORT, GET_ASSET_TYPE_REPORT } from '../actionType';

const INIT_STATE = {
    AssetActivityList: [],
    AssetByLocation: [],
    AssetByType: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ASSET_ACTIVITY_REPORT:
            return { ...state, AssetActivityList: action.payload };
        case GET_ASSET_LOCATION_REPORT:
            return { ...state, AssetByLocation: action.payload };
        case GET_ASSET_TYPE_REPORT:
            return { ...state, AssetByType: action.payload };
        default:
            return state;
    }
};
