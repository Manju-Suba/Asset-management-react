import { GET_ALL_BUSINESS, GET_EDIT_BUSINESS } from 'components/redux/actionType';
import axiosInstance from '../../../../constants/Global';

export const bussinessCreate = (data) => {
    return async () => {
        const response = await axiosInstance.post(`/business/create`, data, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return response;
    };
};

export const getAllBusinessDetails = () => {
    return (dispatch) => {
        axiosInstance
            .get(`/business/get-all`, {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            })
            .then((res) => {
                dispatch({
                    type: GET_ALL_BUSINESS,
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
                    'Content-Type': 'application/json',
                    
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

export const bussinessUpdate = (data) => {
    return async () => {
        const response = await axiosInstance.put(`/business/update`, data, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return response;
    };
};

export const deleteBusiness = (id) => {
    return async () => {
        const response = await axiosInstance.delete(`/business/delete?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return response;
    };
};
