import {
  GET_ASSET_TRANSFER,
  GET_ASSET_TRANSFER_BY_STATUS,
  GET_ASSET_TRANSFER_BY_ID,
  GET_TRANSFER_HISTORY_BY_ASSETID,
  GET_ASSET_TRANSFER_STATUS_APPROVE,
  GET_ASSET_TRANSFER_STATUS_REJECT
} from '../actionType';

const INIT_STATE = {
  AssetTransfer: [],
  AssetTransferStatus: [],
  AssetTransferApprove: [],
  AssetTransferReject: [],
  AssetTransferById: [],
  AssetTransferDataForClass: [],
  TransferDataForAssetStatus: [],
  TransferHistoryByAssetId: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ASSET_TRANSFER:
      return { ...state, AssetTransfer: action.payload };
    case GET_ASSET_TRANSFER_BY_STATUS:
      return { ...state, AssetTransferStatus: action.payload };
    case GET_ASSET_TRANSFER_STATUS_APPROVE:
      return { ...state, AssetTransferApprove: action.payload };
    case GET_ASSET_TRANSFER_STATUS_REJECT:
      return { ...state, AssetTransferReject: action.payload };
    case GET_ASSET_TRANSFER_BY_ID:
      return { ...state, AssetTransferById: action.payload };
    case GET_TRANSFER_HISTORY_BY_ASSETID:
      return { ...state, TransferHistoryByAssetId: action.payload };
    default:
      return state;
  }
};
