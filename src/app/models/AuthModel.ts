export interface AuthModel {
    user:{
        email?: string,
    },
    token?:string,
    completed?:boolean,
    started?:boolean,
    failed?:boolean,
    statusMessage?:string,
}
