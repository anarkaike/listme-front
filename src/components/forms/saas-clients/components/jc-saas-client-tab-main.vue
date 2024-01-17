<template>
  <q-form class="col-grow" ref="myForm" @submit.prevent="methods.save(row)">
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
      <div class="col-12 col-md-3">
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
      <div class="col-12 col-md-5">
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

      <!-- CAMPO DOMINIO API -->
      <div class="col-12 col-md-6">
        <q-input
          filled
          v-model="row.domain_api"
          label="URL da API"
          dense
          class="q-mr-md-sm q-mb-md"
        >
          <template #prepend>
            <q-icon name="badge" />
          </template>
        </q-input>
      </div>

      <!-- CAMPO DOMINIO FRONT -->
      <div class="col-12 col-md-6">
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
    <div class="col-12 row q-mt-lg sticky-buttons">
      <q-space class="col-auto" />
      <q-btn label="Cancelar" @click="methods.cancel" color="primary" flat class="q-mr-sm" />
      <q-btn :label="row.id?'Atualizar':'Cadastrar'" type="submit" color="primary"/>
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { $optionsOfSaasClient } from '@/composables'
import { IOption, ISaasClient } from '@/interfaces'
import { QForm } from 'quasar'
import { defineProps, Ref, ref, withDefaults } from 'vue'

// Valores dos campos de select
const statusOption: Ref<IOption[]> = ref($optionsOfSaasClient.status as IOption[])
const businessSectorOption: Ref<IOption[]> = ref($optionsOfSaasClient.businessSector as IOption[])
const props = withDefaults(defineProps<{ row?: ISaasClient|null }>(), {})
const row: Ref<ISaasClient> = ref<ISaasClient>(props.row ?? {} as ISaasClient)
const myForm = ref<QForm|null>(null)
const emit = defineEmits([
  'on-save',
  'on-cancel'
])

const methods = {
  save (row: ISaasClient) {
    emit('on-save', row)
  },
  cancel () {
    emit('on-cancel')
  }
}
</script>
