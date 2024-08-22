import { GET_LOCATION_LIST } from 'components/redux/actionType';
import axiosInstance from '../../../../constants/Global';

export const LocationCreate = (data) => {
  return async () => {
    const response = await axiosInstance.post(`/location/create`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  };
};

export const getAllLocationDetails = (page, pageSize, signal) => {
  return (dispatch) => {
    let pageNo;
    let url;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }
    url = `/asset-class/get-plant?page=${pageNo}&size=${pageSize}`;
    axiosInstance
      .get(url, {
        signal: signal,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_LOCATION_LIST,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getAllPlant = (signal) => {
  return (dispatch) => {
    let url;

    url = `/asset-class/get-plant`;
    axiosInstance
      .get(url, {
        signal: signal,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_LOCATION_LIST,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const LocationUpdate = (data) => {
  return async () => {
    const response = await axiosInstance.put(`/location/update`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  };
};

export const deleteLocation = (id) => {
  return async () => {
    const response = await axiosInstance.delete(`/location/delete?id=${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  };
};
