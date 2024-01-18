<template>
  <div class="jc-event-form-main">

    <q-form ref="myForm" class="col-grow" @submit.prevent="methods.next">
      <div class="row">
        <!-- CAMPO NAME -->
        <div class="col-12 col-md-6">
          <q-input
            filled
            v-model="row.name"
            label="Nome"
            lazy-rules
            dense
            hide-bottom-space
            class="q-mx-md-xs q-mb-sm"
            :rules="[ val => val && val.length > 0 || 'Digite o nome']"
          >
            <template #prepend>
              <icon icon="tabler:calendar-star" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO INICIO -->
        <div class="col-12 col-md-3">
          <q-input
            filled
            v-model="row.starts_at"
            label="Inicia em"
            lazy-rules
            dense
            hide-bottom-space
            class="q-mx-md-xs q-mb-sm"
            mask="##/##/#### ##:##"
            :rules="[
              val => val && val.length > 0 || 'Escolha a data e hora inicial',
              val => $useRules.datetimeBrIsValid(val) || 'Digite uma data e hora válida'
            ]"
          >
            <template v-slot:prepend>
              <icon class="btn-starts-at-date cursor-pointer" icon="fluent:calendar-ltr-32-regular" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale" target=".btn-starts-at-date">
                <q-date v-model="row.starts_at" mask="DD/MM/YYYY HH:mm" emit-immediately landscape today-btn title="Data Inicial">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </template>

            <template v-slot:append>
              <icon icon="mdi:sort-clock-descending-outline" class="cursor-pointer ctn-starts-at-time" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale" target=".ctn-starts-at-time">
                <q-time v-model="row.starts_at" mask="DD/MM/YYYY HH:mm" format24h emit-immediately landscape title="Horario Inicial">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </template>
          </q-input>
        </div>

        <!-- CAMPO FIM -->
        <div class="col-12 col-md-3">
          <q-input
            filled
            v-model="row.ends_at"
            label="Inicia em"
            lazy-rules
            dense
            hide-bottom-space
            class="q-mx-md-xs q-mb-sm"
            mask="##/##/#### ##:##"
            :rules="[ val => val && val.length > 0 || 'Escolha a data e hora final']"
          >
            <template v-slot:prepend>
              <icon class="btn-ends-at-date cursor-pointer" icon="fluent:calendar-ltr-32-regular" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale" target=".btn-ends-at-date">
                <q-date v-model="row.ends_at" mask="DD-MM-YYYY HH:mm" emit-immediately landscape today-btn title="Data Final">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </template>

            <template v-slot:append>
              <icon icon="mdi:sort-clock-ascending-outline" class="cursor-pointer ctn-ends-at-time" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale" target=".ctn-ends-at-time">
                <q-time v-model="row.ends_at" mask="DD-MM-YYYY HH:mm" format24h emit-immediately landscape today-btn title="Horário Final">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </template>
          </q-input>
        </div>
      </div>
    </q-form>

    <q-stepper-navigation class="row">

      <q-btn
        :fab-mini="$q.screen.xs || $q.screen.sm" :outline="$q.screen.xs || $q.screen.sm"
        :flat="$q.screen.md || $q.screen.lg || $q.screen.xl"
        @click="methods.cancel"
        color="primary"
        class="q-mr-sm col-auto"
      >
        <icon icon="ei:close-o" />
        <span class="only-desktop q-ml-xs">Cancelar</span>
      </q-btn>
      <q-btn
        :fab-mini="$q.screen.xs || $q.screen.sm"
        :outline="$q.screen.xs || $q.screen.sm"
        :flat="$q.screen.md || $q.screen.lg || $q.screen.xl"
        @click="methods.save"
        class="q-mr-sm col-auto"
        color="primary"
      >
        <icon icon="material-symbols-light:save-outline" />
        <span class="only-desktop q-ml-xs">Salvar</span>
      </q-btn>
      <q-space class="col-grow" />
      <q-btn @click="methods.next" color="primary">
        Próximo
        <icon icon="ep:bottom" class="q-ml-sm" />
      </q-btn>
    </q-stepper-navigation>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, Ref, watchEffect, withDefaults } from 'vue'
import { QForm } from 'quasar'
import { $notify, $useRules } from '@/composables'
import { IEvent } from '@/interfaces'

const myForm = ref<QForm|null>(null)
const props = withDefaults(defineProps<{
  row: IEvent
}>(), {

})
const row: Ref<IEvent> = ref<IEvent>(props.row)
const emit = defineEmits([
  'update:row',
  'on-save',
  'on-next',
  'on-cancel'
])
watchEffect(() => {
  row.value = props.row
})
const methods = {
  next () {
    if (myForm.value === null) return
    myForm.value.validate().then((success: boolean) => {
      if (success) {
        emit('on-next')
      } else {
        $notify.error('Complete os campos antes de continuar.')
      }
    })
  },
  save () {
    if (myForm.value === null) return
    myForm.value.validate().then((success: boolean) => {
      if (success) {
        emit('on-save')
      } else {
        $notify.error('Complete os campos antes de salvar.')
      }
    })
  },
  cancel () {
    console.log('cancelll')
    emit('on-cancel')
  }
}
</script>

<style lang="scss" scoped>

</style>
