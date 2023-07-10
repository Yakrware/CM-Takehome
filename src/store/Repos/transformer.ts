import { IRepository } from "./types"

// When adding a new repository to the server, the server does not persist the 
// 'stargazersCount' for repositories that have no stargazers (count of 0). 
// Therefore, when retrieving the repositories, we include and append the 
// 'stargazersCount' as an additional field to enable sorting based on the 
// number of stargazers.
export const getReposTransformer = (reposData: IRepository[]) => {
    return reposData.map( (repo: IRepository) =>{
        if(!repo.stargazersCount){
            repo.stargazersCount = 0;
        }
        return repo;
    });
}