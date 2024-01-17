<template>
  <div>
    <div class="text-h6 q-mb-md row">
      <span>Detalhes de Plano e Conta</span>
      <q-space class="col-grow" />
      <q-chip :style="$stylesByStatusOfSaasClient.chip(row.status)">Plano {{toESaasClientStatusLabels[row.status]}}</q-chip>
    </div>

    Este cliente fez o cadastro dia <strong>{{humanizeDatetime(row.created_at)}}</strong>
    <br>
    O sistema está ativo à <strong>{{humanizeDuration((new Date().getTime())-(new Date(row.created_at).getTime()))}}</strong>
  </div>
</template>

<script lang="ts" setup>
import { ESaasClientStatusLabels } from '@/enums'
import { ISaasClient } from '@/interfaces'
import { defineProps, Ref, ref, withDefaults } from 'vue'
import { $stylesByStatusOfSaasClient, useHumanize } from '@/composables'

// Valores dos campos de select
const toESaasClientStatusLabels = ESaasClientStatusLabels
const { humanizeDatetime, humanizeDuration } = useHumanize()
const props = withDefaults(defineProps<{ row?: ISaasClient|null }>(), {})
const row: Ref<ISaasClient> = ref<ISaasClient>(props.row ?? {} as ISaasClient)
const emit = defineEmits([
  'on-save',
  'on-cancel'
])

const methods = {
  save (row: ISaasClient) {
    emit('on-save', row)
  },
  cancel () {
    emit('on-cancel')
  }
}
</script>
