<template>
  <div class="ctn-jc-audit">
    <div v-if="props.row.created_at">
      <strong>Criado em:</strong>
      <br />
      {{ humanizeDatetime(props.row.created_at) }}
    </div>
    <div v-if="props.row.updated_at">
      <strong>Atualizado em:</strong>
      <br />
      {{ humanizeDatetime(props.row.created_at) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import type { IAudit } from '@/interfaces'
import { useHumanize } from '@/composables'

// CONSTANTES ---------------------------------------------------
const { humanizeDatetime } = useHumanize()
const props = withDefaults(defineProps<{ row: object | null | IAudit }>(), {})
</script>
