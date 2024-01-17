<template>
  <div>

    <div class="q-pa-md q-mb-md" style="border-radius: 5px; border: 1px solid #CCC;">
      <div class="text-caption q-mb-sm row">
        <div class="col-12 col-md-8 text-h6">
          Cores para o modo claro:
          <div class="text-caption">
            Ative para personalizar
          </div>
        </div>
        <q-btn class="col-12 col-md-4" color="primary" unelevated :label="modoClaro?'Inativar':'Ativar'" @click="modoClaro=!modoClaro" />
      </div>

      <div v-if="modoClaro" class="row">
        <!-- CAMPO COR PRIMARIA -->
        <div class="col-12 col-md-4 q-pa-lg" :style="['background-color: '+generalSettings.colors.light.primary_color??'']">
          Cor Primária
          <q-color class="my-picker" v-model="generalSettings.colors.light.primary_color" default-value="#FFFFFF" format-model="rgba" flat bordered no-header-tabs no-footer />
        </div>

        <!-- CAMPO COR SECUNDÁRIA -->
        <div class="col-12 col-md-4 q-pa-lg" :style="['background-color: '+generalSettings.colors.light.secondary_color]">
          Cor Secundária
          <q-color class="my-picker" v-model="generalSettings.colors.light.secondary_color" default-value="#FFFFFF" format-model="rgba" flat bordered no-header-tabs no-footer />
        </div>

        <!-- CAMPO COR ACCENT - DESTAQUE -->
        <div class="col-12 col-md-4 q-pa-lg" :style="['background-color: '+generalSettings.colors.light.accent_color]">
          Cor Secundária
          <q-color class="my-picker" v-model="generalSettings.colors.light.accent_color" default-value="#FFFFFF" format-model="rgba" flat bordered no-header-tabs no-footer />
        </div>
      </div>
    </div>

    <div class="q-pa-md q-mb-md ctn-box-fields-darkmode" style="border-radius: 5px; border: 1px solid #CCC; background-color: #757575;">
      <div class="text-caption q-mb-sm row">
        <div class="col-12 col-md-8 text-h6">
          Cores para o modo claro:
          <div class="text-caption">
            Ative para personalizar
          </div>
        </div>
        <q-btn class="col-12 col-md-4" color="primary" unelevated :label="modoEscuro?'Inativar':'Ativar'" @click="modoEscuro=!modoEscuro" />
      </div>

      <div v-if="modoEscuro" class="row">
        <!-- CAMPO COR PRIMARIA DARKMODE -->
        <div class="col-12 col-md-4 q-pa-lg" :style="['background-color: '+generalSettings.colors.dark.primary_color]">
          Cor Primária Dark
          <q-color class="my-picker" v-model="generalSettings.colors.dark.primary_color" default-value="#FFFFFF" format-model="rgba" flat bordered no-header-tabs no-footer dark />
        </div>

        <!-- CAMPO COR SECUNDARIA DARKMODE -->
        <div class="col-12 col-md-4 q-pa-lg" :style="['background-color: '+generalSettings.colors.dark.secondary_color]">
          Cor Primária Dark
          <q-color class="my-picker" v-model="generalSettings.colors.dark.secondary_color" default-value="#FFFFFF" format-model="rgba" flat bordered no-header-tabs no-footer dark />
        </div>

        <!-- CAMPO COR DESTAQUE DARKMODE -->
        <div class="col-12 col-md-4 q-pa-lg" :style="['background-color: '+generalSettings.colors.dark.accent_color]">
          Cor Primária Dark
          <q-color class="my-picker" v-model="generalSettings.colors.dark.accent_color" default-value="#FFFFFF" format-model="rgba" flat bordered no-header-tabs no-footer dark />
        </div>
      </div>
    </div>

    <!-- BOTÕES SALVAR E CANCELAR -->
    <div class="col-12 row q-mt-lg sticky-buttons">
      <q-space class="col-grow" />
      <q-btn label="Cancelar" @click="methods.cancel" color="primary" flat class="q-mr-sm" />
      <q-btn :label="row.id?'Atualizar ':'Cadastrar'" @click="methods.save(row)" color="primary"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISaasClient, ISaasClientGeneralSettings } from '@/interfaces'
import { defineProps, Ref, ref, watchEffect, withDefaults } from 'vue'

// Valores dos campos de select
const props = withDefaults(defineProps<{ row?: ISaasClient|null }>(), {})
const row: Ref<ISaasClient> = ref<ISaasClient>(props.row ?? {} as ISaasClient)
const modoClaro = ref(false)
const modoEscuro = ref(false)
const emit = defineEmits([
  'on-save',
  'on-cancel'
])
const generalSettings: Ref<ISaasClientGeneralSettings> = ref({
  preferences: {
    darkmode: false,
    starts_with_menu_open: true,
    starts_in_saas_client_id: null
  },
  colors: {
    light: {
      primary_color: '',
      secondary_color: '',
      accent_color: ''
    },
    dark: {
      primary_color: '',
      secondary_color: '',
      accent_color: ''
    }
  }
} as ISaasClientGeneralSettings)

watchEffect(() => {
  const defaultValues = generalSettings.value
  const values = row.value?.general_settings ? JSON.parse(row.value?.general_settings as string) as ISaasClientGeneralSettings : {}
  generalSettings.value = {
    ...{ ...defaultValues },
    ...{ ...values }
  }
})

watchEffect(() => {
  const values = (row.value?.general_settings ? JSON.parse(row.value?.general_settings as string) : {}) as ISaasClientGeneralSettings
  if (values?.colors?.light?.primary_color) {
    modoClaro.value = true
  }
  if (values?.colors?.dark?.primary_color) {
    modoEscuro.value = true
  }
})

const methods = {
  save (row: ISaasClient) {
    row.general_settings = JSON.stringify(methods.getGeneralSettings())
    emit('on-save', row)
  },
  cancel () {
    emit('on-cancel')
  },
  getGeneralSettings () {
    const generalSettingsToSave = generalSettings.value
    if (!modoClaro.value) {
      generalSettingsToSave.colors = {
        ...generalSettingsToSave.colors,
        light: {}
      }
    }
    if (!modoEscuro.value) {
      generalSettingsToSave.colors = {
        ...generalSettingsToSave.colors,
        dark: {}
      }
    }
    return generalSettingsToSave
  }
}
</script>
