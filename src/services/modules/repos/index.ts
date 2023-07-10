///////////////////////
// Modules
///////////////////////

import { METHOD_TYPES, apiCall } from '../../api';

///////////////////////
// Types
///////////////////////

import { IRepository } from '../../../store/Repos/types';

///////////////////////
// API Calls
///////////////////////

const getRepos = async () => {
  return await apiCall(`${process.env.API_URL}`, {method: METHOD_TYPES.GET});
}

const addRepo = async (data: IRepository) => {
  return await apiCall<IRepository>(`${process.env.API_URL}`, {method: METHOD_TYPES.POST, body: data});
}

const deleteRepo = async (id: string) => {
  return await apiCall(`${process.env.API_URL}${id}`, {method: METHOD_TYPES.DELETE });
}

export default {
  getRepos,
  addRepo,
  deleteRepo
}