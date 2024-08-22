import {
	GET_ASSET_AUDIT,
	GET_ASSET_PENDING_AUDIT,
	GET_ASSET_AUDIT_PENDING,
	GET_ASSET_AUDIT_BY_STATUS,
	GET_ASSET_AUDIT_COMPLETED,
	GET_ASSET_AUDIT_BY_ID,
	GET_ASSET_PENDING_REQUEST_AUDIT,
	GET_AUDIT_BY_ASSET_ID,
	GET_ASSET,
	GET_CHECK_LIST,
	GET_OBSERVATION_DATA,
	GET_CHECK_LIST_AUDIT,
	GET_CHILD_ID_AUDIT,
	GET_ASSET_AUDIT_BY_REJECTED
} from '../actionType';

const INIT_STATE = {
	AssetAudit: [],
	AssetPendingAudit: [],
	AssetRequestPendingAudit: [],
	AssetAuditPending: [],
	AssetAuditByStatus: [],
	AssetAuditCompleted: [],
	AssetAuditById: [],
	AuditByAssetId: [],
	AssetById: [],
	CheckListByAssetClass: [],
	ObservationAsset: [],
	CheckListAudit: [],
	ChildIdAudit: [],
	AssetAuditByRejected: []
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_ASSET_AUDIT:
			return { ...state, AssetAudit: action.payload };
		case GET_ASSET_PENDING_AUDIT:
			return { ...state, AssetPendingAudit: action.payload };
		case GET_ASSET_PENDING_REQUEST_AUDIT:
			return { ...state, AssetRequestPendingAudit: action.payload };
		case GET_ASSET_AUDIT_PENDING:
			return { ...state, AssetAuditPending: action.payload };
		case GET_ASSET_AUDIT_BY_STATUS:
			return { ...state, AssetAuditByStatus: action.payload };
		case GET_ASSET_AUDIT_COMPLETED:
			return { ...state, AssetAuditCompleted: action.payload };
		case GET_ASSET_AUDIT_BY_ID:
			return { ...state, AssetAuditById: action.payload };
		case GET_AUDIT_BY_ASSET_ID:
			return { ...state, AuditByAssetId: action.payload };
		case GET_ASSET:
			return { ...state, AssetById: action.payload };
		case GET_CHECK_LIST:
			return { ...state, CheckListByAssetClass: action.payload };
		case GET_OBSERVATION_DATA:
			return { ...state, ObservationAsset: action.payload };
		case GET_CHECK_LIST_AUDIT:
			return { ...state, CheckListAudit: action.payload };
		case GET_CHILD_ID_AUDIT:
			return { ...state, ChildIdAudit: action.payload };
		case GET_ASSET_AUDIT_BY_REJECTED:
			return { ...state, AssetAuditByRejected: action.payload };
		default:
			return state;
	}
};
