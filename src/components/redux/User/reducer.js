import { GET_ALL_ASSET_LIST, GET_ASSET_LIST_BY_CLASS, GET_ALL_ASSET_LIST_FOR_FILTER, GET_USER_DETAILS } from '../actionType';

const INIT_STATE = {
	AllAssetList: [],
	AssetByClass: [],
	AssetForFilter: [],
	UserDetails: []
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_ALL_ASSET_LIST:
			return { ...state, AllAssetList: action.payload };
		case GET_ASSET_LIST_BY_CLASS:
			return { ...state, AssetByClass: action.payload };
		case GET_ALL_ASSET_LIST_FOR_FILTER:
			return { ...state, AssetForFilter: action.payload };
		case GET_USER_DETAILS:
			return { ...state, UserDetails: action.payload };
		default:
			return state;
	}
};
