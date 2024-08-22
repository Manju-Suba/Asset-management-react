import {
  GET_DISPOSAL_ASSET_PENDING_REQUEST,
  GET_CLOSE_TO_DISPOSE_ASSET,
  GET_STATUS_WISE_ASSET,
  GET_DISPOSED_ASSET,
  GET_ALL_RENEW_ASSET
} from '../actionType';

const INIT_STATE = {
  DisposalPendingRequest: [],
  CloseToDisposeAsset: [],
  StatusWiseAsset: [],
  DisposedAsset: [],
  RenewedAsset: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DISPOSAL_ASSET_PENDING_REQUEST:
      return { ...state, DisposalPendingRequest: action.payload };
    case GET_CLOSE_TO_DISPOSE_ASSET:
      return { ...state, CloseToDisposeAsset: action.payload };
    case GET_STATUS_WISE_ASSET:
      return { ...state, StatusWiseAsset: action.payload };
    case GET_ALL_RENEW_ASSET:
      return { ...state, RenewedAsset: action.payload };
    case GET_DISPOSED_ASSET:
      return { ...state, DisposedAsset: action.payload };
    default:
      return state;
  }
};
