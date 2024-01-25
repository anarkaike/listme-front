<template>
  <JcEventListList noHashUpdate ref="eventListListRef" :eventId="row.id"  />
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { IEvent } from '@/interfaces'
import { JcEventListList } from '@/components'

const props = withDefaults(defineProps<{ row: IEvent }>(), {})
</script>
