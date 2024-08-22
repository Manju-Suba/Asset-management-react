import {
  GET_ALL_ASSET_LIST,
  GET_ASSET_LIST_BY_CLASS,
  GET_ALL_ASSET_LIST_FOR_FILTER,
  GET_ALL_ASSET_STOCK_LIST
} from 'components/redux/actionType';
import axiosInstance from '../../../constants/Global';

export const getAllAssetList = (assetClass, assetType) => {
  return (dispatch) => {
    let url = `/asset/get-all`;
    if (
      assetClass &&
      assetClass != 'Choose Asset Class' &&
      assetClass != undefined &&
      assetType &&
      assetType != 'Asset Status' &&
      assetType != undefined
    ) {
      url += `?assetClass=${assetClass}&assetStatus=${assetType}`;
    } else if (assetType && assetType != 'Asset Status' && assetType != undefined) {
      url += `?assetStatus=${assetType}`;
    } else if (assetClass && assetClass != 'Choose Asset Class' && assetClass != undefined) {
      url += `?assetClass=${assetClass}`;
    }
    axiosInstance
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_ALL_ASSET_LIST,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getAllAssetListByPage = (assetClass, selectedSubClass, assetType, page, pageSize, search, value, signal) => {
  return (dispatch) => {
    let pageNo;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }
    let url = `/asset/get-all-assets?page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;

    if (assetType && assetType != 'Asset Status' && assetType != undefined) {
      url += `&assetStatus=${assetType}`;
    }
    if (assetClass && assetClass != 'Choose Asset Class' && assetClass != undefined) {
      url += `&assetClass=${assetClass}`;
    }
    if (selectedSubClass && selectedSubClass != 'Choose SubClass' && selectedSubClass != undefined) {
      url += `&subClass=${selectedSubClass}`;
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
          type: GET_ALL_ASSET_LIST,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getAllAssetStockListByPage = (assetClass, selectedSubClass, assetType, page, pageSize, search, value, signal) => {
  return (dispatch) => {
    let pageNo;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }
    let url = `/multiUsers/get-all?page=${pageNo}&size=${pageSize}&search=${search}&value=${value}`;

    if (assetType && assetType != 'Asset Status' && assetType != undefined) {
      url += `&assetStatus=${assetType}`;
    }
    if (assetClass && assetClass != 'Choose Asset Class' && assetClass != undefined) {
      url += `&assetClass=${assetClass}`;
    }
    if (selectedSubClass && selectedSubClass != 'Choose SubClass' && selectedSubClass != undefined) {
      url += `&childId=${selectedSubClass}`;
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
          type: GET_ALL_ASSET_STOCK_LIST,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getAllAssetRejected = (page, pageSize, signal) => {
  return (dispatch) => {
    let pageNo;
    if (page) {
      pageNo = page;
    } else {
      pageNo = 0;
    }
    let url = `/asset/get-all-assets?page=${pageNo}&size=${pageSize}`;

    axiosInstance
      .get(url, {
        signal: signal,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_ALL_ASSET_LIST,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getAssetIdByClass = (assetClass, assetType) => {
  return (dispatch) => {
    let url = `/asset/get-all`;
    if (assetClass && assetClass != 'Choose Asset Class' && assetClass != undefined) {
      url += `?assetClass=${assetClass}`;
    }
    if (assetType && assetType != 'Choose Asset Type' && assetType != undefined) {
      url += `&assetStatus=${assetType}`;
    }
    axiosInstance
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_ALL_ASSET_LIST_FOR_FILTER,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getCloseToExpiry = (category, assetType) => {
  return (dispatch) => {
    let url = `/asset/data?type=close`;
    if (category && category != 'Choose Asset Category' && category != undefined) {
      url += `&assetCategoryId=${category}`;
    }
    if (assetType) {
      url += `&assetTypeId=${assetType}`;
    }
    axiosInstance
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_ASSET_LIST_BY_CLASS,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const getAssetByClass = (assetClass, assetType, assetNo) => {
  return (dispatch) => {
    let url = `/asset/get-byclass?assetClass=${assetClass}`;
    if (assetType && assetType != 'Choose Asset Type' && assetType != undefined) {
      url += `&assetStatus=${assetType}`;
    }
    if (assetNo && assetNo != undefined) {
      url += `&assetId=${assetNo}`;
    }

    axiosInstance
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        dispatch({
          type: GET_ASSET_LIST_BY_CLASS,
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};
