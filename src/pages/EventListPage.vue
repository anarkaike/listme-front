<template>
  <div>
    <h1 class="page-title">
      Eventos
    </h1>
    <div>
      <JcEventListList :filter-data="methods.filterEvents" />
    </div>
  </div>
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
