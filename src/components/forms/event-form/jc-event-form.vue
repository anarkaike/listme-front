<template>
  <div class="jc-user-form row jc-form ctn-event-form" style="margin-left: 0px !important;">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
      header-nav
      contracted
      flat
      style="width: 100%;"
    >
      <q-step
        :name="1"
        title="Nome e data do evento"
        icon="calendar_month"
        done-icon="calendar_month"
        :done="step > 1"
      >
        <JcEventFormMain v-model:row="row" @on-next="methods.next" @on-prev="methods.prev" @on-cancel="methods.cancel" @on-save="methods.save" />
      </q-step>

      <q-step
        :name="2"
        title="Onde"
        icon="map"
        done-icon="map"
        :done="step > 2"
      >
        <JcEventFormLocal v-model:row="row" @on-next="methods.next" @on-prev="methods.prev" @on-cancel="methods.cancel" @on-save="methods.save" />
      </q-step>

      <q-step
        :name="3"
        title="Detalhes"
        icon="contact_support"
        done-icon="contact_support"
      >
        <JcEventFormInfo v-model:row="row" @on-next="methods.next" @on-prev="methods.prev" @on-cancel="methods.cancel" @on-save="methods.save" />
      </q-step>

      <q-step
        :name="4"
        title="Descrição"
        icon="subject"
        done-icon="subject"
      >
        <JcEventFormDescription v-model:row="row" @on-next="methods.next" @on-prev="methods.prev" @on-cancel="methods.cancel" @on-save="methods.save" />
      </q-step>

      <q-step
        :name="5"
        title="Banner"
        icon="insert_photo"
        done-icon="insert_photo"
      >
        <JcEventFormImages v-model:urlBannerModel="urlBannerModel" v-model:row="row" :row="row" @on-next="methods.next" @on-prev="methods.prev" @on-cancel="methods.cancel" @on-save="methods.save" />
      </q-step>

      <q-step
        :name="6"
        title="Listas e promoters"
        icon="format_list_numbered"
        done-icon="format_list_numbered"
        v-if="row?.id"
      >
        <JcEventFormLists v-model:row="row" @on-next="methods.next" @on-prev="methods.prev" @on-cancel="methods.cancel" @on-save="methods.save" />
      </q-step>
    </q-stepper>
  </div>
</template>

<script lang="ts" setup>
import { $notify } from '@/composables'
import { useQuasar } from 'quasar'
import { defineProps, withDefaults, Ref, ref } from 'vue'
import type { IEvent } from '@/interfaces'
import { $stores } from '@/stores/all'
import {
  JcEventFormMain,
  JcEventFormLocal,
  JcEventFormInfo,
  JcEventFormDescription,
  JcEventFormImages,
  JcEventFormLists
} from './components'

// CONSTANTES ---------------------------------------------------
const $q = useQuasar()
const step = ref(1)
const urlBannerModel = ref<File[]>([] as File[])
const props = withDefaults(defineProps<{
  row?: IEvent|null
}>(), {})
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
    const method = row.value.id ? 'update' : 'create'
    if ('name' in urlBannerModel.value) {
      row.value.url_banner_up = urlBannerModel.value as unknown as File
    }
    if (!$stores.auth.saas_client?.id) {
      $notify.error('É necessário estar logado como usuário do saas para poder cadastrar um evento.')
      return
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    $stores.events[method](row.value).then((value: IEvent) => {
      emit('on-submit', value)
      emit(row.value.id ? 'on-update' : 'on-create', value)
      row.value = value as IEvent
      // if (!row.value.id) {
      //   methods.closeDialog()
      // }
      if (step.value === 5) {
        step.value = 6
      } else {
        $q.dialog({
          title: 'Os dados foram salvos.',
          message: 'Deseja fechar esta janela? Cancele para continuar editando os dados.',
          persistent: true,
          cancel: true
        }).onOk(() => {
          methods.closeDialog()
        })
      }
    })
  },
  next () {
    if (step.value === 6) {
      methods.save()
    } else {
      step.value = step.value + 1
    }
  },
  prev () {
    if (step.value === 1) {
      methods.cancel()
    } else {
      step.value = step.value - 1
    }
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
</script>

<style lang="scss" scoped>
.q-stepper--vertical {
  padding: 0px;
}
</style>
