import axios from 'axios';

export default class Fetchly {

    constructor(config = {}) {
        this.instance = axios.create({
            baseURL: config.baseURL || '',
            timeout: config.timeout || 10000,
            ...config,
        });
        if (config.requestInterceptor) {
            this.instance.interceptors.request.use(config.requestInterceptor, config.requestInterceptorError);
        }

        if (config.responseInterceptor) {
            this.instance.interceptors.response.use(config.responseInterceptor, config.responseInterceptorError);
        }
        this.enableLogging = config.enableLogging || false;
    }

    async request(config) {
        try {
            const response = await this.instance.request(config);

            if (this.enableLogging) {
                console.log('[Fetchly] Request:', config);
                console.log('[Fetchly] Response:', response);
            }

            return {
                success: true,
                status: response.status,
                data: response.data,
                headers: response.headers,
                config: response.config,
            };
        } catch (error) {
            return {
                success: false,
                status: error.response ? error.response.status : null,
                message: error.message,
                data: error.response ? error.response.data : null,
                headers: error.response ? error.response.headers : null,
                config: error.config,
            };
        }
    }

    get(url, config) {
        return this.request({ method: 'GET', url, ...config });
    }

    post(url, data, config) {
        return this.request({ method: 'POST', url, data, ...config });
    }

    patch(url, data, config) {
        return this.request({ method: 'PATCH', url, data, ...config });
    }

    put(url, data, config) {
        return this.request({ method: 'PUT', url, data, ...config });
    }

    delete(url, config) {
        return this.request({ method: 'DELETE', url, ...config });
    }

    customRequest(method, url, data = null, config = {}) {
        return this.request({ method, url, data, ...config });
    }
}