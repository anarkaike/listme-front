<template>
  <div class="jc-user-form row jc-form">
    <q-form class="col-grow" ref="myForm" @submit.prevent="methods.save">
      <div class="row">
        <!-- CAMPO NAME -->
        <div class="col-12 col-md-3">
          <q-input
            filled
            v-model="row.name"
            label="Nome"
            lazy-rules
            dense
            hide-bottom-space
            class="q-mr-md-sm q-mb-xs"
            :rules="[ val => val && val.length > 0 || 'Digite o nome']"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO PHOTO -->
        <div class="col-12 col-md-3">
          <q-file
            filled
            dense
            v-model="urlPhotoModel"
            label="Adicionar Foto"
            use-chips
            accept="image/*"
            hide-bottom-space
            class="q-mr-md-sm q-mb-xs"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>

        <!-- CAMPO DESCRICAO -->
        <div class="col-12 col-md-5">
          <q-input
            filled
            v-model="row.description"
            label="Descrição"
            lazy-rules
            dense
            hide-bottom-space
            class="q-mr-md-sm  q-mb-xs"
            :rules="[ val => val && val.length > 0 || 'Digite o descricao']"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-1">
          <q-btn label="Add" type="submit" color="primary" class="full-width" />
        </div>

      </div>

    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, Ref, ref } from 'vue'
import { QForm } from 'quasar'
import type { IEvent, IEventList, IOption } from '@/interfaces'
import { $stores } from '@/stores/all'

// CONSTANTES ---------------------------------------------------
const myForm = ref<QForm|null>(null)
const urlPhotoModel = ref<File[]>([] as File[])
const eventList: Ref<IEventList> = ref({} as IEventList)
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
    const method = eventList.value.id ? 'update' : 'create'
    if ('name' in urlPhotoModel.value) {
      eventList.value.url_photo_up = urlPhotoModel.value as unknown as File
    }
    eventList.value.event_id = row.value.id
    $stores.eventsLists[method](eventList.value).then((value: IEventList) => {
      emit('on-submit', value)
      emit(eventList.value.id ? 'on-update' : 'on-create', value)
      eventList.value.url_photo = value.url_photo
      methods.closeDialog()
    })
  },
  cancel () {
    emit('on-cancel')
  },
  closeDialog () {
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
