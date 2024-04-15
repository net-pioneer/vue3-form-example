import type {formModel} from "@/types/types";
export function Email(target: any, key: string) :formModel {
    target[key] = {
        value: target[key],
        _decorator:'EMAIL'
    };
}
export function Required(target: any, key: string) :formModel {
    target[key] = {
        value: target[key],
        _decorator:'REQUIRED'
    };
}


export function toReactive(clsModel){
    const reactiveData = clsModel;
    const reactiveProps = {};
    for (const key of Object.keys(clsModel)) {
        reactiveProps[key] = reactiveData[key].value;
    }

    return reactiveProps;
}

