<template>
  <q-layout view="lHh Lpr lFf">
    <div class="page-title">
      Eventos
    </div>
    <q-page>
      <JcEventList :filter-data="methods.filterEvents" />
    </q-page>
  </q-layout>
</template>
<script lang="ts" setup>
import { IEvent } from '@/interfaces'
import { JcEventList } from '@/components'
import { ref } from 'vue'

const events = ref<IEvent[]>([])

const methods = {
  filterEvents (events: IEvent[]) {
    return events.filter((event: IEvent) => {
      return event
    })
  }
}
</script>
