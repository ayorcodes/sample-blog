import axios from 'axios';

const auth = 'Authorization';

export class ApiConfigService {
    private server = 'local';

    public Request() {
        return axios.create({
            baseURL: this.baseUrl(),
            headers: this.setHeaderAuthorization(),
        });
    }

    public LoginRequest() {
        return axios.create({
            baseURL: this.baseUrl(),
        });
    }

    public setToken() {
        this.Request().defaults.headers.common[auth] = this.bearerToken();
    }

    public delteToken() {
        delete this.Request().defaults.headers.common[auth];
    }

    private baseUrl() {
        const Server = this.server;
        if (Server === 'local') return 'http://localhost:5000/api/v1/';

        return 'http://192.168.43.103:8000/api/';
    }
    private setHeaderAuthorization() {
        return { Authorization: `Bearer ${localStorage.getItem('token')}` };
    }

    private bearerToken() {
        return `Bearer ${localStorage.getItem('token')}`;
    }

}
