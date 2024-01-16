<template>
  <div v-bind="$attrs">
    <span v-if="$q.screen.md || $q.screen.lg || $q.screen.xl">
      <jc-btn-view @on-click="methods.onView" class="d-none" />
      <jc-btn-edit @on-click="methods.onEdit" class="md-lg-xl" />
      <jc-btn-delete @on-click="methods.onDelete" class="md-lg-xl" />
    </span>
    <q-fab color="primary" icon="keyboard_arrow_left" direction="left" v-if="$q.screen.xs || $q.screen.sm">
      <q-fab-action color="negative" @click="methods.onDelete" icon="delete" />
      <q-fab-action color="secondary" @click="methods.onEdit" icon="edit" />
      <q-fab-action color="info" @click="methods.onView" icon="preview" />
    </q-fab>
  </div>
</template>

<script lang="ts" setup>
import { JcBtnView, JcBtnEdit, JcBtnDelete } from '@/components'

// CONSTANTES ---------------------------------------------------
// const props = defineProps([])
const emit = defineEmits([
  'on-view',
  'on-edit',
  'on-delete'
])

// METODOS ---------------------------------------------------
const methods = {
  onView (row: unknown) {
    emit('on-view', row)
  },
  onEdit (row: unknown) {
    emit('on-edit', row)
  },
  onDelete (row: unknown) {
    emit('on-delete', row)
  }
}
</script>
