<template>
  <div class="jc-event-form-lists">
    <JcEventListList noHashUpdate ref="eventListListRef" :eventId="row.id"  />

    <q-stepper-navigation class="row">
      <q-space class="col-grow" />
      <q-btn
        :fab-mini="$q.screen.xs || $q.screen.sm"
        :outline="$q.screen.xs || $q.screen.sm"
        :flat="$q.screen.md || $q.screen.lg || $q.screen.xl"
        @click="methods.cancel"
        color="primary"
        class="q-mr-sm col-auto"
      >
        <icon icon="ei:close-o" />
        <span class="only-desktop q-ml-xs">Cancelar</span>
      </q-btn>
      <q-btn
        :fab-mini="$q.screen.xs || $q.screen.sm"
        :outline="$q.screen.xs || $q.screen.sm"
        :flat="$q.screen.md || $q.screen.lg || $q.screen.xl"
        @click="methods.prev"
        color="primary"
        class="q-mr-sm col-auto"
      >
        <icon icon="ep:top" />
        <span class="only-desktop q-ml-xs">Voltar</span>
      </q-btn>
      <q-btn @click="methods.next" color="primary">
        <icon icon="material-symbols-light:save-outline" />
        <span class="only-desktop q-ml-xs">Salvar</span>
      </q-btn>
    </q-stepper-navigation>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, Ref, watchEffect, withDefaults } from 'vue'
import { IEvent } from '@/interfaces'
import { JcEventListList } from '@/components'

const eventListListRef = ref()
const props = withDefaults(defineProps<{
  row: IEvent
}>(), {

})
const eventsLists = ref([] as IEvent[])
const row: Ref<IEvent> = ref<IEvent>(props.row)
const emit = defineEmits([
  'update:row',
  'on-cancel',
  'on-prev',
  'on-next'
])

watchEffect(() => {
  row.value = props.row
})

// const eventsLists = ref<IEvent[]>([])

const methods = {
  next () {
    emit('on-next')
  },
  prev () {
    emit('on-prev')
  },
  cancel () {
    emit('on-cancel')
  },
  updateList () {
    eventListListRef.value.methods.list()
  }
}
</script>

<style lang="scss" scoped>

</style>
