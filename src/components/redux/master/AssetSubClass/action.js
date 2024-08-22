import axiosInstance from '../../../../constants/Global';
import { GET_ASSET_SUBCLASS } from 'components/redux/actionType';

export const getAllAssetSubClass = (assetClass) => {
    return (dispatch) => {
      let url = `/asset-class/get-subclass?assetClass=${assetClass}`;
  
      axiosInstance
        .get(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          dispatch({
            type: GET_ASSET_SUBCLASS,
            payload: res.data.data
          });
        })
        .catch((error) => {
          console.log('error', error);
        });
    };
  };