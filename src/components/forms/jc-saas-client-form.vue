<template>
  <div class="jc-saasClient-form row jc-form">
    <div class="col-grow q-pr-md-md q-px-xs q-mb-lg col-md-3" v-if="row.url_logo && row.url_logo!=='' && typeof row.url_logo==='string'">
      <q-img :src="row.url_logo" style="max-height: 200px;" fit="contain" />
    </div>
    <q-form class="col-grow" ref="myForm" @submit.prevent="methods.save" :class="{ 'col-md-9':row.url_logo && row.url_logo!=='' }">
      <div class="row">

        <!-- CAMPO NOME EMPRESA -->
        <div class="col-12 col-md-4">
          <q-input
            filled
            v-model="row.company_name"
            label="Nome da empresa"
            dense
            class="q-mr-md-sm"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO NOME CONTATO -->
        <div class="col-12 col-md-5">
          <q-input
            filled
            v-model="row.contact_name"
            label="Nome do contato"
            dense
            class="q-mx-md-sm q-mb-md"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO STATUS -->
        <div class="col-12 col-md-3">
          <q-select
            filled
            dense
            v-model="row.status"
            :options="statusOption"
            label="Status"
            emit-value
            map-options
            option-value="id"
            option-label="label"
            class="q-ml-md-sm q-mb-md"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-select>
        </div>

        <!-- CAMPO EMAIL -->
        <div class="col-12 col-md-5">
          <q-input
            filled
            v-model="row.email"
            label="Email da empresa"
            class="q-mr-md-sm q-mb-none q-mb-md-none"
            lazy-rules
            dense
            :rules="[
              val => (val && val.length > 0) || 'Digite seu email',
              val => (/^[A-Za-z0-9+_.-]+@([A-Za-z0-9+_-])+\.([A-Za-z0-9+_-])+$/.test(val)) || 'Email digitado é inválido!'
            ]"
            type="email"
          >
            <template #prepend>
              <q-icon name="alternate_email" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO CELULAR -->
        <div class="col-12 col-md-4">
          <q-input
            filled
            v-model="row.phone"
            label="Telefone de contato"
            lazy-rules
            dense
            mask="(##) ##### - ####"
            class="q-mx-md-sm"
            :rules="[ val => val && val.length > 0 || 'Digite o nome']"
          >
            <template #prepend>
              <q-icon name="smartphone" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO BUSINESS SECTOR -->
        <div class="col-12 col-md-3">
          <q-select
            filled
            dense
            v-model="row.business_sector"
            :options="businessSectorOption"
            label="Mercado de Atuação"
            emit-value
            map-options
            option-value="id"
            option-label="label"
            class="q-ml-md-sm q-mb-md"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-select>
        </div>

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
        </div>

        <!-- CAMPO DOMINIO API -->
        <div class="col-12 col-md-4">
          <q-input
            filled
            v-model="row.domain_api"
            label="URL da API"
            dense
            class="q-mx-md-sm q-mb-md"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO DOMINIO FRONT -->
        <div class="col-12 col-md-4">
          <q-input
            filled
            v-model="row.domain_front"
            label="URL da Front"
            dense
            class="q-ml-md-sm"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
        </div>

      </div>

      <!-- BOTÕES SALVAR E CANCELAR -->
      <div class="row q-mt-lg sticky-buttons">
        <q-space class="col-auto" />
        <q-btn label="Cancelar" @click="methods.cancel" color="primary" flat class="q-mr-sm" />
        <q-btn :label="row.id?'Atualizar':'Cadastrar'" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, Ref, ref } from 'vue'
import { QForm } from 'quasar'
import type { ISaasClient, IOption } from '@/interfaces'
import { $stores } from '@/stores/all'
import {
  ESaasClientStatusValues,
  ESaasClientStatusLabels,
  ESaasClientBusinessSectorValues,
  ESaasClientBusinessSectorLabels
} from '@/enums'

// CONSTANTES ---------------------------------------------------
const myForm = ref<QForm|null>(null)
const urlLogoModel = ref<File[]>([] as File[])
const props = withDefaults(defineProps<{ row?: ISaasClient|null }>(), {})
const row: Ref<ISaasClient> = ref<ISaasClient>(props.row ?? {} as ISaasClient)

const statusOption: Ref<IOption[]> = ref([
  { id: ESaasClientStatusValues.active, label: ESaasClientStatusLabels.active } as IOption,
  { id: ESaasClientStatusValues.active_testing, label: ESaasClientStatusLabels.active_testing } as IOption,
  { id: ESaasClientStatusValues.active_pending_payment, label: ESaasClientStatusLabels.active_pending_payment } as IOption,
  { id: ESaasClientStatusValues.blocked, label: ESaasClientStatusLabels.blocked } as IOption,
  { id: ESaasClientStatusValues.blocked_pending_payment, label: ESaasClientStatusLabels.blocked_pending_payment } as IOption,
  { id: ESaasClientStatusValues.archived, label: ESaasClientStatusLabels.archived } as IOption
] as IOption[])

const businessSectorOption: Ref<IOption[]> = ref([
  { id: ESaasClientBusinessSectorValues.bar, label: ESaasClientBusinessSectorLabels.bar } as IOption,
  { id: ESaasClientBusinessSectorValues.boate, label: ESaasClientBusinessSectorLabels.boate } as IOption,
  { id: ESaasClientBusinessSectorValues.produtor_de_festas, label: ESaasClientBusinessSectorLabels.produtor_de_festas } as IOption,
  { id: ESaasClientBusinessSectorValues.cerimonialista, label: ESaasClientBusinessSectorLabels.cerimonialista } as IOption,
  { id: ESaasClientBusinessSectorValues.outros, label: ESaasClientBusinessSectorLabels.outros } as IOption
] as IOption[])

const emit = defineEmits([
  'on-cancel',
  'on-submit',
  'on-create',
  'on-update',
  'close-dialog'
])

// METODOS ------------------------------------------------------
const methods = {
  save () {
    const method = row.value.id ? 'update' : 'create'
    if ('name' in urlLogoModel.value) {
      row.value.url_logo_up = urlLogoModel.value as unknown as File
    }
    $stores.saasClients[method](row.value).then((value: ISaasClient) => {
      emit('on-submit', value)
      emit(row.value.id ? 'on-update' : 'on-create', value)
      row.value.url_logo = value.url_logo
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
</style>
