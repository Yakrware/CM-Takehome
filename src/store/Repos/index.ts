///////////////////////
// Modules
///////////////////////

import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

///////////////////////
// Types
///////////////////////

import { IReposState, IRepository, IDeletePayload, GetReposResponse } from './types';

///////////////////////
// Transformers
///////////////////////

import { getReposTransformer } from './transformer';

///////////////////////
// Services
///////////////////////

import reposApi from '../../services/modules/repos';

///////////////////////
// Constants
///////////////////////

const INITIAL_STATE: IReposState = {
  get: {
    loading: false,
    data: [],
    error: null
  },
  post: {
    loading: false,
    data: [],
    error: null
  },
  delete: {
    loading: false,
    data: [],
    error: null
  }
};

///////////////////////
// Thunks
///////////////////////

// First, create the async thunk
export const getRepos = createAsyncThunk('repos/getRepos', async () => {
  const response = await reposApi.getRepos();
  const json = response.json as GetReposResponse; 
  return getReposTransformer(json.repos);
});

export const addRepo = createAsyncThunk<unknown, IRepository>('repos/postRepo', async (repo: IRepository) => {
  await reposApi.addRepo(repo);
  return repo;
});

export const deleteRepo = createAsyncThunk<unknown, string>('repos/deleteRepo', async (id: string) => {
  await reposApi.deleteRepo(id);
  return id;

});


///////////////////////
// Slice
///////////////////////

const reposSlice = createSlice({
  name: 'repos',
  initialState: INITIAL_STATE,
  reducers: {
    // Define standard reducers here
    sortReposAscending: (state) => {
      state.get.data.sort((a, b) => a.stargazersCount - b.stargazersCount);
    },
    sortReposDescending: (state) => {
      state.get.data.sort((a, b) => b.stargazersCount - a.stargazersCount);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getRepos.pending, (state: IReposState) => {
        state.get.loading = true;
      })
      .addCase(getRepos.fulfilled, (state: IReposState, action) => {
        const payload = action.payload as IRepository[];
        state.get.loading = false
        state.get.data = payload;
      })
      .addCase(getRepos.rejected, (state, action) => {
        state.get.loading = false;
        state.get.error = action.payload as string;
      }),
    builder
      .addCase(addRepo.pending, (state) => {
        state.post.loading = true;
      })
      .addCase(addRepo.fulfilled, (state, action) => {
        state.post.loading = false
        state.get.data.push(action.payload);
      })
      .addCase(addRepo.rejected, (state, action) => {
        state.post.loading = false;
        state.post.error = action.payload as string;
      }),
    builder
      .addCase(deleteRepo.pending, (state) => {
        state.delete.loading = true;
      })
      .addCase(deleteRepo.fulfilled, (state, action) => {
        const payload = action.payload as string;
        state.delete.loading = false
        console.log('Attempting to delete');
        console.log('ID', payload);
        state.get.data= state.get.data.filter(
          (repo: IRepository) => repo.id !== payload
        );
      })
      .addCase(deleteRepo.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.payload as string;
      })
  },
});

// Export the action creators
export const { sortReposAscending, sortReposDescending } = reposSlice.actions;

export default reposSlice.reducer;
