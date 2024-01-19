<template>
  <q-footer>
    <q-toolbar>
      <q-toolbar-title class="text-center">
        Evento Fixado: {{$stores.events.fixedEvent.name}}
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>
<script lang="ts" setup>
import { $stores } from '@/stores/all'

</script>
<style lang="scss" scoped>
.q-footer {
  position: sticky;
  bottom: 0px;
  left: 0px !important;

  $border-radius: 100%;
  -webkit-border-top-left-radius: $border-radius;
  -webkit-border-top-right-radius: $border-radius;
  -moz-border-radius-topleft: $border-radius;
  -moz-border-radius-topright: $border-radius;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;

  .q-toolbar {
    margin-top: 15px;
    margin-bottom: -5px;
  }
}
</style>
