<template>
  <div class="jc-right-sidebar">
    <q-drawer v-model="$stores.sidebar.right.open" bordered :width="250" side="right">
      <!-- TITULO -->
      <q-list>
        <q-item-label class="title" header>
          Informações & Ajuda
        </q-item-label>
      </q-list>
    </q-drawer>
  </div>
</template>

<script lang="ts" setup>
import { $stores } from '@/stores/all'
</script>
