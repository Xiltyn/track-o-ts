import { UserInfo } from "firebase";

export interface AuthModel {
    user:UserInfo|null,
    completed?:boolean,
    started?:boolean,
    failed?:boolean,
    statusMessage?:string,
}
