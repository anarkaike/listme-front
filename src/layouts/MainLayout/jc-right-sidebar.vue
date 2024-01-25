<template>
  <q-drawer v-model="$stores.sidebar.right.open" :width="250" side="right">
    <div class="jc-sidebar-content">
      <!-- TITULO -->
      <q-list>
        <q-item-label class="title" header>
          Informações & Ajuda
        </q-item-label>
      </q-list>
    </div>
  </q-drawer>
</template>

<script lang="ts" setup>
import { $stores } from '@/stores/all'
</script>
