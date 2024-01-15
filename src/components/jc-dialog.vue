<template>
  <q-dialog v-model="openDialog" @close="methods.closeDialog">
    <q-card style="width: 100%; max-width: 1000px;">
      <q-card-section class="ctn-dialog-title q-pb-none q-py-xs q-px-sm row justify-between">
        <div class="text-h6 q-pt-xs q-pl-md-sm col">
          <slot name="title" />
          <slot name="tags-title">
            <q-chip v-for="(tag, index) in props.tagsTitle" :key="index" outline color="primary" text-color="white" dense class="q-ml-md">
              {{tag.title}}
            </q-chip>
          </slot>
        </div>
        <div class="col col-auto">
          <slot name="top-actions" />
        </div>
        <div class="col col-auto">
          <q-btn flat round color="negative" icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-card-section class="q-pa-xs q-pa-md-md">

        <!-- USERS DATA VIEW -->
        <slot name="default" />

      </q-card-section>
      <q-card-actions align="right" class="ctn-dialog-footer-actions bg-white text-teal q-px-md" v-if="!props.disableBtnClose || $slots.actions">
        <q-btn flat label="Fechar esta janela" color="primary" v-close-popup v-if="!props.disableBtnClose" />
        <slot name="actions" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { Ref, ref, watch, watchEffect, withDefaults } from 'vue'
import type { ITagConfig } from '@/interfaces'

// CONSTANTES ----------------------------------------------------
const props = withDefaults(defineProps<{
  openDialog: boolean,
  title?: '',
  disableBtnClose?: boolean,
  tagsTitle?: ITagConfig[]
}>(), {
  openDialog: false,
  disableBtnClose: false,
  tagsTitle: () => [] as ITagConfig[]
})
const openDialog: Ref<boolean> = ref<boolean>(props.openDialog)
const emit = defineEmits([
  'update:openDialog'
])

// WATCHS ---------------------------------------------------
watchEffect(() => {
  emit('update:openDialog', openDialog.value)
})
watch(
  () => props.openDialog,
  (newValue) => {
    openDialog.value = newValue
  }
)

// METODOS ---------------------------------------------------
const methods = {
  closeDialog () {
    console.log('Junio fechando dialog')
  }
}
</script>

<style lang="scss" scoped>
.ctn-dialog-title {
  position: sticky;
  border-bottom: 1px solid #CCC;
  background-color: #FFF;
  top: 0px;
  z-index: 2;
}
.ctn-dialog-footer-actions {
  position: sticky;
  border-bottom: 1px solid #CCC;
  background-color: #FFF;
  bottom: 0px;
  z-index: 2;
}
</style>
