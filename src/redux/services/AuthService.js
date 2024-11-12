import { loginFailure, loginRequest, loginSuccess } from "../actions/AuthActions";

export const loginService = ({ email, password }) => {
    return (dispatch) => {
      dispatch(loginRequest());
  
      const validEmail = 'sparcuser1@gmail.com';
      const validPassword = 'Sparc@123';
  
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === validEmail && password === validPassword) {
            localStorage.setItem('isAuthenticated', 'true');
            resolve({ email });
            dispatch(loginSuccess({ email }));
          } else {
            const error = 'Invalid email or password';
            reject(error);
            dispatch(loginFailure(error));
          }
        }, 1000);
      });
    };
  };