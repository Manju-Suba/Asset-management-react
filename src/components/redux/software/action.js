import { GET_ALL_SOFTWARE, GET_CLOSE_TO_EXPIRY_SOFTWARE, GET_EXPIRED_SOFTWARE } from 'components/redux/actionType';
import axiosInstance from '../../../constants/Global';

export const getAllSoftware = (category, assetType) => {
    return (dispatch) => {
        let url = `/software/data?type=all`;
        if (category && category != 'Choose Asset Category') {
            url += `&assetCategoryId=${category}`;
        }
        if (assetType) {
            url += `&assetTypeId=${assetType}`;
        }
        axiosInstance
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            })
            .then((res) => {
                dispatch({
                    type: GET_ALL_SOFTWARE,
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
        let url = `/software/data?type=close`;
        if (category && category != 'Choose Asset Category') {
            url += `&assetCategoryId=${category}`;
        }
        if (assetType) {
            url += `&assetTypeId=${assetType}`;
        }
        axiosInstance
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            })
            .then((res) => {
                dispatch({
                    type: GET_CLOSE_TO_EXPIRY_SOFTWARE,
                    payload: res.data.data
                });
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
};

export const getExpired = (category, assetType) => {
    return (dispatch) => {
        let url = `/software/data?type=expired`;
        if (category && category != 'Choose Asset Category') {
            url += `&assetCategoryId=${category}`;
        }
        if (assetType) {
            url += `&assetTypeId=${assetType}`;
        }
        axiosInstance
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            })
            .then((res) => {
                dispatch({
                    type: GET_EXPIRED_SOFTWARE,
                    payload: res.data.data
                });
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
};

export const getAssetByCategory = (categoryId) => {
    return (dispatch) => {
        axiosInstance
            .get(`/asset/get-type-by-category?categoryId=${categoryId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    
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
