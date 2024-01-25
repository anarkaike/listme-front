<template>
  <div>
    <h1 class="page-title">
      Eventos
    </h1>
    <div>
      <JcEventListItemList :filter-data="methods.filterEvents" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { IOption, IEvent } from '@/interfaces'
import { JcEventListItemList } from '@/components'

const methods = {
  filterEvents (eventListItems: IEvent[]) {
    return eventListItems.filter((eventListItem: IEvent) => {
      return eventListItem
    })
  },
  filterProfilesOptions (options: IOption[]) {
    return options
  }
}
</script>
