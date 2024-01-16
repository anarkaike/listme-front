<template>
  <!-- TABELA PARA LISTAGEM DE ADMINSTRADORES -->
  <q-table
    class="my-sticky-last-column-table"
    flat bordered
    :rows="saasClientsFiltered"
    compact
    :columns="columns"
    row-key="name"
    v-model:selected="selected"
  >

    <template v-slot:top>
      <div class="fit row wrap justify-between items-start content-start">
        <div class="text-h6 col-grow">Admins</div>
        <div style="min-width: 100px; margin-top: -3px;" class="q-pr-sm ctn-filter col-12 q-mb-sm col-md-5">
          <q-input dense name="busca" outlined label="Filtrar dados" type="text" v-model="filterForm.filter" class="q-mr-md"></q-input>
        </div>
        <div>
          <q-btn unelevated dense color="primary" class="q-px-md" @click="methods.toogleDialogForm(true)">
            Novo Admin
          </q-btn>
        </div>
      </div>
    </template>

    <!-- TEMPLATE PARA SLOT DE BODY DA TABELA -->
    <template v-slot:body="props">
      <q-tr :props="props" :style="[methods.styleStatusForColumn(props.row.status)]">
        <!-- TEMPLATE COLUNA CHECK -->
        <q-td style="display: none;">
          <q-checkbox :name="`admin_${props.row.id}`" :toggle-indeterminate="false" v-model="props.selected" />
        </q-td>

        <!-- TEMPLATE COLUNA NAME -->
        <q-td key="name" :props="props" @click="methods.onView(props.row)" style="cursor: pointer;">
          <strong>
            {{ props.row.company_name }}
            <q-chip outline :style="[methods.styleStatusForChip(props.row.status)]" class="chip-status q-ml-xs" dense>
              {{toESaasClientStatusLabels[props.row.status]}}
            </q-chip>
          </strong>
          <div style="font-size: 10px;">
            {{ props.row.contact_name }}
          </div>
          <div style="font-size: 10px;">
            {{ props.row.phone }}
          </div>
          <div style="font-size: 10px;">
            {{ props.row.email }}
          </div>
        </q-td>

        <!-- TEMPLATE COLUNA AUDTORIA -->
        <q-td auto-width key="auditoria" :props="props" style="font-size: 10px;" @click="methods.onView(props.row)">
          <JcAudit :row="props.row" />
        </q-td>

        <!-- TEMPLATE COLUNA ACTIONS -->
        <q-td auto-width key="actions" :props="props">
          <JcGroupBtnForTables
            @on-view="methods.onView(props.row)"
            @on-edit="methods.onEdit(props.row)"
            @on-delete="methods.onDelete(props.row)"
          />
        </q-td>
      </q-tr>
    </template>

    <!-- TEMPLATE SLOT LOADING -->
    <template #loading>
      Carregando
    </template>

    <!-- TEMPLATE SLOT LOADING -->
    <template #no-data>
      <div style="padding-top: 20px; padding-bottom: 20px; text-align: center; width: 100%;">
        <span style="display: inline-block;color:#e0d9ea; font-size: 20px; font-weight: bold;">
          Carregando...
          <br>
          <q-spinner-puff
            color="deep-purple-1"
            size="50%"
            style="display: inline-block; margin: auto;"
          />
        </span>
      </div>
    </template>
  </q-table>

  <!-- DIALOG USER VIEW -->
  <JcDialog v-model:openDialog="openDialogView">
    <template #title>{{ saasClientView.name }}</template>
    <JcSaasClientDataView v-model:data="saasClientView" />
  </JcDialog>
  <!-- DIALOG USER EDIT/NEW -->
  <JcDialog v-model:openDialog="openDialogForm" disable-btn-close @close="saasClientForEdit={}">
    <template #title>{{saasClientForEdit?.id?'Editando Administrador':'Cadastrando Administrador'}}</template>
    <JcSaasClientForm v-model:saasClient="saasClientForEdit" @on-cancel="methods.toogleDialogForm" @close-dialog="methods.toogleDialogForm" class="q-ma-sm q-ma-md-none" />
  </JcDialog>
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { ref, onBeforeMount, computed } from 'vue'
import type { ISaasClient } from '@/interfaces'
import {
  JcGroupBtnForTables,
  JcAudit,
  JcSaasClientDataView,
  JcDialog,
  JcSaasClientForm
} from '@/components'
import { $stores } from '@/stores/all'
import { $notify } from '@/composables'
import { ESaasClientStatusLabels, ESaasClientStatusValues } from '@/enums'

const toESaasClientStatusLabels = ESaasClientStatusLabels
const filterForm = ref<{filter: string}>({
  filter: ''
})
const saasClientsFiltered = computed(() => {
  if (!filterForm.value.filter) return saasClients.value
  return saasClients.value.filter((saasClient: ISaasClient) => {
    const key = filterForm.value.filter.toLowerCase().split(' ')
    const contactName = saasClient.contact_name?.toLowerCase()
    const companyName = saasClient.company_name?.toLowerCase()
    const email = saasClient.email?.toLowerCase()
    const phone = saasClient.phone?.toLowerCase()
      .replace('.', '')
      .replace(' ', '')
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
    let encontrado = false
    key.forEach((keyParte) => {
      if (companyName?.includes(keyParte) ||
        contactName?.includes(keyParte) ||
        email?.includes(keyParte) ||
        phone?.includes(keyParte)) encontrado = true
    })
    return encontrado
  })
})
const $q = useQuasar()
const columns = ref([
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'auditoria', align: 'center', label: 'Auditoria', field: 'auditoria', sortable: false },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])
const selected = ref([])
const saasClients = ref<ISaasClient[]>([])

// BOTÃO DE VISUALIZAR
const openDialogView = ref(false)
const saasClientView = ref<ISaasClient|null>()

// BOTÃO DE EDITAR E NOVO
const openDialogForm = ref(false)
const saasClientForEdit = ref<ISaasClient|null>()

const methods = {
  onView (saasClient: ISaasClient) {
    saasClientView.value = saasClient
    this.toogleDialogView()
  },
  toogleDialogView (): void {
    openDialogView.value = !openDialogView.value
  },
  onEdit (saasClient: ISaasClient) {
    saasClientForEdit.value = { ...saasClient } as ISaasClient
    this.toogleDialogForm()
  },
  toogleDialogForm (reset = false): void {
    if (reset) saasClientForEdit.value = {}
    openDialogForm.value = !openDialogForm.value
  },
  onDelete (saasClient: ISaasClient) {
    $q.dialog({
      title: 'Atenção!',
      message: `Deseja realmente excluir o cliente saas ${saasClient.name}?`,
      cancel: true,
      persistent: true
    }).onOk(() => {
      $stores.saasClients.delete(saasClient.id as number).then(() => {
        $notify.success('Cliente SaaS excluido com sucesso!')
      })
    })
  },
  listAdmins () {
    $stores.saasClients.listAll().then((data: ISaasClient[]) => {
      saasClients.value = data
    })
  },
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

onBeforeMount(() => {
  methods.listAdmins()
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
