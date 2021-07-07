import axios from 'axios';

export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
export const REGISTER_USER_START = 'REGISTER_USER_START';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

// export const login = credentials => dispatch => {
//   dispatch({ type: LOGIN_START });
//   return axios
//     .post('http://localhost:4000/api/login', credentials, {withCredentials:true})
//     .then(res => {
//       if (res.loggedIn) {
//         dispatch({ type: LOGIN_SUCCESS });
//       } else {
//         dispatch({ type: LOGIN_FAIL });
//       }
//     })
//     .catch(err => {
//       dispatch({ type: LOGIN_FAIL, err });
//     });
// };

export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_START });

  return axios
    .post('http://localhost:4000/api/login', credentials, {
      withCredentials: true
    })
    .then(res => {
      console.log(res.headers);
      dispatch({ type: LOGIN_SUCCESS, payload: res });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LOGIN_FAIL, payload: err });
    });
};

export const getUsers = () => dispatch => {
  dispatch({ type: FETCH_USERS_START });
  return axios
    .get('http://localhost:4000/api/users', { withCredentials: true })
    .then(res => {
      console.log(res);
      dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_USERS_FAIL, payload: err });
    });
};
