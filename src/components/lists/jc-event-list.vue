<template>
  <JcGenericList
    :data-view-component="JcEventDataView"
    :form-component="JcEventForm"
    :filter-by-columns="['name', 'description']"
    :stores="$stores.events"
    :columns="columns"
    singular-label="Evento"
    plural-label="Eventos"
    :rows="events"
    @onUpdate="methods.onUpdate"
    @onCreate="methods.onCreate"
    @onDelete="methods.onDelete"
    :loading="loadingEvents"
  >

    <!-- COLUNA NOME -->
    <template #columns="scope">

      <!-- TEMPLATE COLUNA NAME -->
      <q-td class="col-auto" key="banner" :props="scope.props" @click="scope.onView(scope.props.row);methods.pinEvent(scope.props.row);" style="width: 120px; text-align: left; cursor: pointer;">
        <div v-if="scope.props.row.url_banner && scope.props.row.url_banner!=='' && typeof scope.props.row.url_banner === 'string'">
          <q-img :src="scope.props.row.url_banner" style="max-height: 100px; width: 100px; border-radius: 10px;" fit="contain" />
        </div>
        <div v-else>
          sem logo
        </div>
      </q-td>

      <!-- TEMPLATE COLUNA NAME -->
      <q-td key="name" :props="scope.props" style="cursor: pointer;" @click="scope.onView(scope.props.row);methods.pinEvent(scope.props.row)">
        <strong>
          {{ scope.props.row.name }}
        </strong>
      </q-td>
    </template>

  </JcGenericList>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { $stores } from '@/stores/all'
import { JcGenericList, JcEventDataView, JcEventForm } from '@/components'
import type { IEvent } from '@/interfaces'

const columns = ref([
  { name: 'banner', align: 'left', label: 'Banner', field: 'Banner', sortable: false },
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'auditoria', align: 'center', label: 'Auditoria', field: 'auditoria', sortable: false },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])

const events = ref<IEvent[]>([])
const loadingEvents = ref(true)

const methods = {
  listEvents () {
    $stores.events.listAll().then((res: IEvent[]) => { events.value = res as IEvent[] })
    loadingEvents.value = false
  },
  pinEvent (event: IEvent) {
    $stores.events.fixedEvent = event
  },
  onDelete (event: IEvent) {
    events.value.splice(events.value.findIndex((r: IEvent) => r.id === event.id), 1)
  },
  onUpdate (event: IEvent) {
    events.value[events.value.findIndex((r: IEvent) => r.id === event.id)] = event
  },
  onCreate (event: IEvent) {
    events.value.unshift(event)
  }
}

onBeforeMount(() => {
  methods.listEvents()
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
