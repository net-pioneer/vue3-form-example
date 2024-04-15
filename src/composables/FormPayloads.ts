import type {formModel} from "@/types/types";
import {Email, Required} from "@/composables/useDecorations.js";

export class formWizardPayload{
    @Required
    username:formModel
    @Email
    email:formModel
    tellphone:formModel
}
