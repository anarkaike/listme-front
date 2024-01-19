<template>
  <JcGenericList
    :rows="eventsLists"
    :columns="columns"
    :data-view-component="JcEventListDataView"
    :form-component="JcEventListForm"
    :filter-by-columns="['name', 'description']"
    :filter-data="props.filterData"
    :stores="$stores.eventsLists"
    title="Listas de Evento"
    :no-header="props.noHeader"
    :noHashUpdate="props.noHashUpdate"
    singular-label="Lista de Evento"
    plural-label="Listas de Evento"
    @onUpdate="methods.onUpdate"
    @onCreate="methods.onCreate"
    @onDelete="methods.onDelete"
    :loading="loadingEventList"
    :additionalData="{event_id: props.eventId}"
  >

    <!-- COLUNA NOME -->
    <template #columns="scope">

      <!-- TEMPLATE COLUNA NAME -->
      <q-td class="col-auto" key="photo" :props="scope.props" @click="scope.onView(scope.props.row)" style="width: 120px; text-align: left; cursor: pointer;">
        <div v-if="scope.props.row.url_photo && scope.props.row.url_photo!=='' && typeof scope.props.row.url_photo === 'string'">
          <q-img :src="scope.props.row.url_photo" style="max-height: 100px; width: 100px; border-radius: 10px;" fit="contain" />
        </div>
        <div v-else>
          sem foto
        </div>
      </q-td>

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
import { $loading } from '@/composables'
import { IEvent } from '@/interfaces'
import { ref, onBeforeMount, withDefaults, defineProps, watch } from 'vue'
import { $stores } from '@/stores/all'
import { JcGenericList, JcEventListDataView, JcEventListForm } from '@/components'
import type { IEventList } from '@/interfaces'

// CONSTANTES ----------------------------------------
const props = withDefaults(defineProps<{
  noHeader?: boolean,
  noHashUpdate?: boolean,
  filterData?:(eventsLists:IEventList[]) => IEventList[],
  eventId?: number|null,
}>(), {
  noHeader: false,
  noHashUpdate: false,
  filterData: (eventsLists: IEventList[]) => eventsLists as IEventList[],
  eventId: null
})
const columns = ref([
  { name: 'photo', align: 'left', label: 'Foto', field: 'photo', sortable: true },
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'auditoria', align: 'center', label: 'Auditoria', field: 'auditoria', sortable: false },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])
const loadingEventList = ref(true)

const eventsLists = ref<IEvent[]>([])

const methods = {
  list () {
    console.log('Listnado')
    $loading.show('Atualizando listagem')
    const params = {}
    if (props.eventId) {
      params.event_id = props.eventId
    }
    $stores.eventsLists.listAll(params).then((res: IEvent[]) => {
      console.log('Listnado - Pronto', res)
      eventsLists.value = res as IEvent[]
      $loading.hide()
      loadingEventList.value = false
    })
  },
  onDelete (eventList: IEvent) {
    eventsLists.value.splice(eventsLists.value.findIndex((r: IEvent) => r.id === eventList.id), 1)
  },
  onUpdate (eventList: IEvent) {
    eventsLists.value[eventsLists.value.findIndex((r: IEvent) => r.id === eventList.id)] = eventList
  },
  onCreate (eventList: IEvent) {
    eventsLists.value.unshift(eventList)
  }
}

onBeforeMount(() => {
  methods.list()
})

defineExpose({
  methods
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
