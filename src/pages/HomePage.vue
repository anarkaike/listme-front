<template>
  <div view="lHh Lpr lFf">
    <div class="page-title">
      Dashboard
    </div>
    <q-page>
      <div style="cursor: pointer; width: 100px; height: 100px; background-color: #CCC;" @click="openDialog=true"></div>
      {{ $stores.auth.$state.saasClient }}
    </q-page>
    <!-- DIALOG EVENT VIEW -->
    <JcDialog v-model:openDialog="openDialog" v-if="data && openDialog">
      <template #title>Data View Event</template>
      <JcEventDataView v-model:data="data"/>
    </JcDialog>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { $stores } from '@/stores/all'
import { IEvent } from '@/interfaces'
import { JcDialog, JcEventDataView } from '@/components'

const openDialog = ref(true)
const data = ref<IEvent|null>(null)

onBeforeMount(() => {
  $stores.events.getById(1).then((res) => {
    data.value = res as IEvent
  })
})

</script>
