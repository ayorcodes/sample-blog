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

        return 'https://ghostmeblog.herokuapp.com/api/v1/';
    }
    private setHeaderAuthorization() {
        return { Authorization: `Bearer ${localStorage.getItem('token')}` };
    }

    private bearerToken() {
        return `Bearer ${localStorage.getItem('token')}`;
    }

}
