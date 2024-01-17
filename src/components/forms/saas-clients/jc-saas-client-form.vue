<template>
  <div class="jc-saasClient-form jc-form">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="main" label="Cadastro" />
      <q-tab name="imgs" label="Imagens" />
      <q-tab name="generalConfigs" label="Configs" />
      <q-tab name="plans" label="Planos" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>

      <!-- TAB CONTENT PRINCIPAL -->
      <q-tab-panel name="main">
        <div class="text-h6 q-mb-md">Cadastro</div>
        <JcSaasClientTabMain :row="row" @on-save="methods.save(row)" @on-cancel="methods.cancel" />
      </q-tab-panel>

      <!-- TAB CONTENT IMGS -->
      <q-tab-panel name="imgs">
        <div class="text-h6 q-mb-md">Imagens</div>
        <JcSaasClientTabImages :row="row" @on-save="methods.save(row)" @on-cancel="methods.cancel" />
      </q-tab-panel>

      <!-- TAB CONTENT GENERAL CONFIGS -->
      <q-tab-panel name="generalConfigs">
        <JcSaasClientTabGeneralConfigs :row="row" @on-save="methods.save(row)" @on-cancel="methods.cancel" />
      </q-tab-panel>

      <!-- TAB CONTENT PLANOS -->
      <q-tab-panel name="plans">
        <JcSaasClientTabPlans :row="row" @on-save="methods.save(row)" @on-cancel="methods.cancel" />
      </q-tab-panel>

    </q-tab-panels>

  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, Ref, ref } from 'vue'
import { QForm } from 'quasar'
import { $stores } from '@/stores/all'
import type { ISaasClient } from '@/interfaces'
import { JcSaasClientTabMain, JcSaasClientTabImages, JcSaasClientTabGeneralConfigs, JcSaasClientTabPlans } from './components'

// CONSTANTES ---------------------------------------------------

const myForm = ref<QForm|null>(null)
const props = withDefaults(defineProps<{ row?: ISaasClient|null }>(), {})
const row: Ref<ISaasClient> = ref<ISaasClient>(props.row ?? {} as ISaasClient)
const tab = ref('main')

const emit = defineEmits([
  'on-cancel',
  'on-submit',
  'on-create',
  'on-update',
  'close-dialog'
])

// METODOS ------------------------------------------------------
const methods = {
  save (row: ISaasClient) {
    const method = row.id ? 'update' : 'create'
    $stores.saasClients[method](row).then((value: ISaasClient) => {
      emit('on-submit', value)
      emit(row.id ? 'on-update' : 'on-create', value)
      row.url_logo = value.url_logo
      row.url_login_bg = value.url_login_bg
      row.url_system_bg = value.url_system_bg
      methods.closeDialog()
    })
  },
  cancel () {
    row.value = {} as ISaasClient
    emit('on-cancel')
  },
  closeDialog () {
    row.value = {} as ISaasClient
    emit('close-dialog')
  }
}
</script>

<style lang="scss" scoped>
.ctn-box-fields-darkmode {
  *, input {
    color: #FFF !important;
  }
  .q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
    color: #FFF !important;
  }
  .q-field__label {
    color: #FFF !important;
  }
}
</style>
