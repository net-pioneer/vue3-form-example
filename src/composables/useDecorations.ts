import i18n from "@/composables/i18n";
import {toRefs} from "vue";
export function Email(target: any, key: string): void {
    if (target[key]?._decorator === undefined) {
        target[key] = {
            value: '',
            _decorator: ['EMAIL']
        };
    } else {
        target[key]._decorator.push('EMAIL');
    }
}

export function Required(target: any, key: string): void {
    if (target[key]?._decorator=== undefined) {
        target[key] = {
            value: '',
            _decorator: ['REQUIRED']
        };
    } else {
        target[key]._decorator.push('REQUIRED');
    }
}
export function TAB(tabId:1): void {
    return function (target: any, key: string): void {
        if (target[key]?._decorator=== undefined) {
            target[key] = {
                value: '',
                _decorator: ['TAB'],
                _tabId:tabId
            };
        } else {
            target[key]._decorator.push('REQUIRED');
            target[key]._tabId=tabId;
        }
    }
}
export function toReactive(clsModel){
    const reactiveData = clsModel;
    const reactiveProps = {};
    for (const key of Object.keys(clsModel)) {
        reactiveProps[key] = reactiveData[key].value;
    }
    return reactiveProps;
}
export const checkFormWizardValidation = (form,tabId)=>{//using Annotations
    const currentViewId = tabId;
    const formRef = Object.values(toRefs(form));
    let outErrors = [];
    formRef.forEach((i) => {
        const _decArray = Array.from(i.value._decorator);
        if (_decArray.includes('TAB') && i.value._tabId === currentViewId) {
            if (_decArray.includes('REQUIRED') && i.value.value.trim() === '') {
                outErrors.push(i18n.global.t('validation.REQUIRED',[i._key]));
            }
            if (_decArray.includes('EMAIL') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value.value)) {
                outErrors.push(i18n.global.t('validation.EMAIL',[i._key]));
            }
        }
    });
    console.log(outErrors);
    return outErrors;
}
