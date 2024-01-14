<template>
  <div class="jc-user-form row">
    <div class="col-grow q-pr-md-md q-px-xs q-mb-lg col-md-3" v-if="user.url_photo && user.url_photo!==''">
      <q-img :src="user.url_photo" style="max-height: 200px;" fit="contain" />
    </div>
    <q-form class="col-grow" ref="myForm" @submit.prevent="methods.submit" :class="{ 'col-md-9':user.url_photo && user.url_photo!=='' }">
      <div class="row">
        <!-- CAMPO NAME -->
        <div class="col-12 col-md-6">
          <q-input
            filled
            v-model="user.name"
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
            v-model="user.profile_ids"
            :options="optionsValues.profiles"
            multiple
            :loading="optionsValues.profiles.length === 0"
            options-dense
            options-selected-class="#c6c9c1"
            emit-value
            map-options
            filled
            dense
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
        <div class="col-12 col-md-6">
          <q-input
            filled
            v-model="user.email"
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
            v-model="user.password"
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
            v-model="user.password2"
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
            v-model="user.phone"
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
            v-model="user.status"
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
            v-model="user.saas_client_ids"
            :options="optionsValues.saasClients"
            :loading="optionsValues.saasClients.length === 0"
            multiple
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
      <div class="row q-mt-lg">
        <q-space class="col-auto" />
        <q-btn label="Cancelar" @click="methods.cancel" color="primary" flat class="q-mr-sm" />
        <q-btn label="Cadastrar" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, defineProps, withDefaults, Ref, ref } from 'vue'
import type { IUser, IOption } from '@/interfaces'
import { $stores } from '@/stores/all'
import { $notify } from '@/composables'
import { QForm } from 'quasar'
import { rand } from '@vueuse/core'
// return

// CONSTANTES ---------------------------------------------------
const myForm = ref<QForm|null>(null)
const urlPhotoModel = ref<File[]>([] as File[])
const props = withDefaults(defineProps<{
  // Geral
  user?: IUser|null
}>(), {})
const user: Ref<IUser> = ref<IUser>(props.user ?? {
  status: 'active',
  name: 'Junio',
  email: `anarkaike+teste${rand(1, 999999)}@gmail.com`,
  phone: '11976871674',
  password: '123456',
  password2: '123456',
  url_photo: ''
} as IUser)
const optionsValues = ref({
  profiles: [] as IOption[],
  saasClients: [] as IOption[]
})

const statusOption: Ref<IOption[]> = ref([
  { id: 'inactive', label: 'Inativo' } as IOption,
  { id: 'blocked', label: 'Bloqueado' } as IOption,
  { id: 'active', label: 'Ativo' } as IOption
] as IOption[])
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
  submit () {
    const method = user.value.id ? 'update' : 'create'
    user.value.url_photo = urlPhotoModel.value as unknown as File
    $stores.users[method](user.value).then((value: IUser) => {
      $notify.success(`Usuário "${value.name}" ${user.value.id ? 'atualizar' : 'cadastrar'} com sucesso!`)
      emit('on-submit', value)
      emit(user.value.id ? 'on-update' : 'on-create', value)
      user.value.url_photo = value.url_photo
      methods.closeDialog()
    }).catch((err) => {
      $notify.error(`Erro ao tentar ${user.value.id ? 'atualizar' : 'cadastrar'} o usuário ${user.value.name}! ${err.message}`)
    })
  },
  cancel () {
    user.value = {} as IUser
    emit('on-cancel')
  },
  closeDialog () {
    user.value = {} as IUser
    emit('close-dialog')
  }
}

onBeforeMount(() => {
  $stores.profiles.getOptions().then((options) => { optionsValues.value.profiles = options })
  $stores.saasClients.getOptions().then((options) => { optionsValues.value.saasClients = options })
})
</script>

<style lang="scss" scoped>
</style>
