import axios from "axios";
import config from '../Config/config.json';

class AuthManager {
    constructor (baseUrl) {
        this.baseUrl = baseUrl;
    }

    isAuthenticated = () => {
        return this.getAuthorization();
    };

    getAuthorization = () => {
        return localStorage.getItem('authorization');
    };

    authenticate = (username, password, cb) => {
        let inputs = {username, password};

        let axiosConfig = {
            headers: {
                'pport': config.pport
            }
        };

        axios.post(`${this.baseUrl}/user/login`, inputs, axiosConfig)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    localStorage.setItem('authorization', `Bearer ${res.data.data.accessToken}`);
                    cb(true, res.data.data, res.data.message);
                } else {
                    cb(false, res.data.data, res.data.message);
                }
            })
            .catch(error => {
                cb(false, error.response && error.response.data && error.response.data.data,
                    (error.response && error.response.data) ? error.response.data.message : error);
            })
    };

    logout = () => {
        localStorage.removeItem('authorization');
    }
}

// TODO for test
let Auth = new AuthManager("https://publisher.weblancer.ir/publisher_1/client/api");
// let Auth = new AuthManager('/api');

export default Auth;
