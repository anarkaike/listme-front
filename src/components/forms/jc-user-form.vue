<template>
  <div class="jc-user-form row jc-form">
    <div class="col-grow q-pr-md-md q-px-xs q-mb-lg col-md-3" v-if="row.url_photo && row.url_photo!=='' && typeof row.url_photo==='string'">
      <q-img :src="row.url_photo" style="max-height: 200px;" fit="contain" />
    </div>
    <q-form class="col-grow" ref="myForm" @submit.prevent="methods.save" :class="{ 'col-md-9':row.url_photo && row.url_photo!=='' }">
      <div class="row">
        <!-- CAMPO NAME -->
        <div class="col-12 col-md-6">
          <q-input
            filled
            v-model="row.name"
            label="Nome"
            lazy-rules
            dense
            class="q-mr-md-sm"
            :rules="[ val => val && val.length > 0 || 'Digite o nome']"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO PROFILES-->
        <div class="col-12 col-md-6">
          <q-select
            label="Perfil"
            v-model="row.profile_ids"
            :options="optionsValues.profiles"
            multiple
            :loading="optionsValues.profiles.length === 0"
            options-dense
            options-selected-class="#c6c9c1"
            emit-value
            map-options
            option-value="id"
            option-label="label"
            filled
            dense
            class="q-ml-md-sm q-mb-md"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-select>
        </div>

        <!-- CAMPO EMAIL -->
        <div class="col-12 col-md-6">
          <q-input
            filled
            v-model="row.email"
            label="Email"
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

        <!-- CAMPO SENHA -->
        <div class="col-12 col-md-3">
          <q-input
            label="Senha"
            v-model="row.password"
            filled
            hide-bottom-space
            dense
            class="q-mx-md-sm q-mb-md"
            :type="pwsVisible?'text':'password'"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-icon
                :name="pwsVisible ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="pwsVisible = !pwsVisible"
              />
            </template>
          </q-input>
        </div>

        <!-- CAMPO REPITA A SENHA-->
        <div class="col-12 col-md-3">
          <q-input
            label="Repita a senha"
            v-model="row.password2"
            filled
            dense
            hide-bottom-space
            class="q-ml-md-sm q-mb-md"
            :type="pwsVisible?'text':'password'"
          >
            <template #prepend>
              <q-icon name="lock_reset" />
            </template>
            <template #append>
              <q-icon
                :name="pwsVisible ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="pwsVisible = !pwsVisible"
              />
            </template>
          </q-input>
        </div>

        <!-- CAMPO TELEFONE -->
        <div class="col-12 col-md-4">
          <q-input
            filled
            v-model="row.phone"
            label="Celular"
            lazy-rules
            dense
            mask="(##) ##### - ####"
            class="q-mr-md-sm"
            :rules="[ val => val && val.length > 0 || 'Digite o nome']"
          >
            <template #prepend>
              <q-icon name="smartphone" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO UPLOAD DE FOTO -->
        <div class="col-12 col-md-5">
          <q-file
            filled
            dense
            v-model="urlPhotoModel"
            label="Adicionar Foto"
            use-chips
            accept="image/*"
            class="q-mx-md-sm q-mb-md">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>

        <!-- CAMPO STATUS -->
        <div class="col-12 col-md-3">
          <q-select
            filled
            dense
            v-model="row.status"
            @change="methods.onSelectStatus"
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

        <!-- CAMPO CLIENTE SAAS -->
        <div class="col-12">
          <q-select
            label="Adicionar este usuário no sistema de qual cliente saas?"
            filled
            v-model="row.saas_client_id"
            :options="optionsValues.saasClients"
            :loading="optionsValues.saasClients.length === 0"
            options-dense
            options-selected-class="#c6c9c1"
            emit-value
            map-options
            dense
            option-value="id"
            option-label="label"
            class="q-mb-md"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-select>
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
import { onBeforeMount, defineProps, withDefaults, Ref, ref } from 'vue'
import { QForm } from 'quasar'
import { rand } from '@vueuse/core'
import { $stores } from '@/stores/all'
import { $optionsOfUser } from '@/composables/users/optionsOfUser'
import type { IUser, IOption } from '@/interfaces'

// CONSTANTES ---------------------------------------------------
const myForm = ref<QForm|null>(null)
const urlPhotoModel = ref<File[]>([] as File[])
const props = withDefaults(defineProps<{
  row?: IUser|null,
  filterProfilesOptions?:(options: IOption[]) => IOption[]
}>(), {
  filterProfilesOptions: (options: IOption[]) => options
})

const row: Ref<IUser> = ref<IUser>(props.row ?? {
  status: 'active',
  name: 'Junio',
  email: `anarkaike+teste${rand(1, 999999)}@gmail.com`,
  phone: '11976871674',
  password: '123456',
  password2: '123456',
  url_photo: '',
  url_photo_up: null
} as IUser)
const optionsValues = ref({
  profiles: [] as IOption[],
  saasClients: [] as IOption[]
})

const statusOption: Ref<IOption[]> = ref($optionsOfUser.status as IOption[])
const pwsVisible = ref(false)

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
    if ('name' in urlPhotoModel.value) {
      row.value.url_photo_up = urlPhotoModel.value as unknown as File
    }
    $stores.users[method](row.value).then((value: IUser) => {
      emit('on-submit', value)
      emit(row.value.id ? 'on-update' : 'on-create', value)
      row.value.url_photo = value.url_photo
      methods.closeDialog()
    })
  },
  cancel () {
    row.value = {} as IUser
    emit('on-cancel')
  },
  closeDialog () {
    row.value = {} as IUser
    emit('close-dialog')
  }
}

onBeforeMount(() => {
  $stores.profiles.getOptions().then((options) => {
    optionsValues.value.profiles = props.filterProfilesOptions(options)
  })
  $stores.saasClients.getOptions().then((options) => { optionsValues.value.saasClients = options })
})
</script>

<style lang="scss" scoped>
</style>
