import { GET_ASSET_TICKET_NO, GET_ASSET_TICKET, GET_ASSET_TICKET_BY_ID, GET_ASSET_TICKET_NO_COUNT, GET_STATUSWISE_ASSET_TICKET } from '../actionType';

const INIT_STATE = {
	AssetTicketNo: [],
	AssetTicket: [],
	AssetTicketById: [],
	AssetTicketNoCount:[],
	StatusWiseAssetTicket:[]
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_ASSET_TICKET_NO:
			return { ...state, AssetTicketNo: action.payload };
		case GET_ASSET_TICKET:
			return { ...state, AssetTicket: action.payload };
		case GET_ASSET_TICKET_BY_ID:
			return { ...state, AssetTicketById: action.payload };
		case GET_ASSET_TICKET_NO_COUNT:
			return { ...state, AssetTicketNoCount: action.payload };
		case GET_STATUSWISE_ASSET_TICKET:
			return { ...state, StatusWiseAssetTicket: action.payload };
		default:
			return state;
	}
};
