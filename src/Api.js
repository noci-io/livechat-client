import axios from "axios";
import axiosRetry from "axios-retry";

/**
 * Handles the API communication
 */
export default class Api {
  /**
   * Contains the axios instance
   */
  axios = null;

  /**
   * Initializes the API, and creates the Axios instance with proper parameters
   */
  constructor(
    axiosRetryEnable = true,
    axiosRetriesQty = 10,
    axiosRetryDelay = 1000,
    baseUrl = null
  ) {
    this.baseURL = baseUrl
    this.axios = axios.create({
      baseURL: baseUrl ?? process.env.LIVECHAT_SERVER_URL,
      responseType: "json",
      headers: {
        "Content-Type": "application/json"
      },
      transformRequest: data => JSON.stringify(data)
    });

    if (axiosRetryEnable) {
      axiosRetry(this.axios, {
        retries: axiosRetriesQty,
        retryDelay: () => {
          return axiosRetryDelay;
        }
      });
    }
  }

  /**
   * Makes a GET request on the API
   *
   * @param endpoint    Endpoint URL, without start-slash and parameters
   * @param params      GET parameters
   * @param parse       Tells if we must parse returned JSON data
   */
  async get(
    endpoint,
    params = {},
    parse = true
  ) {
    const response = await this.axios.get(endpoint, {
      params: params
    });
    if (parse)
      return {
        data: response.data,
        code: response.status,
        headers: response.headers
      };
    return response;
  }

  /**
   * Makes a POST request on the API
   *
   * @param endpoint    Endpoint URL, without start-slash and parameters
   * @param params      JSON body parameters
   * @param parse       Tells if we must parse returned JSON data
   */
  async post(
    endpoint,
    params = {},
    parse = true
  ) {
    const response = await this.axios.post(endpoint, params);
    if (parse)
      return {
        data: response.data,
        code: response.status,
        headers: response.headers
      };
    return response;
  }

  /**
   * Makes a PUT request on the API
   *
   * @param endpoint    Endpoint URL, without start-slash and parameters
   * @param params      JSON body parameters
   * @param parse       Tells if we must parse returned JSON data
   */
  async put(
    endpoint,
    params = {},
    parse = true
  ) {
    const response = await this.axios.put(endpoint, params);
    if (parse)
      return {
        data: response.data,
        code: response.status,
        headers: response.headers
      };
    return response;
  }

  /**
   * Makes a PATCH request on the API
   *
   * @param endpoint    Endpoint URL, without start-slash and parameters
   * @param params      JSON body parameters
   * @param parse       Tells if we must parse returned JSON data
   */
  async patch(
    endpoint,
    params = {},
    parse = true
  ) {
    const response = await this.axios.patch(endpoint, params);
    if (parse)
      return {
        data: response.data,
        code: response.status,
        headers: response.headers
      };
    return response;
  }

  /**
   * Makes a DELETE request on the API
   *
   * @param endpoint    Endpoint URL, without start-slash and parameters
   * @param params      GET parameters
   * @param parse       Tells if we must parse returned JSON data
   */
  async delete(
    endpoint,
    params = {},
    parse = true
  ) {
    const response = await this.axios.delete(endpoint, {
      params: params
    });
    if (parse)
      return {
        data: response.data,
        code: response.status,
        headers: response.headers
      };
    return response;
  }
}
