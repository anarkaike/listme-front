<template>
  <JcGenericList
    :data-view-component="JcEventListItemDataView"
    :form-component="JcEventListItemForm"
    :filter-by-columns="['name']"
    :stores="$stores.eventsLists"
    :columns="columns"
    singular-label="Nome de Lista de Evento"
    plural-label="NOmes de Lista de Evento"
    title="Nomes da Lista de Eventos"
    :rows="eventsListsItems"
    @onUpdate="methods.onUpdate"
    @onCreate="methods.onCreate"
    @onDelete="methods.onDelete"
    :additionalData="{event_id: props.eventId, event_list_id: props.eventListId}"
    :loading="loading"
  >

    <!-- COLUNA NOME -->
    <template #columns="scope">
      <!-- TEMPLATE COLUNA NAME -->
      <q-td key="name" :props="scope.props" style="cursor: pointer;" @click="scope.onView(scope.props.row)">
        <strong>
          {{ scope.props.row.name }}
        </strong>
        <div style="font-size: 10px;" v-html="scope.props.row.description" />
      </q-td>
    </template>

  </JcGenericList>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { $stores } from '@/stores/all'
import { JcGenericList, JcEventListItemDataView, JcEventListItemForm } from '@/components'
import type { IEventListItem } from '@/interfaces'
import { defineProps, withDefaults } from 'vue/dist/vue'

const props = withDefaults(defineProps<{
  eventListId?: number|null,
  eventId?: number|null,
}>(), {
  eventListId: null,
  eventId: null
})
const columns = ref([
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'auditoria', align: 'center', label: 'Auditoria', field: 'auditoria', sortable: false },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])

const eventsListsItems = ref<IEventListItem[]>([])
const loading = ref(true)

const methods = {
  list () {
    loading.value = true
    $stores.eventsListsItems.listAll({ event_list_id: props.eventListId }).then((res: IEventListItem[]) => {
      eventsListsItems.value = res as IEventListItem[]
      loading.value = false
    })
  },
  onDelete (eventListItem: IEventListItem) {
    eventsListsItems.value.splice(eventsListsItems.value.findIndex((r: IEventListItem) => r.id === eventListItem.id), 1)
  },
  onUpdate (eventListItem: IEventListItem) {
    eventsListsItems.value[eventsListsItems.value.findIndex((r: IEventListItem) => r.id === eventListItem.id)] = eventListItem
  },
  onCreate (eventListItem: IEventListItem) {
    eventsListsItems.value.unshift(eventListItem)
  }
}

onBeforeMount(() => {
  methods.list()
})
</script>

<style scoped lang="scss">
.ctn-dialog-title {
  position: sticky;
  border-bottom: 1px solid #CCC;
  background-color: #FFF;
  top: 0px;
  z-index: 2;
}
.ctn-dialog-footer-actions {
  position: sticky;
  border-bottom: 1px solid #CCC;
  background-color: #FFF;
  bottom: 0px;
  z-index: 2;
}

.my-sticky-last-column-table {  /* specifying max-width so the example can
    highlight the sticky column on any browser window */

  th {
    padding: 0px !important;
  }
  thead tr:last-child th:last-child {    /* bg color is important for th; just specify one */
    background-color: var(--bg-transparent-4);
  }
  td {
    padding-left: 10px;
    padding-right: 10px;
  }
  td:last-child {
    background-color: var(--bg-transparent-4);
    padding: 0px !important;
  }
  th:last-child {
    background-color: var(--bg-transparent-5);
    padding: 0px !important;
    position: sticky !important;
    right: 0 !important;
    z-index: 1;
  }
  th:last-child,
  td:last-child {
    background-color: var(--bg-transparent-5);
    position: sticky !important;
    right: 0 !important;
    z-index: 1 !important;
    padding: 5px !important;
  }
}
.my-sticky-last-column-table td {
}
.chip-status {
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 10px;
  border-width: 1px;
  border-style: solid;
}
</style>
