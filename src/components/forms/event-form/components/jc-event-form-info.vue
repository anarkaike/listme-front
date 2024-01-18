<template>
  <div class="jc-event-form-main">

    <q-form ref="myForm" @submit.prevent="methods.next">
      <div class="row">

        <!-- CAMPO INFO CONTATO -->
        <div class="col-12 col-md-6">
          <q-input
            filled
            v-model="row.contact_info"
            label="Contatos"
            dense
            hide-bottom-space
            class="q-mx-md-xs q-mb-sm"
          >
            <template #prepend>
              <icon icon="mdi:stars" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO INFO PAGAMENTOS -->
        <div class="col-12 col-md-6">
          <q-input
            filled
            v-model="row.payment_info"
            label="Infos de Pagamento"
            dense
            hide-bottom-space
            class="q-mx-md-xs q-mb-sm"
          >
            <template #prepend>
              <icon icon="streamline:payment-10" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO RESTRICTIONS -->
        <div class="col-12 col-md-6">
          <q-input
            filled
            v-model="row.restrictions_info"
            label="Restrições"
            dense
            hide-bottom-space
            class="q-mx-md-xs q-mb-sm"
          >
            <template #prepend>
              <icon icon="majesticons:restricted" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO INGRESSOS -->
        <div class="col-12 col-md-6">
          <q-input
            filled
            v-model="row.ticket_info"
            label="Infos sobre ingressos"
            dense
            hide-bottom-space
            class="q-mx-md-xs q-mb-sm"
          >
            <template #prepend>
              <icon icon="mdi:ticket" />
            </template>
          </q-input>
        </div>

        <!-- CAMPO INFO ATRAÇÕES -->
        <div class="col-12 col-md-12">
          <q-input
            filled
            v-model="row.attractions_info"
            label="Atrações"
            dense
            hide-bottom-space
            class="q-mx-md-xs q-mb-sm"
          >
            <template #prepend>
              <icon icon="tabler:social" />
            </template>
          </q-input>
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
        <icon icon="ep:top" class="q-mr-sm" style="margin-top: -2px;" />
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
      <q-btn @click="methods.next" color="primary" class="q-mr-sm col-auto" >
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
