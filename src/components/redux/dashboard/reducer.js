import {
    GET_ASSET_COUNT,
    GET_ASSET_CATEGORY_COUNT,
    GET_ASSET_DAMAGED_REJECTED,
    GET_ASSET_DAMAGED_RATE,
    GET_RECENT_PURCHASE_ASSET,
    GET_OVERALL_ASSET_STATUS,
    GET_STATUS_ASSET_COUNT,
    GET_MAJOR_MINOR_ASSET,
    GET_DAMAGED_REJECTED
} from '../actionType';

const INIT_STATE = {
    AssetCount: [],
    AssetDamagedRejected: [],
    AssetPurchased: [],
    AssetByStatus: [],
    AssetCategoryCount: [],
    AssetDamageRate: [],
    StatusAssetCount: [],
    MajorMinorAssetClass:[],
    DamagedAndRejected:[]
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ASSET_COUNT:
            return { ...state, AssetCount: action.payload };
        case GET_ASSET_DAMAGED_REJECTED:
            return { ...state, AssetDamagedRejected: action.payload };
        case GET_RECENT_PURCHASE_ASSET:
            return { ...state, AssetPurchased: action.payload };
        case GET_OVERALL_ASSET_STATUS:
            return { ...state, AssetByStatus: action.payload };
        case GET_ASSET_CATEGORY_COUNT:
            return { ...state, AssetCategoryCount: action.payload };
        case GET_ASSET_DAMAGED_RATE:
            return { ...state, AssetDamageRate: action.payload };
        case GET_STATUS_ASSET_COUNT:
            return { ...state, StatusAssetCount: action.payload };
        case GET_MAJOR_MINOR_ASSET:
            return { ...state, MajorMinorAssetClass: action.payload }; 
        case GET_DAMAGED_REJECTED:
            return { ...state, DamagedAndRejected: action.payload };      
        default:
            return state;
    }
};
