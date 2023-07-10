///////////////////////
// Modules
///////////////////////

import { IRepository } from 'GithubApp/src/store/Repos/types';
import { api } from '../../api';


///////////////////////
// Transformers
///////////////////////

import { repoDataTransformer } from './transformer';

///////////////////////
// Constants
///////////////////////

// Number of github search results per page.
const PER_PAGE = 10;

///////////////////////
// Types
///////////////////////

export const githubApi = api.injectEndpoints({
  endpoints: build => ({
    repoSearch: build.query<IRepository[], string>({
      query: query => ({
        url: `${process.env.GITHUB_API_URL}search/repositories?q=${query}&per_page=${PER_PAGE}`,
        method: 'GET',
        headers: {
          // As a workaround for Github's rate limiting the access token is sent in the headers.
          'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
        }
      }),
      transformResponse: (response: any) => {
        // Here you can transform the response as you need before it's saved into the store.
        // For instance:
        // return response.data.map(item => ({...item, customProperty: 'newValue'}));
        return repoDataTransformer(response.items);
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLazyRepoSearchQuery } = githubApi;
