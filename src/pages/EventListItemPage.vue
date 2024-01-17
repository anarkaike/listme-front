<template>
  <q-layout view="lHh Lpr lFf">
    <div class="page-title">
      Eventos
    </div>
    <q-page>
      <JcEventListItemList :filter-data="methods.filterEvents" />
    </q-page>
  </q-layout>
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
