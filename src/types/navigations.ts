import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Service } from "./entites";

export declare type AuthParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthScreenProps<T extends keyof AuthParamList> =
  NativeStackScreenProps<AuthParamList, T>;

export declare type RootParamList = {
  Tab: NavigatorScreenParams<TabParamList>;
  Pembayaran: {
    menu?: Service
  };
};

export type RootScreenProps<T extends keyof RootParamList> =
  NativeStackScreenProps<RootParamList, T>;

export declare type TabParamList = {
  Home: undefined;
  TopUp: undefined;
  Transaction: undefined;
  Akun: undefined;
};

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootParamList>
>;
