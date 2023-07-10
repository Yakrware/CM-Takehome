import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
  Home: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
