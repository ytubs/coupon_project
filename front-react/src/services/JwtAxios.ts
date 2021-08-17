import axios from 'axios';
import store from '../Redux/Store';

const jwtAxios = axios.create();

jwtAxios.interceptors.request.use(request => {

    request.headers = {
        "token": store.getState().AuthState.user.token
    };

    return request;
});

export default jwtAxios;
