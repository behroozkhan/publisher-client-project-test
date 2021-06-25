import axios from "axios";
import Auth from "./Auth";
import config from '../Config/config.json';

export default class ServerManager {
    constructor(baseUrl, weblancerContext) {
        this.baseUrl = baseUrl;
        this.context = weblancerContext;
    }

    getOptions = () => {
        return {
            headers: {
                'Authorization': Auth.getAuthorization(),
                'pport': config.pport,
            }
        }
    };

    register = (inputs, cb) => {
        axios.post(`${this.baseUrl}/user/register`, inputs, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, res.data.data, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else if (error.response && error.response.status === 409) {
                    cb(false, error.response.data.data, error.response.data.message);
                } else if (error.response && error.response.status === 500) {
                    cb(false, error.response.data.data, error.response.data.message);
                } else if (error.response && error.response.status === 400) {
                    cb(false, error.response.data.data, error.response.data.message);
                } else {
                    cb(false, undefined, error);
                }
            })
    };

    getUserData = (cb) => {
        axios.get(`${this.baseUrl}/user/mine`, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    }

    confirmMail = (hash, cb) => {
        axios.post(`${this.baseUrl}/user/mailconfirm`, {hash}, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data.website);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    }

    changepasswordrequest = (inputs, cb) => {
        axios.post(`${this.baseUrl}/user/changepasswordrequest`, inputs, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data.website);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    }

    changepassword = (inputs, cb) => {
        axios.post(`${this.baseUrl}/user/changepassword`, inputs, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data.website);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    }

    changePassword = (inputs, cb) => {
        axios.post(`${this.baseUrl}/user/changepassword`, inputs, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data.website);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    }

    getUserWebsites = (cb) => {
        axios.get(`${this.baseUrl}/website`, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    };

    createNewWebSite = (website, cb) => {
        axios.post(`${this.baseUrl}/website`, website, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data.website);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    };

    requestEditor = (websiteId, cb) => {
        axios.post(`${this.baseUrl}/website/editor`, {websiteId}, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    };

    publishProcess = (websiteId, cb) => {
        axios.post(`${this.baseUrl}/website/publishProcess`, {websiteId}, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    };

    publishRequest = (websiteId, cb) => {
        axios.post(`${this.baseUrl}/website/publish`, {websiteId}, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    };

    getLongProcess = (id, cb) => {
        axios.post(`${this.baseUrl}/website/longprocess`, {id}, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    };

    deleteEditor = (longProcessId, cb) => {
        axios.post(`${this.baseUrl}/website/delete-editor`, {longProcessId}, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    };

    getWebsite = (id, cb) => {
        axios.get(`${this.baseUrl}/website/${id}`, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    };

    saveWebsite = (websiteId, name, description, siteData, cb) => {
        axios.put(`${this.baseUrl}/website`, {
            id: websiteId,
            name, description,
            metadata: {siteData}
        }, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    };

    test = (cb) => {
        axios.get(`${this.baseUrl}/test`, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    };

    post = (route, input, cb) => {
        axios.post(`${this.baseUrl}${route}`, input, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    }

    get = (route, cb) => {
        axios.get(`${this.baseUrl}${route}`, this.getOptions())
            .then(res => {
                if (res.data.success) {
                    cb(true, res.data.data);
                } else {
                    cb(false, undefined, res.data.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.context.pageRedirect('/login');
                } else {
                    cb(false, undefined, error);
                }
            })
    }
}
