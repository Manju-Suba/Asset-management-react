import axiosInstance from '../../../constants/Global';
import { GET_USER_DETAILS } from 'components/redux/actionType';
export const ProfileUpdate = (data) => {
    return async () => {
        const response = await axiosInstance.put(`/users/updatedusers`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    };
};
export const ProfileData = (data) => {
    return (dispatch) => {
        axiosInstance
            .get(`/users/fetchsingleuser/${data}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                dispatch({
                    type: GET_USER_DETAILS,
                    payload: res.data.data
                });
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
};
export const RefreshToken = (token) => {
    return async () => {
        try {
            const response = await axiosInstance.post(`/auth/refreshtoken`, token, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 && response.data && response.data.data && response.data.data.length > 0) {
                window.localStorage.clear();
                localStorage.removeItem('accessToken');
                localStorage.removeItem('token');
				const token = response.data.data[0].token;
				localStorage.setItem('token', token);
            }

            return response;
        } catch (error) {
            // Handle errors
            console.error('Error during Refresh:', error);
            throw error;
        }
    };
};
