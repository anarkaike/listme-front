<template>
  <JcGenericList
    :data-view-component="JcSaasClientDataView"
    :form-component="JcSaasClientForm"
    :filter-by-columns="['name']"
    :stores="$stores.saasClients"
    :columns="columns"
    field-label="company_name"
    title="Clientes do SaaS"
    :styleStatusForColumn="$stylesByStatusOfSaasClient.background"
  >

    <!-- COLUNA NOME -->
    <template #columns="scope">

      <!-- TEMPLATE COLUNA NAME -->
      <q-td class="col-auto" key="logo" :props="scope.props" @click="scope.onView(scope.props.row)" style="width: 120px; text-align: left; cursor: pointer;">
        <div v-if="scope.props.row.url_logo && scope.props.row.url_logo!=='' && typeof scope.props.row.url_logo === 'string'">
          <q-img :src="scope.props.row.url_logo" style="max-height: 100px; width: 100px; border-radius: 10px;" fit="contain" />
        </div>
        <div v-else>
          sem logo
        </div>
      </q-td>

      <!-- TEMPLATE COLUNA NAME -->
      <q-td key="name" :props="scope.props" @click="scope.onView(scope.props.row)" style="cursor: pointer;">
        <strong>
          {{ scope.props.row.company_name }}
          <q-chip outline :style="[$stylesByStatusOfSaasClient.chip(scope.props.row.status)]" class="chip-status q-ml-xs" dense>
            {{toESaasClientStatusLabels[scope.props.row.status]}}
          </q-chip>
        </strong>
        <div style="font-size: 10px;">
          {{ scope.props.row.contact_name }}
        </div>
        <div style="font-size: 10px;">
          {{ scope.props.row.phone }}
        </div>
        <div style="font-size: 10px;">
          {{ scope.props.row.email }}
        </div>
      </q-td>

    </template>
  </JcGenericList>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { $stores } from '@/stores/all'
import { ESaasClientStatusLabels } from '@/enums'
import { JcGenericList, JcSaasClientDataView, JcSaasClientForm } from '@/components'
import { $stylesByStatusOfSaasClient } from '@/composables'

const toESaasClientStatusLabels = ESaasClientStatusLabels

const columns = ref([
  { name: 'logo', align: 'center', label: 'Logo', field: 'logo', sortable: false },
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'auditoria', align: 'center', label: 'Auditoria', field: 'auditoria', sortable: false },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])
</script>

<style scoped lang="scss">
.chip-status {
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 10px;
  border-width: 1px;
  border-style: solid;
}
</style>
