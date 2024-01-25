<template>
  <div class="ctn-jc-data-view row reverse jc-data-view">
    <!-- COLUNA DE INFOS -->
    <div class="col-md-8 col-12 q-pl-none q-pl-md-md">
      <JcEventListItemList :eventId="row.event_id" :eventListId="row.id" />
    </div>

    <!-- COLUNA DE FOTO, STATUS E AUDITORIA -->
    <div class="col-md-4 col-12 q-pa-none q-pt-md q-pa-sm-none">
      <q-list bordered >
        <!-- INFO NOME -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="ph:user-thin" /></q-item-section>
          <q-item-section class="q-pa-none">
            <q-item-label class="text-caption text-weight-light">Nome da lista:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.name}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO DESCRIÇÃO -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="iconamoon:email-thin" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Descrição:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.description}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO FOTO -->
        <q-item class="q-pa-none">
          <q-item-section v-if="row.url_photo && row.url_photo!=='' && typeof row.url_photo==='string'">
            <q-img :src="row.url_photo" fit="contain" style="max-height: 200px;" />
          </q-item-section>
          <q-item-section v-else class="text-body text-grey-6 text-center">
            <q-item-label>Nenhuma <strong>foto</strong> cadastrada ainda</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO STATUS -->
        <q-item :style="{color:(row.status?'green':'gray')}">
          <q-item-section avatar><q-icon :name="row.status?'toggle_on':'toggle_off'" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Status:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{toEUserStatusLabels[row.status]}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO AUDITORIA - CRIADO EM -->
        <q-item>
          <q-item-section avatar><icon icon="ph:calendar-plus-light" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Criado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{humanizeDatetime(row.created_at)}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO AUDITORIA - ATUALIZADO EM -->
        <q-item>
          <q-item-section avatar><icon icon="material-symbols-light:edit-calendar-outline" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Atualizado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{humanizeDatetime(row.updated_at)}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { $stores } from '@/stores/all'
import { defineProps, withDefaults, ref, watchEffect, onBeforeMount } from 'vue'
import type { IEventList, IEventListItem } from '@/interfaces'
import { EUserStatusLabels } from '@/enums'
import { useHumanize } from '@/composables'
import { JcEventListItemList } from '@/components'

// CONSTANTES ---------------------------------------------------
const { humanizeDatetime } = useHumanize()
const toEUserStatusLabels = EUserStatusLabels
const props = withDefaults(defineProps<{ row: IEventList }>(), {})
const emit = defineEmits<{(e: 'update:row', row: IEventList): void}>()
const row = ref<IEventList>(props.row)
const eventsListsItems = ref([] as IEventList[])

// WATCHS ---------------------------------------------------
watchEffect(() => {
  emit('update:row', row.value)
})

// METODOS ---------------------------------------------------
const methods = {
  getEventListItem () {
    $stores.eventsListsItems.listAll({ event_list_id: row.value.id }).then((res: IEventListItem[]) => {
      eventsListsItems.value = res
    })
  }
}

onBeforeMount(() => {
  methods.getEventListItem()
})
</script>

<style lang="scss" scoped>
.ctn-jc-data-view {

}
</style>
