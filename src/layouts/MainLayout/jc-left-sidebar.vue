<template>
  <!-- LATERAL ESQUERDA - MENU -->
  <q-drawer v-model="standard" :width="250" :overlay="overlay" behavior="desktop" mini-width="55" mini-to-overlay  :mini="mini">
    <template #default>
      <div class="jc-sidebar-content">
        <JcMenu />
      </div>
    </template>
    <template #mini>
      <div class="jc-sidebar-content">
        <JcMenu mini="true" />
      </div>
    </template>
  </q-drawer>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import { $stores } from '@/stores/all'
import { JcMenu } from './'

const $q = useQuasar()
const standard = computed(() => $q.screen.xs ? $stores.sidebar.left.open : true)
const mini = computed(() => !$q.screen.xs ? $stores.sidebar.left.open : false)
const overlay = computed(() => $q.screen.xs)
</script>
