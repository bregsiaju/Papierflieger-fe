import API from './api';

const AuthService = {
  login: async function (data) {
    try {
      const response = await API.post('/auth/login', data);
      console.log(response.data);
      API.defaults.headers['Authorization'] = `${response.token}`;
      setHeadersAndStorage(response.data);
      return response;
    } catch (err) {
      console.log('Auth service error', err);
      throw err;
    }
  },

  register: async function (data) {
    try {
      const response = await API.post('/auth/register', data);
      return response;
    } catch (err) {
      console.log('Auth service error', err);
      throw err;
    }
  },

  logout: () => {
    API.defaults.headers['Authorization'] = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  updateProfile: async function (data) {
    try {
      const headers = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };
      const response = await API.put('/auth/update-profile', data, headers);
      localStorage.setItem('user', JSON.stringify(data));
      return response;
    } catch (err) {
      console.log('Auth service error', err);
      throw err;
    }
  },

};

const setHeadersAndStorage = ({ user, token }) => {
  API.defaults.headers['Authorization'] = `${token}`;
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

export default AuthService;