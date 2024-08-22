import axiosInstance from '../../../../constants/Global';
import { GET_ALL_CHECK_LIST } from 'components/redux/actionType';
export const saveCheckList = (data) => {
  return async () => {
    const response = await axiosInstance.post(`/check-list/save`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  };
};

export const fetchCheckList = (page, pageSize,search, value,assetClass) => { 
  return (dispatch) => {
    let pageNo;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }
    let url = `/check-list/get-all?page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;
    if (assetClass && assetClass != 'Choose Asset Class' && assetClass != undefined) {
      url += `&assetClass=${assetClass}`;
    }
    
    axiosInstance
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_ALL_CHECK_LIST,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateCheckList = (data) => {
  return async () => {
    const response = await axiosInstance.put(`/check-list/update`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  };
};

export const DeleteCheckList = (id) => {
  return async () => {
    const response = await axiosInstance.delete(`/check-list/delete?id=${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  };
};
