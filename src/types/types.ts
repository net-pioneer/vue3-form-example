export interface formModel{
    value:string
    _decorator:string;
    _tabId?:number;
}
export interface elProperty{
    Required?:boolean,
    Email?:boolean
}
export declare type GenericApiResult<T> = {
    success: boolean;
    code: String;
    des: String;
    data?: T;
};

export declare interface submitResponse{
    id:number;
    dev:string;
}