import debug from 'debug';
import {ManagerCallbackFunction, managerRequest, queueType} from "./Types";

const apiLogger = debug('api-ts');
const apiResultsLogger = debug('api-ts-results');

export class ApiUtil {

    private static _instance: ApiUtil;

    public static getInstance(): ApiUtil {
        if (!(ApiUtil._instance)) {
            ApiUtil._instance = new ApiUtil();
        }
        return ApiUtil._instance;
    }

    public async postFetchJSON(url: string, query: any) {
        const postParameters = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        };

        const response = await fetch(url, postParameters);
        return response.json();
    }

    /*
        Utility function for calling JSON POST requests
        Parameters:
        1.  URL to send the POST request too;
        2.  parameters object whose attribute (name/values) are the request parameters; and
        3.  A function to receive the results when the fetch has completed
            The callback function should have the following form
            callback (jsonDataReturned, httpStatusCode)
            a)  A successful fetch will return the JSON data in the first parameter and a status code of the server
            b)  Parameters that cannot be converted to JSON format will give a null data and code 404
            c)  A server error will give that code and no data
      */
    public apiFetchJSONWithPost(request: managerRequest): void {
        apiLogger(`Executing fetch with URL ${request.originalRequest.url} with body ${request.originalRequest.params}`);
        try {
            JSON.stringify(request.originalRequest.params);
        } catch (error) {
            apiLogger('Unable to convert parameters to JSON');
            apiLogger(request.originalRequest.params, 100);
            request.callback(null, 404, request.queueType, request.requestId);
        }
        const postParameters = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...request.originalRequest.params}),
        };

        this.fetchJSON(request.originalRequest.url, postParameters, request.callback, request.queueType, request.requestId);
    }

    public apiFetchJSONWithGet(request: managerRequest): void {
        apiLogger(`Executing GET fetch with URL ${request.originalRequest.url} with id ${request.originalRequest.params.id}`);
        const getParameters = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
        if (request.originalRequest.params.id && !request.wasOffline) request.originalRequest.url += `/${request.originalRequest.params.id}`;

        this.fetchJSON(request.originalRequest.url, getParameters, request.callback, request.queueType, request.requestId);
    }

    public apiFetchJSONWithDelete(request: managerRequest): void {
        apiLogger(`Executing DELETE fetch with URL ${request.originalRequest.url} with id ${request.originalRequest.params.id}`);
        const delParameters = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        };
        if (request.originalRequest.params.id && !request.wasOffline) request.originalRequest.url += `/${request.originalRequest.params.id}`;

        this.fetchJSON(request.originalRequest.url, delParameters, request.callback, request.queueType, request.requestId);
    }

    public apiFetchJSONWithPut(request: managerRequest) {
        apiLogger(`Executing PUT fetch with URL ${request.originalRequest.url} with id ${request.originalRequest.params.id}`);
        const putParameters = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...request.originalRequest.params}),
        };
        if (request.originalRequest.params.id && !request.wasOffline) request.originalRequest.url += `/${request.originalRequest.params.id}`;

        this.fetchJSON(request.originalRequest.url, putParameters, request.callback, request.queueType, request.requestId);
    }

    private fetchJSON(url: string, parameters: any, callback: ManagerCallbackFunction, queueType: queueType, requestId: string) {
        fetch(url, parameters)
            .then((response) => {
                apiLogger(`Response code was ${response.status}`);
                if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                }
                if (response.status === 400) {
                    apiResultsLogger(response.json());
                }
            })
            .then((data) => {
                apiResultsLogger(data);
                callback(data, 200, queueType, requestId);
            })
            .catch((error) => {
                apiLogger(error);
                callback(null, 500, queueType, requestId);
            });
    }
}

