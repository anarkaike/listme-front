<template>
  <q-layout view="lHh Lpr lFf">
    <div class="page-title">
      Eventos
    </div>
    <q-page>
      <JcEventListList :filter-data="methods.filterEvents" />
    </q-page>
  </q-layout>
</template>
<script lang="ts" setup>
import { IOption, IEvent } from '@/interfaces'
import { JcEventListList } from '@/components'

const methods = {
  filterEvents (eventLists: IEvent[]) {
    return eventLists.filter((eventList: IEvent) => {
      return eventList
    })
  },
  filterProfilesOptions (options: IOption[]) {
    return options
  }
}
</script>
