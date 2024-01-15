<template>
  <div class="jc-left-sidebar">
    <!-- LATERAL ESQUERDA - MENU -->
    <q-drawer v-model="$stores.sidebar.left.open" show-if-above bordered :width="250">
      <JcMenu />
    </q-drawer>
  </div>
</template>

<script lang="ts" setup>
import { $stores } from '@/stores/all'
import { JcMenu } from './'
</script>
