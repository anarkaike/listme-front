<template>
  <JcGenericList
    :data-view-component="JcSaasClientDataView"
    :form-component="JcSaasClientForm"
    :filter-by-columns="['name']"
    :stores="$stores.saasClients"
    :columns="columns"
    title="Clientes do SaaS"
    :styleStatusForColumn="methods.styleStatusForColumn"
  >

    <!-- COLUNA NOME -->
    <template #columns="scope">

      <!-- TEMPLATE COLUNA NAME -->
      <q-td key="name" :props="scope.props" @click="scope.onView(scope.props.row)" style="cursor: pointer;">
        <strong>
          {{ scope.props.row.company_name }}
          <q-chip outline :style="[methods.styleStatusForChip(scope.props.row.status)]" class="chip-status q-ml-xs" dense>
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
import { ESaasClientStatusLabels, ESaasClientStatusValues } from '@/enums'
import { JcGenericList, JcSaasClientDataView, JcSaasClientForm } from '@/components'

const toESaasClientStatusLabels = ESaasClientStatusLabels

const columns = ref([
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'auditoria', align: 'center', label: 'Auditoria', field: 'auditoria', sortable: false },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])

const methods = {
  styleStatusForColumn (status: ESaasClientStatusValues): string {
    switch (status) {
      case ESaasClientStatusValues.active:
      case ESaasClientStatusValues.active_testing:
      case ESaasClientStatusValues.active_pending_payment:
        return 'color: green; background-color: #f8fcf4; background: linear-gradient(150deg, #f8fcf4 20%, #FFF 100%);'
      case ESaasClientStatusValues.archived:
        return 'color: gray; background-color: #f4f4f4; background: linear-gradient(150deg, #f4f4f4 20%, #FFF 100%)'
      case ESaasClientStatusValues.blocked:
      case ESaasClientStatusValues.blocked_pending_payment:
        return 'color: red; background-color: #f9f2f2; background: linear-gradient(150deg, #f9f2f2 20%, #FFF 100%)'
    }
    return ''
  },
  styleStatusForChip (status: ESaasClientStatusValues): string {
    switch (status) {
      case ESaasClientStatusValues.active:
      case ESaasClientStatusValues.active_testing:
      case ESaasClientStatusValues.active_pending_payment:
        return 'border-color: green; color: green; background-color: #bcff7a !important;'
      case ESaasClientStatusValues.archived:
        return 'border-color: gray; color: gray; background-color: #e0e0e0 !important;'
      case ESaasClientStatusValues.blocked:
      case ESaasClientStatusValues.blocked_pending_payment:
        return 'border-color: red; color: red; background-color: #ffc6c6 !important;'
    }
    return ''
  }
}
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
