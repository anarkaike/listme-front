<template>
  <div class="jc-event-form-images">

    <q-form ref="myForm" @submit.prevent="methods.next">
      <div class="row">
        <!-- CAMPO LOGO -->
        <div class="col-12 col-md-12">
          <q-file
            filled
            dense
            v-model="urlBannerModel"
            label="Adicionar Logomarca"
            use-chips
            accept="image/*"
            class="q-mr-md-sm q-mb-md">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div v-if="row.url_banner && row.url_banner!=='' && typeof row.url_banner==='string'" style="text-align: left;">
          <q-img :src="row.url_banner" style="max-height: 200px; text-align: left;" fit="contain" />
        </div>
      </div>

    </q-form>

    <q-stepper-navigation class="col-12 row">
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
        v-if="row?.id"
      >
        <icon icon="material-symbols-light:save-outline" />
        <span class="only-desktop q-ml-xs">Salvar</span>
      </q-btn>
      <q-space class="col-grow" />
      <q-btn @click="methods.save" color="primary" class="q-ml-sm" v-if="!row?.id">
        Salvar
        <icon icon="material-symbols-light:save-outline" class="q-ml-sm" />
      </q-btn>
      <q-btn @click="methods.next" color="primary" class="q-ml-sm" v-else>
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
  row: IEvent,
  urlBannerModel?: File | null
}>(), {

})
const urlBannerModel = ref<File[]|null>(props.urlBannerModel as File[]|null)
const row: Ref<IEvent> = ref<IEvent>(props.row)
const emit = defineEmits([
  'update:row',
  'update:urlBannerModel',
  'on-cancel',
  'on-save',
  'on-prev',
  'on-next'
])

watchEffect(() => {
  row.value = props.row
})
watchEffect(() => {
  emit('update:urlBannerModel', urlBannerModel.value)
})

const methods = {
  prev () {
    emit('on-prev')
  },
  save () {
    emit('on-save')
  },
  next () {
    emit('on-next')
  },
  cancel () {
    emit('on-cancel')
  }
}
</script>

<style lang="scss" scoped>

</style>
