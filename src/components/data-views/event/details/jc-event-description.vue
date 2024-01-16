<template>
  <div class="text-h6">Descrição do Evento</div>
  <q-list>

    <!-- INFO DESCRIÇÃO -->
    <q-item class="q-px-none">
      <q-item-section>
        <q-item-label class="">{{props.data.description}}</q-item-label>
      </q-item-section>
    </q-item>

  </q-list>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { IEvent } from '@/interfaces'

const props = withDefaults(defineProps<{ data: IEvent }>(), {})
</script>
