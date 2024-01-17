<template>
  <q-list :bordered="$q.screen.md || $q.screen.lg || $q.screen.xl">
    <!-- INFO LOGO -->
    <q-item class="q-pa-none">
      <q-item-section v-if="props.row.url_banner && props.row.url_banner!=='' && typeof props.row.url_banner==='string'">
        <q-img :src="props.row.url_banner" fit="contain" style="max-height: 200px;" />
      </q-item-section>
      <q-item-section v-else class="text-body text-grey-6 text-center">
        <q-item-label>Nenhuma <strong>banner</strong> cadastrada ainda</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator v-show="$q.screen.md || $q.screen.lg || $q.screen.xl" />

    <!-- INFO STATUS -->
    <q-item :style="{color:(props.row.status?'green':'gray')}">
      <q-item-section avatar><q-icon :name="props.row.status?'toggle_on':'toggle_off'" /></q-item-section>
      <q-item-section>
        <q-item-label class="text-caption text-weight-light">Status:</q-item-label>
        <q-item-label class="text-body2 text-weight-medium">{{props.row.status?'Ativo':'Inativo'}}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <!-- INFO AUDITORIA - CRIADO EM -->
    <q-item>
      <q-item-section avatar><icon icon="ph:calendar-plus-light" /></q-item-section>
      <q-item-section>
        <q-item-label class="text-caption text-weight-light">Criado em:</q-item-label>
        <q-item-label class="text-body2 text-weight-medium">
          {{humanizeDatetime(props.row.created_at)}}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <!-- INFO AUDITORIA - ATUALIZADO EM -->
    <q-item>
      <q-item-section avatar><icon icon="material-symbols-light:edit-calendar-outline" /></q-item-section>
      <q-item-section>
        <q-item-label class="text-caption text-weight-light">Atualizado em:</q-item-label>
        <q-item-label class="text-body2 text-weight-medium">{{humanizeDatetime(props.row.updated_at)}}</q-item-label>
      </q-item-section>
    </q-item>

  </q-list>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { useHumanize } from '@/composables'
import { IEvent } from '@/interfaces'

const { humanizeDatetime } = useHumanize()
const props = withDefaults(defineProps<{ row: IEvent }>(), {})
</script>
