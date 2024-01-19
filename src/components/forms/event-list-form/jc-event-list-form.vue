<template>
  <div class="jc-user-form jc-form">
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
import { QForm, useQuasar } from 'quasar'
import type { IEventList, IOption } from '@/interfaces'
import { $stores } from '@/stores/all'

// CONSTANTES ---------------------------------------------------
const $q = useQuasar()
const myForm = ref<QForm|null>(null)
const urlPhotoModel = ref<File[]>([] as File[])
const eventList: Ref<IEventList> = ref({} as IEventList)
const props = withDefaults(defineProps<{
  row?: IEventList|null,
  filterProfilesOptions?:(options: IOption[]) => IOption[],
  additionalData?: object
}>(), {
  filterProfilesOptions: (options: IOption[]) => options
})
const row: Ref<IEventList> = ref<IEventList>(props.row ?? {
  status: 'active'
} as IEventList)
const eventsLists = ref([] as IEventList[])

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
    if (props.additionalData) {
      row.value = {
        ...row.value,
        ...props.additionalData
      }
    }
    $stores.eventsLists[method](row.value).then((value: IEventList) => {
      emit('on-submit', value)
      emit(row.value.id ? 'on-update' : 'on-create', value)
      row.value.url_photo = value.url_photo
      methods.closeDialog()
    })
  },
  cancel () {
    emit('on-cancel')
  },
  closeDialog () {
    emit('close-dialog')
  },
  onCreate () {
    console.log('Junio onCreate')
  },
  toogleDialogForm () {
    console.log('Junio toogleDialogForm')
  }
}
</script>

<style lang="scss" scoped>
</style>
