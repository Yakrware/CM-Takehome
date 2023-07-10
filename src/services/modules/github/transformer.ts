import { IRepository } from 'GithubApp/src/store/Repos/types';

///////////////////////
// Transformers
///////////////////////

export const repoDataTransformer = (githubRepoData: any[]): IRepository[] => {
  return githubRepoData.map((dataItem: any) => {
    return {
      id: dataItem.id.toString(),
      fullName: dataItem.full_name,
      description: dataItem.description,
      createdAt: dataItem.created_at,
      stargazersCount: dataItem.stargazers_count || 0,
      language: dataItem.language,
      url: dataItem.url,
    };
  });
};
