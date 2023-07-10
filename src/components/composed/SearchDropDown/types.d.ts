import { ListRenderItem } from 'react-native';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export interface ISearchDropDown {
  ref?: Ref<ISearchDropDownRef>
  data: any;
  renderItem: ListRenderItem<any>;
  onChange: (text: string) => void;
}

export interface ISearchDropDownRef {
  close: () => void;
}
