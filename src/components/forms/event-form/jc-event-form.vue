<template>
  <div class="jc-user-form row jc-form">
    <div class="col-grow q-pr-md-md q-px-xs q-mb-lg col-md-3" v-if="row.url_banner && row.url_banner!=='' && typeof row.url_banner==='string'">
      <q-img :src="row.url_banner" style="max-height: 200px;" fit="contain" />
    </div>
    <q-form class="col-grow" ref="myForm" @submit.prevent="methods.save" :class="{ 'col-md-9':row.url_banner && row.url_banner!=='' }">
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
import type { IEvent, IOption } from '@/interfaces'
import { $stores } from '@/stores/all'

// CONSTANTES ---------------------------------------------------
const myForm = ref<QForm|null>(null)
const urlPhotoModel = ref<File[]>([] as File[])
const props = withDefaults(defineProps<{
  // Geral
  row?: IEvent|null,
  filterProfilesOptions?:(options: IOption[]) => IOption[]
}>(), {
  filterProfilesOptions: (options: IOption[]) => options
})
// const originalUser : Ref<IEvent> = ref<IEvent>(props.row as IEvent)
const row: Ref<IEvent> = ref<IEvent>(props.row ?? {
  status: 'active'
} as IEvent)

// const optionsValues = ref({
//   profiles: [] as IOption[],
//   saasClients: [] as IOption[]
// })

// const statusOption: Ref<IOption[]> = ref([
//   { id: 'active', label: 'Ativo' } as IOption,
//   { id: 'inactive', label: 'Inativo' } as IOption,
//   { id: 'blocked', label: 'Bloqueado' } as IOption
// ] as IOption[])
// const pwsVisible = ref(false)

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
    $stores.users[method](row.value).then((value: IEvent) => {
      emit('on-submit', value)
      emit(row.value.id ? 'on-update' : 'on-create', value)
      row.value.url_banner = value.url_banner
      methods.closeDialog()
    })
  },
  cancel () {
    row.value = {} as IEvent
    emit('on-cancel')
  },
  closeDialog () {
    row.value = {} as IEvent
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
