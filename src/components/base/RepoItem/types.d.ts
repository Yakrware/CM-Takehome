import { IRepository } from "GithubApp/src/store/Repos/types";

export interface IRepoItem {
  itemData: IRepository;
  footerButtonPressed: (data: IRepository) => void;
  footerButtonTitle?: string;
}
