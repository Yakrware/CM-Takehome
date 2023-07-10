///////////////////////
// Modules
///////////////////////

import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

///////////////////////
// Types
///////////////////////

import { ApiResponse, BodyParams } from './types';

///////////////////////
// Constants
///////////////////////

export const METHOD_TYPES = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

///////////////////////
// RTK Query
///////////////////////

const baseQuery = fetchBaseQuery({
  baseUrl: '', // The url will need to be handled at the query level since we have multiple domains
});

const BaseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  return result;
};

export const api = createApi({
  baseQuery: BaseQueryWithInterceptor,
  endpoints: () => ({}),
});

///////////////////////
// API Call
///////////////////////

export const apiCall = async <T>(
  url: RequestInfo,
  { method, body }: BodyParams,
): Promise<ApiResponse> => {

  const params: BodyParams = {
    method,
    body: body ? JSON.stringify(body) : undefined,
  };

  let apiResponse: ApiResponse = { success: false, error: 'Unknown error' };

  try {
    const response = await fetch(url, params);
    if (response.ok) {
      // The strategy implemented here serves as an interim solution, as the server's 
      // response to the DELETE request disrupts the standard JSON parsing process.
      if(method === METHOD_TYPES.DELETE){
        let responseText = await response.text();
        apiResponse = { success: true, json: responseText }
      }else{
        apiResponse = { success: true, json: await response.json() };
      }
    } else {
      const text = await response.text();
      apiResponse = { success: false, error: text || `Status: ${response.status}` };
    }
  } catch (e: any) {
    console.log(e);
    apiResponse = { success: false, error: e.message };
  }

  if (apiResponse.success) {
    return Promise.resolve(apiResponse);
  } else {
    return Promise.reject(apiResponse);
  }
};
