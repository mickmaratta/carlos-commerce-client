import { publicRequest } from "../requestMethods";
import { addUserFailure, addUserStart, addUserSuccess, loginFailure, loginStart, loginSuccess } from "./userSlice"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(loginFailure());
    }
}

//ADD USER
export const addUser = async (client, dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await publicRequest.post(`/auth/register`, client)
        dispatch(addUserSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(addUserFailure());
    }
}