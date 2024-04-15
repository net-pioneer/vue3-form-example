<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="w-50 m-auto mt-5 form-wizard">
        <transition-group name="list">
          <div v-if="currentStep === steps.fillUserName">
            <p>{{$t('form_wizard_title1')}}</p>
            <div class="col-md-6 mt-5">
              <x-input id="username" :title="$t('form_username')" v-model:model-value="form.username" @invalid="allowChangePage=false" @valid="allowChangePage=true"/>
            </div>
          </div>
          <div v-else-if="currentStep === steps.fillEmail">
            <p>{{$t('form_wizard_title2')}}</p>
            <div class="col-md-6 mt-5">
              <x-input id="email" :title="$t('form_email')" v-model:model-value="form.email" @invalid="allowChangePage=false" @valid="allowChangePage=true"/>
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
            <button type="submit" class="btn btn-primary" v-if="currentStep == steps.review" :disabled="loading">
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
import XInput from "@/components/elements/x-input.vue";
import {reactive, ref} from "vue";
import {formWizardPayload} from "@/composables/FormPayloads";
import SrvRequest from "@/composables/SrvRequest";
import {toReactive} from "@/composables/useDecorations";
import {submitResponse} from "@/types/types";
import Description from "@/components/Description.vue";
export default {
  name: "index",
  components: {Description, XInput},
  setup(){
    const enum steps {
      fillUserName=1,
      fillEmail=2,
      review=3
    }
    const currentStep = ref<steps>(steps.fillUserName);
    const allowChangePage = ref(false);
    const form = reactive(new formWizardPayload());
    const loading = ref(false);
    const http = SrvRequest();
    const nextPage = () => {
      if(allowChangePage.value) {
        currentStep.value++;
        allowChangePage.value = false;
      }else{
        alert("Please Complete The Form ! :)");
      }
    }
    const prevPage = ()=>{
      currentStep.value--;
      allowChangePage.value = true;
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
      steps,
      currentStep,
      form,
      submitForm,
      nextPage,
      prevPage,
      allowChangePage,
      loading
    }
  }
}
</script>

<style scoped>
@import '../assets/css/formwizard.css';
</style>