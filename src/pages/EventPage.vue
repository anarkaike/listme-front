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
import { IOption, IEvent } from '@/interfaces'
import { JcEventList } from '@/components'

const methods = {
  filterEvents (events: IEvent[]) {
    return events.filter((event: IEvent) => {
      return event
    })
  },
  filterProfilesOptions (options: IOption[]) {
    return options
  }
}
</script>
