import { GET_ASSET_CLASS, GET_ASSET_CLASS_MASTER,GET_CHECK_LIST_ASSET_CLASS } from '../../actionType';

const INIT_STATE = {
  AssetClassData: [],
  AssetClassMaster: [],
  CheckListAssetClass:[]
};
 
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ASSET_CLASS:
      return { ...state, AssetClassData: action.payload };
    case GET_ASSET_CLASS_MASTER:
      return { ...state, AssetClassMaster: action.payload };
    case GET_CHECK_LIST_ASSET_CLASS:
      return {...state,CheckListAssetClass:action.payload} 
    default:
      return state;
  }
};
