import { login, signOut } from './authSlice';
// import {
//   saveAuthToLocal,
//   calculateRemainingTime,
//   getAuthFromLocal,
//   removeAuthFromLocal,
// } from "@/app/utils/defaults";

const logoutHandler = () => {
    return (dispatch, getState) => {
        console.log('the current state of login from authAction==>', getState());
        dispatch(signOut()); //the store is not preserving its value
        // removeAuthFromLocal();
    };
};

const loginHandler = (authDetails) => {
    return (dispatch) => {
        // auth details are passed from the
        const { accessToken, refreshToken, data } = authDetails;
        // saving auth values to local as Object
        // saveAuthToLocal({
        //   accessToken,
        //   refreshToken,
        //   data,
        // });

        // calling the reducer's action to set the state
        dispatch(login(authDetails));
    };
};

const checkLoginStatus = () => {
    return (dispatch) => {
        // const authDetails = getAuthFromLocal();

        if (authDetails) {
            const accessTokenExpired = checkTimeIsExpired(authDetails.accessTokenExpirationTime);

            if (accessTokenExpired) {
                // removeAuthFromLocal();
                dispatch(signOut());
                return;
            }

            dispatch(login(authDetails));
            // const autoLogoutTime = calculateRemainingTime(
            //   authDetails.accessTokenExpirationTime
            // );
            // setTimeout(() => {
            //   removeAuthFromLocal();
            //   dispatch(signOut());
            // }, autoLogoutTime);
            return;
        }

        // removeAuthFromLocal();
        dispatch(signOut());
    };
};

export {
    logoutHandler,
    loginHandler,
    checkLoginStatus,
    // saveAuthToLocal,
    // removeAuthFromLocal,
    // getAuthFromLocal,
};
