import { NativeStackScreenProps } from "@react-navigation/native-stack";

export declare type AuthParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthScreenProps<T extends keyof AuthParamList> =
  NativeStackScreenProps<AuthParamList, T>;

export declare type RootParamList = {
  Home: undefined;
};

export type RootScreenProps<T extends keyof RootParamList> =
  NativeStackScreenProps<RootParamList, T>;
