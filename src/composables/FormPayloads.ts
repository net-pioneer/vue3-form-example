import type {formModel} from "@/types/types";
import {Email, Required, TAB} from "@/composables/useDecorations.js";
import {isReactive, ref, toRaw} from "vue";

export class formWizardPayload{
    @Required
    @TAB(1)
    username:formModel
    @Email
    @TAB(2)
    email:formModel

}

