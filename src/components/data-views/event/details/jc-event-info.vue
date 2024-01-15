<template>
  <div class="text-h6">Informações Adicionais</div>
  <q-list>

    <!-- INFO ATRAÇÕES -->
    <q-item class="q-pa-sm q-pa-md-xs">
      <q-item-section avatar><icon icon="mdi:stars" /></q-item-section>
      <q-item-section>
        <q-item-label class="text-caption text-weight-light">Atrações ou destaques da festa:</q-item-label>
        <q-item-label class="text-body2 text-weight-medium">{{data.contact_info}}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <!-- INFO PAGAMENTOS -->
    <q-item class="q-pa-sm q-pa-md-xs">
      <q-item-section avatar><icon icon="streamline:payment-10" /></q-item-section>
      <q-item-section>
        <q-item-label class="text-caption text-weight-light">Informações sobre pagamentos:</q-item-label>
        <q-item-label class="text-body2 text-weight-medium">{{data.payment_info}}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <!-- INFO RESTRIÇÕES -->
    <q-item class="q-pa-sm q-pa-md-xs">
      <q-item-section avatar><icon icon="majesticons:restricted" /></q-item-section>
      <q-item-section>
        <q-item-label class="text-caption text-weight-light">Informações sobre restrições:</q-item-label>
        <q-item-label class="text-body2 text-weight-medium">{{data.payment_info}}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <!-- INFO INGRESSOS -->
    <q-item class="q-pa-sm q-pa-md-xs">
      <q-item-section avatar><icon icon="mdi:ticket" /></q-item-section>
      <q-item-section>
        <q-item-label class="text-caption text-weight-light">Informações sobre ingressos:</q-item-label>
        <q-item-label class="text-body2 text-weight-medium">{{data.payment_info}}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <!-- INFO INGRESSOS -->
    <q-item class="q-pa-sm q-pa-md-xs">
      <q-item-section avatar><icon icon="tabler:social" /></q-item-section>
      <q-item-section>
        <q-item-label class="text-caption text-weight-light">Redes Sociais:</q-item-label>
        <q-item-label class="text-body2 text-weight-medium">{{data.social_networks}}</q-item-label>
      </q-item-section>
    </q-item>

  </q-list>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { IEvent } from '@/interfaces'

const props = withDefaults(defineProps<{ data: IEvent }>(), {})
</script>
