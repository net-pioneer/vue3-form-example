<template>
  <div>
    <form @submit.prevent="handleForm">
      <div class="w-50 m-auto mt-5 form-wizard">
        <div class="alert alert-danger" v-if="formErrors.length !== 0">
          <ul v-for="(err,index) in formErrors" :key="index">
            <li>{{err}}</li>
          </ul>
        </div>
        <transition-group name="list">
          <div v-if="currentStep === steps.fillUserName">
            <p>{{$t('form_wizard_title1')}}</p>
            <div class="col-md-6 mt-5">
              <el-input id="username" :title="$t('form_username')" v-model:field="form.username"/>
            </div>
          </div>
          <div v-else-if="currentStep === steps.fillEmail">
            <p>{{$t('form_wizard_title2')}}</p>
            <div class="col-md-6 mt-5">
              <el-input id="email" :title="$t('form_email')" v-model:field="form.email"/>
            </div>
          </div>
          <div v-else>
            <p>{{$t('form_wizard_title3')}}</p>
            <ul>
              <li>
                {{$t('form_username')}} {{form.username.value}}
              </li>
              <li>
                {{$t('form_email')}} {{form.email.value}}
              </li>
            </ul>
          </div>
        </transition-group>
        <div class="btn-box">
          <div class="d-flex justify-content-around">
            <button type="submit" class="btn btn-primary" v-if="currentStep === steps.review" :disabled="loading">
              <span v-if="loading">Wait...</span>
              <span v-else>{{$t('btn_submit')}}</span>
            </button>
            <button type="button" class="btn btn-primary" v-else id="btn-next" @click="nextPage" :disabled="currentStep == steps.review">{{$t('btn_next')}}</button>
            <button type="button" class="btn btn-primary" id="btn-prev" @click="prevPage" :disabled="currentStep == steps.fillUserName">{{$t('btn_prev')}}</button>
          </div>
        </div>
      </div>
    </form>
    <description/>
  </div>
</template>

<script lang="ts">
import {reactive, ref} from "vue";
import {formWizardPayload} from "@/composables/FormPayloads";
import SrvRequest from "@/composables/SrvRequest";
import {checkFormWizardValidation, toReactive} from "@/composables/useDecorations";
import {submitResponse} from "@/types/types";
import Description from "@/components/Description.vue";
import ElInput from "@/components/elements/el-input.vue";
import {useI18n} from "vue-i18n";
export default {
  name: "index",
  components: {ElInput, Description},
  setup(){
    const enum steps {
      fillUserName=1,
      fillEmail=2,
      review=3
    }
    const {t} = useI18n();
    const currentStep = ref<steps>(steps.fillUserName);
    const allowChangePage = ref(false);
    const form = reactive(new formWizardPayload());
    const loading = ref(false);
    const http = SrvRequest();
    const formErrors = ref<String[]>([]);
    const nextPage = () => {
      formErrors.value = checkFormWizardValidation(form,currentStep.value);
      if(formErrors.value.length === 0){
        currentStep.value++;
      }
    }
    const prevPage = ()=>{
      currentStep.value--;
    }
    const handleForm = ()=>{
      if(currentStep.value === steps.review){
        submitForm();
      }
    }
    const submitForm = async ()=>{
      const payload = toReactive(form);
      const res = await http.post<submitResponse>("/submit.json",loading,payload);
      if(res.success){
        alert(res.des);
        alert("submitted Id is "  + res.data.id);
      }
    }



    return {
      handleForm,
      steps,
      currentStep,
      form,
      submitForm,
      nextPage,
      prevPage,
      allowChangePage,
      loading,
      formErrors
    }
  }
}
</script>

<style scoped>
@import '../assets/css/formwizard.css';
</style>