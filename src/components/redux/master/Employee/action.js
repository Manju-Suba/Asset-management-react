import { GET_EMPLOYEE_LIST } from 'components/redux/actionType';
import axiosInstance from '../../../../constants/Global';

export const EmployeeCreate = (data) => {
    return async () => {
        const response = await axiosInstance.post(`/employee/create`, data, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return response;
    };
};

export const getAllEmployeeDetails = () => {
    return (dispatch) => {
        axiosInstance
            .get(`/employee/get-all`, {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            })
            .then((res) => {
                dispatch({
                    type: GET_EMPLOYEE_LIST,
                    payload: res.data.data
                });
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
};

export const EmployeeUpdate = (data) => {
    return async () => {
        const response = await axiosInstance.put(`/employee/update`, data, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return response;
    };
};

export const deleteEmployee = (id) => {
    return async () => {
        const response = await axiosInstance.delete(`/employee/delete?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return response;
    };
};
