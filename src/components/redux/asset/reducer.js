import {
	GET_ASSET_NO,
	GET_ASSET_ALLOCATED,
	GET_ASSET_STOCK,
	GET_ASSET_RETRAIL,
	GET_ASSET_STOCK_SCRAP,
	GET_ASSET_DETAILS,
	GET_ASSET_BY_ID,
	GET_CHECK_LIST,
	GET_ASSET_DETAILS_AUDIT,
	GET_ASSET_NOT_REPLACED,
	GET_ASSET_SCRAP_STOCK,
	GET_ASSET_MAINTENANCE
} from '../actionType';

const INIT_STATE = {
	AssetNo: [],
	AssetAllocated: [],
	AssetStock: [],
	AssetRetrail: [],
	AssetDetails: [],
	AssetStockAndScrap: [],
	AssetById: [],
	CheckListData: [],
	AssetDetailsAudit: [],
	NotReplacedAsset: [],
	AssetScrapStock: [],
	AssetMaintenance: []
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_ASSET_NO:
			return { ...state, AssetNo: action.payload };
		case GET_ASSET_ALLOCATED:
			return { ...state, AssetAllocated: action.payload };
		case GET_ASSET_STOCK:
			return { ...state, AssetStock: action.payload };
		case GET_ASSET_RETRAIL:
			return { ...state, AssetRetrail: action.payload };
		case GET_ASSET_STOCK_SCRAP:
			return { ...state, AssetStockAndScrap: action.payload };
		case GET_ASSET_DETAILS:
			return { ...state, AssetDetails: action.payload };
		case GET_ASSET_BY_ID:
			return { ...state, AssetById: action.payload };
		case GET_CHECK_LIST:
			return { ...state, CheckListData: action.payload };
		case GET_ASSET_DETAILS_AUDIT:
			return { ...state, AssetDetailsAudit: action.payload };
		case GET_ASSET_NOT_REPLACED:
			return { ...state, NotReplacedAsset: action.payload };
		case GET_ASSET_SCRAP_STOCK:
			return { ...state, AssetScrapStock: action.payload };
		case GET_ASSET_MAINTENANCE:
			return { ...state, AssetMaintenance: action.payload };
		default:
			return state;
	}
};
