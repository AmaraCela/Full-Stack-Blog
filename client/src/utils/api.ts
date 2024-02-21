type HttpMethods = 'GET' | 'POST' | 'DELETE';

interface APIOptions {
    method?: HttpMethods;
    body?: string;
    token?: string;
}

export const createAPI =
    <FormBody>(endpoint: string, options: APIOptions) =>
        async (body: FormBody) => {
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            };
            return fetch(`http://localhost:5000/api/${endpoint}`, {
                method: options.method ?? 'GET',
                headers,
                body: body ? JSON.stringify(body) : undefined,
            });
        };