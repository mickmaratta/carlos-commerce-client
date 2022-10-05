import axios from "axios";

const BASE_URL = "https://carloscommerce-api-0wb8.onrender.com/api/";
let TOKEN;
if(!JSON.parse(localStorage.getItem("persist:root"))) {
    TOKEN = "test"
} else if(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser) {
    TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
} else {
    TOKEN =null;
}


export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}` },
});