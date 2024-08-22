import { GET_ASSET_TYPE, GET_ASSET_BY_CATEGORY } from 'components/redux/actionType';
import axiosInstance from '../../../../constants/Global';

export const assetTypeCreate = (data) => {
  return async () => {
    const response = await axiosInstance.post(`/asset-type/create`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  };
};

export const getAllAssetTypeDetails = (page, pageSize, signal) => {
  return (dispatch) => {
    let pageNo;
    let url;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }
    url = `/asset-class/fetchall-subClass?page=${pageNo}&size=${pageSize}`;
    axiosInstance
      .get(url, {
        signal: signal,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_ASSET_TYPE,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getAssetTypeByCategory = (categoryId) => {
  return (dispatch) => {
    axiosInstance
      .get(`/asset/get-type-by-category?categoryId=${categoryId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_ASSET_BY_CATEGORY,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const assetTypeUpdate = (data) => {
  return async () => {
    const response = await axiosInstance.put(`/asset-type/update`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  };
};

export const deleteAssetType = (id) => {
  return async () => {
    const response = await axiosInstance.delete(`/asset-type/delete?id=${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  };
};
