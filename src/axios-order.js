import axios from "axios";

const instance = axios.create({
    baseURL: 'https://buger-app-fccb4-default-rtdb.firebaseio.com/'
})


export default instance; 