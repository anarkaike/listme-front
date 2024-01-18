<template>
  <div class="jc-event-form-main">

    <q-form class="col-grow" ref="myForm" @submit.prevent="methods.next">
      <div class="row">

        <!-- CAMPO ENDEREÇO -->
        <div class="col-12 col-md-6">
          <q-input
            filled
            v-model="row.address"
            label="Endereço"
            lazy-rules
            dense
            hide-bottom-space
            class="q-mx-md-xs q-mb-sm"
          >
            <template #prepend>
              <icon icon="icon-park-outline:road-sign" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO CIDADE -->
        <div class="col-12 col-md-3">
          <q-input
            filled
            v-model="row.city"
            label="Cidade"
            lazy-rules
            dense
            hide-bottom-space
            class="q-mx-md-xs q-mb-sm"
          >
            <template #prepend>
              <icon icon="solar:city-outline" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO ESTADO -->
        <div class="col-12 col-md-3">
          <q-input
            filled
            v-model="row.state"
            label="Estado"
            lazy-rules
            dense
            hide-bottom-space
            class="q-mx-md-xs q-mb-sm"
          >
            <template #prepend>
              <icon icon="arcticons:50-us-states-map" />
            </template>
          </q-input>
        </div>

        <!-- BOTÕES SALVAR E CANCELAR -->
        <div class="row q-mt-lg sticky-buttons">

        </div>

      </div>
    </q-form>

    <q-stepper-navigation class="row">
      <q-btn
        :fab-mini="$q.screen.xs || $q.screen.sm"
        :outline="$q.screen.xs || $q.screen.sm"
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
        @click="methods.prev"
        color="primary"
        class="q-mr-sm col-auto"
      >
        <icon icon="ep:top" />
        <span class="only-desktop q-ml-xs">Voltar</span>
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
import { IEvent } from '@/interfaces'

const props = withDefaults(defineProps<{
  row: IEvent
}>(), {

})
const row: Ref<IEvent> = ref<IEvent>(props.row)
const emit = defineEmits([
  'update:row',
  'on-cancel',
  'on-save',
  'on-prev',
  'on-next'
])

watchEffect(() => {
  row.value = props.row
})
const methods = {
  next () {
    emit('on-next')
  },
  save () {
    emit('on-save')
  },
  prev () {
    emit('on-prev')
  },
  cancel () {
    emit('on-cancel')
  }
}
</script>

<style lang="scss" scoped>

</style>
