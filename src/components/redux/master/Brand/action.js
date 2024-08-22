import { GET_BRAND_LIST } from 'components/redux/actionType';
import axiosInstance from '../../../../constants/Global';

export const BrandCreate = (data) => {
    return async () => {
        const response = await axiosInstance.post(`/brand/create`, data, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return response;
    };
};

export const getAllBrandDetails = () => {
    return (dispatch) => {
        axiosInstance
            .get(`/brand/get-all`, {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            })
            .then((res) => {
                dispatch({
                    type: GET_BRAND_LIST,
                    payload: res.data.data
                });
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
};

export const BrandUpdate = (data) => {
    return async () => {
        const response = await axiosInstance.put(`/brand/update`, data, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return response;
    };
};

export const deleteBrand = (id) => {
    return async () => {
        const response = await axiosInstance.delete(`/brand/delete?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return response;
    };
};
