import { GET_DEPARTMENT_LIST } from 'components/redux/actionType';
import axiosInstance from '../../../../constants/Global';

export const DepartmentCreate = (data) => {
    return async () => {
        const response = await axiosInstance.post(`/department/create`, data, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return response;
    };
};

export const getAllDepartmentDetails = () => {
    return (dispatch) => {
        axiosInstance
            .get(`/department/get-all`, {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            })
            .then((res) => {
                dispatch({
                    type: GET_DEPARTMENT_LIST,
                    payload: res.data.data
                });
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
};

export const DepartmentUpdate = (data) => {
    return async () => {
        const response = await axiosInstance.put(`/department/update`, data, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return response;
    };
};

export const deleteDepartment = (id) => {
    return async () => {
        const response = await axiosInstance.delete(`/department/delete?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return response;
    };
};
