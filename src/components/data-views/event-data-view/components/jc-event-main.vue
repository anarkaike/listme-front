<template>
  <div class="text-h6">Informações Gerais</div>
  <q-list>

    <!-- INFO NOME DO EVENTO -->
    <q-item class="q-pa-sm q-pa-md-xs">
      <q-item-section avatar><icon icon="tabler:calendar-star" /></q-item-section>
      <q-item-section class="q-pa-none">
        <q-item-label class="text-caption text-weight-light">Nome do evento:</q-item-label>
        <q-item-label class="text-body2 text-weight-medium">{{props.row.name}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />

    <div class="row">

      <!-- INFO INICIO DO EVENTO -->
      <div class="col-12 col-sm-6">
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="mdi:sort-clock-descending-outline" /></q-item-section>
          <q-item-section class="q-pa-none">
            <q-item-label class="text-caption text-weight-light">Início:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">
              {{ humanizeDatetime(props.row.starts_at) }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>

      <!-- INFO FIM DO EVENTO -->
      <div class="col-12 col-sm-6">
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="mdi:sort-clock-ascending-outline" /></q-item-section>
          <q-item-section class="q-pa-none">
            <q-item-label class="text-caption text-weight-light">Fim:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">
              {{ humanizeDatetime(props.row.ends_at) }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>

      <!-- INFO TEMPO ATÉ O EVENTO OU QUANTO TEMPO JÁ PASSOU -->
      <div class="col-12 col-sm-6">
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="tabler:calendar-time" /></q-item-section>
          <q-item-section class="q-pa-none" v-if="(new Date()).getTime() < (new Date(props.row.starts_at)).getTime()">
            <q-item-label class="text-caption text-weight-light">Falta para chegar:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">
              {{ humanizeDuration((new Date()).getTime()-(new Date(props.row.starts_at)).getTime()) }}
            </q-item-label>
          </q-item-section>
          <q-item-section class="q-pa-none" v-else>
            <q-item-label class="text-caption text-weight-light">O evento aconteceu faz:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">
              {{ humanizeDuration((new Date(props.row.starts_at)).getTime() - (new Date()).getTime()) }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>

      <!-- INFO DURAÇÃO DO EVENTO -->
      <div class="col-12 col-sm-6">
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="game-icons:duration" /></q-item-section>
          <q-item-section class="q-pa-none">
            <q-item-label class="text-caption text-weight-light">Duração:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">
              {{ humanizeDuration(props.row.duration_in_hours ? (props.row.duration_in_hours * 3600000) : ((new Date(props.row.starts_at)).getTime() - (new Date(props.row.ends_at)).getTime())) }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>

    </div>
  </q-list>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { useHumanize } from '@/composables'
import { IEvent } from '@/interfaces'

const { humanizeDuration, humanizeDatetime } = useHumanize()
const props = withDefaults(defineProps<{ row: IEvent }>(), {})
</script>
