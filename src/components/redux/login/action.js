import axiosInstance from '../../../constants/Global';

export const LoginStore = (Formdata) => {
  return async () => {
    try {
      const response = await axiosInstance.post(`/auth/signin`, Formdata, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && response.data && response.data.data && response.data.data.length > 0) {
        const token = response.data.data[0].token;
        localStorage.setItem('token', token); // store the token into localstorage
      }

      return response;
    } catch (error) {
      // Handle errors
      console.error('Error during login:', error);
      throw error;
    }
  };
};
export const Logout = () => {
  return async () => {
    try {
      const response = await axiosInstance.post(
        `/auth/signout`,
        {},
        {
          headers: {
            
          }
        }
      );
      if (response.status === 200) {
        window.localStorage.clear();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
      }
      return response;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };
};
export const SendRequest = (Formdata) => {
  return async () => {
    try {
      const response = await axiosInstance.get(`/auth/fetch-by-mail?email=${Formdata.email}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    } catch (error) {
      // Handle errors
      console.error('Error during login:', error);
      throw error;
    }
  };
};

export const ResetPasswordApi = (values) => {
  return async () => {
    try {
      const response = await axiosInstance.put(`/auth/reset-password`, values, {
        headers: {
        'Content-Type': 'application/json',
        }
      });
      return response;
    } catch (error) {
      console.error('Error during reset the password:', error);

      // Handle errors
      throw error;
    }
  };
};


export const CheckLinkStatus = (emailid) => {
  return async () => {
    try {
      const response = await axiosInstance.get(`/auth/check-by-mail?email=${emailid}`,{}, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response;
    } catch (error) {
      console.error('Error during validate the link:', error);
      // Handle errors
      throw error;
    }
  };
};