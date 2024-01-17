<template>
  <q-form ref="myForm" @submit.prevent="methods.save(row)">

    <div class="row">
      <!-- CAMPO LOGO -->
      <div class="col-12 col-md-4">
        <q-file
          filled
          dense
          v-model="urlLogoModel"
          label="Adicionar Logomarca"
          use-chips
          accept="image/*"
          class="q-mr-md-sm q-mb-md">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <div v-if="row.url_logo && row.url_logo!=='' && typeof row.url_logo==='string'">
          <q-img :src="row.url_logo" style="max-height: 200px;" fit="contain" />
        </div>
      </div>

      <!-- CAMPO FUNDO LOGIN -->
      <div class="col-12 col-md-4">
        <q-file
          filled
          dense
          v-model="urlLoginBgModel"
          label="Adicionar Fundo Login"
          use-chips
          accept="image/*"
          class="q-mx-md-sm q-mb-md">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <div v-if="row.url_login_bg && row.url_login_bg!=='' && typeof row.url_login_bg==='string'">
          <q-img :src="row.url_login_bg" style="max-height: 200px;" fit="contain" />
        </div>
      </div>

      <!-- CAMPO FUNDO SISTEMA -->
      <div class="col-12 col-md-4">
        <q-file
          filled
          dense
          v-model="urlSystemBgModel"
          label="Adicionar Fundo Sistema"
          use-chips
          accept="image/*"
          class="q-ml-md-sm q-mb-md">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <div v-if="row.url_system_bg && row.url_system_bg!=='' && typeof row.url_system_bg==='string'">
          <q-img :src="row.url_system_bg" style="max-height: 200px;" fit="contain" />
        </div>
      </div>

      <!-- BOTÕES SALVAR E CANCELAR -->
      <div class="col-12 row q-mt-lg sticky-buttons">
        <q-space class="col-grow" />
        <q-btn label="Cancelar" @click="methods.cancel" color="primary" flat class="q-mr-sm" />
        <q-btn :label="row.id?'Atualizar ':'Cadastrar'" type="submit" color="primary"/>
      </div>
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { ISaasClient } from '@/interfaces'
import { QForm } from 'quasar'
import { defineProps, Ref, ref, withDefaults } from 'vue'

// Valores dos campos de select
const urlLogoModel = ref<File[]>([] as File[])
const urlLoginBgModel = ref<File[]>([] as File[])
const urlSystemBgModel = ref<File[]>([] as File[])
const props = withDefaults(defineProps<{ row?: ISaasClient|null }>(), {})
const row: Ref<ISaasClient> = ref<ISaasClient>(props.row ?? {} as ISaasClient)
const myForm = ref<QForm|null>(null)
const emit = defineEmits([
  'on-save',
  'on-cancel'
])

const methods = {
  save (row: ISaasClient) {
    if ('name' in urlLogoModel.value) {
      row.url_logo_up = urlLogoModel.value as unknown as File
    }
    if ('name' in urlLoginBgModel.value) {
      row.url_login_bg_up = urlLoginBgModel.value as unknown as File
    }
    if ('name' in urlSystemBgModel.value) {
      row.url_system_bg_up = urlSystemBgModel.value as unknown as File
    }
    emit('on-save', row)
  },
  cancel () {
    emit('on-cancel')
  }
}
</script>
