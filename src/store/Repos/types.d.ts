export type IReposState = {
  get: {
    loading: boolean,
    data: Array<Repository>,
    error: string | null,
  },
  post: {
    loading: boolean,
    data: Array<Repository>,
    error: string | null,
  }
  delete: {
    loading: boolean,
    data: Array<Repository>,
    error: string | null,
  }
};

export type IRepository = {
  id: string;
  fullName: string,
  description?: string | null,
  createdAt: string,
  stargazersCount?: number,
  language: string,
  url: string,
}

export type IDeletePayload = {
  payload: IRepository;
}

export type GetReposResponse = {
  repos: IRepository[];
}