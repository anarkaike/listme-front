<template>
  <div class="ctn-jc-audit">
    <div>
      <strong>Criado em:</strong>
      <br />
      {{ props.row.created_at }}
    </div>
    <div>
      <strong>Atualizado em:</strong>
      <br />
      {{ props.row.updated_at }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import type { IAudit } from '@/interfaces'

const props = withDefaults(defineProps<{
  row: object | null | IAudit
}>(), {})

// const methods = {
//   getUserWhoCreated () {
//
//   },
//   getUserWhoUpdated () {
//
//   },
//   getUserWhoDeleted () {
//
//   }
// }
</script>
