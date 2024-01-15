<template>
  <div class="text-h6">Listas e nomes</div>
  <q-list>

    Informações sobre as listas e convidados deste evento

  </q-list>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { IEvent } from '@/interfaces'

const props = withDefaults(defineProps<{ data: IEvent }>(), {})
</script>
