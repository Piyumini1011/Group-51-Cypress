

class ServerUtils {
    constructor() {
        this.baseUrl = 'http://localhost:7081';
    }

    getAuthHeader(auth) {
        if (!auth) return null;
        return `Basic ${btoa(`${auth.username}:${auth.password}`)}`;
    }

    createRequestOptions(method, path, auth, body = null) {
        const options = {
            method,
            url: `${this.baseUrl}${path}`,
            headers: {},
            failOnStatusCode: false
        };

        if (auth) {
            options.headers['Authorization'] = this.getAuthHeader(auth);
        }

        if (body) {
            options.body = body;
            options.headers['Content-Type'] = 'application/json';
        }

        return options;
    }


}

module.exports = new ServerUtils();