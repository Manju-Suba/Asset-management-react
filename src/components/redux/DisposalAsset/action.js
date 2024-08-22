import {
  GET_DISPOSAL_ASSET_PENDING_REQUEST,
  GET_CLOSE_TO_DISPOSE_ASSET,
  GET_DISPOSED_ASSET,
  GET_STATUS_WISE_ASSET,
  GET_ALL_RENEW_ASSET
} from 'components/redux/actionType';
import axiosInstance from '../../../constants/Global';

export const getDisposalPendingRequest = (status, assetClass, SubClass, assetStatus, page, pageSize, search, value, signal) => {
  return (dispatch) => {
    let pageNo;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }

    let url = `/multiUsers/scrapped-by-status?page=${pageNo}&size=${pageSize}&status=${status}&search=${search}&value=${value}`;

    if (assetClass && assetClass != 'Choose Asset Class' && assetClass != undefined) {
      url += `&assetClass=${assetClass}`;
    }
    if (SubClass && SubClass != 'Choose SubClass') {
      url += `&subClass=${SubClass}`;
    }
    if (assetStatus) {
      url += `&assetStatus=${assetStatus}`;
    }
    axiosInstance
      .get(url, {
        signal: signal,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_DISPOSAL_ASSET_PENDING_REQUEST,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getCloseToDisposeAsset = (page, pageSize,assetClass,search, value) => {
  return (dispatch) => {
    let pageNo;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }
    let url = `/disposed/closed-disposed?page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;
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
          type: GET_CLOSE_TO_DISPOSE_ASSET,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const disposalAssetApprove = (assetId, status) => {
  return async () => {
    const response = await axiosInstance.put(
      `/multiUsers/multiple-scrap-status-update`,
      { assetId, status },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response;
  };
};

export const disposalAssetReject = (assetId) => {
  return async () => {
    const response = await axiosInstance.put(
      `/disposed/rejected-request?id=${assetId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response;
  };
};

export const assetActionReplace = (data) => {
  return async () => {
    const response = await axiosInstance.post(`/disposed/action-replace`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  };
};

export const assetDisposeAction = (data) => {
  return async () => {
    const response = await axiosInstance.post(`/multiUsers/scrap-request`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  };
};

export const assetActionRenew = (data) => {
  return async () => {
    const response = await axiosInstance.post(`/disposed/action-renewed`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  };
};

export const getStatusWiseAsset = (status, category, page, pageSize, search, value, signal) => {
  return (dispatch) => {
    let pageNo;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }
    let url = `/disposed/fetch-by-status?status=${status}&page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;
    if (category && category != 'Choose Asset Class') {
      url += `&assetClass=${category}`;
    }

    axiosInstance
      .get(url, {
        signal: signal,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_STATUS_WISE_ASSET,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getRenewedAsset = (category, page, pageSize, search, value, signal) => {
  return (dispatch) => {
    let pageNo;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }
    let url = `/disposed/get-all-renew?status=renew&page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;
    if (category && category != 'Choose Asset Class') {
      url += `&assetClass=${category}`;
    }

    axiosInstance
      .get(url, {
        signal: signal,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_ALL_RENEW_ASSET,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getDisposedAsset = (category, page, pageSize, search, value, signal) => {
  return (dispatch) => {
    let pageNo;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }
    let url = `/disposed/fetch-data?page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;
    if (category && category != 'Choose Asset Class') {
      url += `&assetClass=${category}`;
    }

    axiosInstance
      .get(url, {
        signal: signal,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_DISPOSED_ASSET,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};
