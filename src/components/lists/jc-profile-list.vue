<template>
  <JcGenericList
    :data-view-component="JcProfileDataView"
    :form-component="JcProfileForm"
    :filter-by-columns="['name', 'description']"
    :stores="$stores.profiles"
    :columns="columns"
    title="Perfis de Usuários"
    :rows="profiles"
    @onUpdate="methods.onUpdate"
    @onCreate="methods.onCreate"
    @onDelete="methods.onDelete"
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
import { JcGenericList, JcProfileDataView, JcProfileForm } from '@/components'
import type { IProfile } from '@/interfaces'

const columns = ref([
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'auditoria', align: 'center', label: 'Auditoria', field: 'auditoria', sortable: false },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])

const profiles = ref<IProfile[]>([])

const methods = {
  list () {
    $stores.profiles.listAll().then((res: IProfile[]) => { profiles.value = res as IProfile[] })
  },
  onDelete (event: IProfile) {
    profiles.value.splice(profiles.value.findIndex((r: IProfile) => r.id === event.id), 1)
  },
  onUpdate (event: IProfile) {
    profiles.value[profiles.value.findIndex((r: IProfile) => r.id === event.id)] = event
  },
  onCreate (event: IProfile) {
    profiles.value.unshift(event)
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
