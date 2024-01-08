import { Container } from "inversify";
import ApiService from "./api";
import HttpService from "./http";
import MembershipService from "./membership";
import InformationService from "./information";
import { HttpServiceInterface, ApiServiceInterface, MembershipServiceInterface, InformationServiceInterface } from "./interface";
import { TYPES } from "./TYPES";

const container = new Container();
container.bind<HttpServiceInterface>(TYPES.HttpServiceInterface).to(HttpService).inSingletonScope()
container.bind<ApiServiceInterface>(TYPES.ApiServiceInterface).to(ApiService).inSingletonScope()
container.bind<MembershipServiceInterface>(TYPES.MembershipServiceInterface).to(MembershipService).inSingletonScope();
container.bind<InformationServiceInterface>(TYPES.InformationServiceInterface).to(InformationService).inSingletonScope();

export { container };