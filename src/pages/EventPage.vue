<template>
  <div>
    <h1 class="page-title">
      Eventos
    </h1>
    <div>
      <JcEventList :filter-data="methods.filterEvents" />
    </div>
  </div>
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
