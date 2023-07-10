import { ListRenderItem } from 'react-native';

export interface IFavorites {
  renderItem: ListRenderItem<any>;
  onSortButtonPress: () => void;
  data: Array<{}>;
  isLoading: boolean;
}
