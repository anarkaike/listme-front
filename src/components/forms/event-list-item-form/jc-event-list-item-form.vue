<template>
  <div class="jc-user-form row jc-form">
    <q-form class="col-grow" ref="myForm" @submit.prevent="methods.save">
      <div class="row">
        <!-- CAMPO NAME -->
        <div class="col-12 col-md-4">
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

        <!-- CAMPO EMAIL -->
        <div class="col-12 col-md-4">
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
import type { IEventListItem, IOption } from '@/interfaces'
import { $stores } from '@/stores/all'

// CONSTANTES ---------------------------------------------------
const myForm = ref<QForm|null>(null)
const urlPhotoModel = ref<File[]>([] as File[])
const props = withDefaults(defineProps<{
  // Geral
  row?: IEventListItem|null,
  filterProfilesOptions?:(options: IOption[]) => IOption[],
  additionalData?: object
}>(), {
  filterProfilesOptions: (options: IOption[]) => options
})
// const originalUser : Ref<IEventListItem> = ref<IEventListItem>(props.row as IEventListItem)
const row: Ref<IEventListItem> = ref<IEventListItem>(props.row ?? {
  status: 'active'
} as IEventListItem)

// const optionsValues = ref({
//   profiles: [] as IOption[],
//   saasClients: [] as IOption[]
// })

// const statusOption: Ref<IOption[]> = ref([
//   { id: 'active', label: 'Ativo' } as IOption,
//   { id: 'inactive', label: 'Inativo' } as IOption,
//   { id: 'blocked', label: 'Bloqueado' } as IOption
// ] as IOption[])

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
      row.value.url_banner_up = urlPhotoModel.value as unknown as File
    }
    if (props.additionalData) {
      row.value = {
        ...row.value,
        ...props.additionalData
      }
    }
    $stores.eventsListsItems[method](row.value).then((value: IEventListItem) => {
      emit('on-submit', value)
      emit(row.value.id ? 'on-update' : 'on-create', value)
      row.value.url_banner = value.url_banner
      methods.closeDialog()
    })
  },
  cancel () {
    row.value = {} as IEventListItem
    emit('on-cancel')
  },
  closeDialog () {
    row.value = {} as IEventListItem
    emit('close-dialog')
  }
}

// onBeforeMount(() => {
//   $stores.profiles.getOptions().then((options) => {
//     optionsValues.value.profiles = props.filterProfilesOptions(options)
//   })
//   $stores.saasClients.getOptions().then((options) => { optionsValues.value.saasClients = options })
// })
</script>

<style lang="scss" scoped>
</style>
