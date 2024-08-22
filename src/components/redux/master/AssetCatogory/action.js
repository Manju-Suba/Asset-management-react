import { GET_ASSET_CATEGORY, GET_EDIT_BUSINESS } from 'components/redux/actionType';
import axiosInstance from '../../../../constants/Global';

export const assetCreate = (data) => {
  return async () => {
    const response = await axiosInstance.post(`/asset-category/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        
      }
    });
    return response;
  };
};

export const getAllAssetCategoryDetails = (signal) => {
  return (dispatch) => {
    axiosInstance
      .get(`/asset-class/get-all`, {
        signal: signal,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_ASSET_CATEGORY,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getBusinessById = (rowId) => {
  return (dispatch) => {
    axiosInstance
      .get(`/business/get?id=${rowId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_EDIT_BUSINESS,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const assetUpdate = (data) => {
  return async () => {
    const response = await axiosInstance.put(`/asset-category/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        
      }
    });
    return response;
  };
};

export const deleteAsset = (id) => {
  return async () => {
    const response = await axiosInstance.delete(`/asset-category/delete?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        
      }
    });
    return response;
  };
};
