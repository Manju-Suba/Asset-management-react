import { GET_ASSET_ACTIVITY_REPORT, GET_ASSET_LOCATION_REPORT, GET_ASSET_TYPE_REPORT } from 'components/redux/actionType';
import axiosInstance from '../../../constants/Global';

export const getAssetActivity = () => {
    return (dispatch) => {
        let url = `/report/get-activity-report`;

        axiosInstance
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            })
            .then((res) => {
                dispatch({
                    type: GET_ASSET_ACTIVITY_REPORT,
                    payload: res.data.data
                });
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
};

export const getAssetByLocation = (locationId) => {
    return (dispatch) => {
        let url = `/report/get-asset-byLocation`;
        if (locationId) {
            url += `?locationId=${locationId}`;
        }
        axiosInstance
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            })
            .then((res) => {
                dispatch({
                    type: GET_ASSET_LOCATION_REPORT,
                    payload: res.data.data
                });
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
};

export const getAssetByType = (assetType) => {
    return (dispatch) => {
        let url = `/report/get-asset-byType`;
        if (assetType) {
            url += `?typeId=${assetType}`;
        }
        axiosInstance
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            })
            .then((res) => {
                dispatch({
                    type: GET_ASSET_TYPE_REPORT,
                    payload: res.data.data
                });
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
};
