<template>

  <!-- TABELA GENERICA -->
  <q-table
    class="my-sticky-last-column-table"
    flat bordered
    :rows="rowsFiltered"
    compact
    :columns="columns"
    row-key="id"
    v-model:selected="selected"
  >

    <!-- TITULO DA TABELA -->
    <template v-slot:top>
      <div class="fit row wrap justify-between items-start content-start">
        <div class="text-h6 col-grow">{{props.title ?? 'Listagem'}}</div>
        <div style="min-width: 100px; margin-top: -3px;" class="q-pr-sm ctn-filter col-12 q-mb-sm col-md-5">
          <q-input dense name="busca" outlined label="Filtrar dados" type="text" v-model="filterForm.filter" class="q-mr-md"></q-input>
        </div>
        <div>
          <q-btn unelevated dense color="primary" class="q-px-md" @click="methods.toogleDialogForm(true)">
            Novo Registro
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

        <slot :props="props" name="columns" :onView="methods.onView" :onEdit="methods.onEdit" :onDelete="methods.onDelete" />

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

    <!-- TEMPLATE SLOT SEM REGISTRO -->
    <template #no-data>
      <div style="padding-top: 20px; padding-bottom: 20px; text-align: center; width: 100%;">
        Nenhum registro contrado
      </div>
    </template>
  </q-table>

  <!-- DIALOG USER VIEW -->
  <JcDialog v-model:openDialog="openDialogView" v-if="props.dataViewComponent" @on-close="methods.onCloseDialogView">
    <template #title>Visualizando dados</template>
    <component :is="props.dataViewComponent" v-model:row="rowForView" />
  </JcDialog>

  <!-- DIALOG USER EDIT/NEW -->
  <JcDialog v-model:openDialog="openDialogForm" disable-btn-close @on-close="methods.onCloseDialogForm" v-if="props.formComponent">
    <template #title>{{rowForEdit?.id?'Editando Administrador':'Cadastrando Administrador'}}</template>
    <component :filterProfilesOptions="props.filterProfilesOptions" :is="props.formComponent" @on-create="methods.onCreate" v-model:row="rowForEdit" @on-cancel="methods.toogleDialogForm" @close-dialog="methods.toogleDialogForm" class="q-ma-sm q-ma-md-none" />
  </JcDialog>
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { ref, onBeforeMount, computed } from 'vue'
import type { IModel, IOption } from '@/interfaces'
import {
  JcGroupBtnForTables,
  JcAudit,
  JcDialog
} from '@/components'
import { $loading, $notify } from '@/composables'
import { useRoute, useRouter } from 'vue-router'
import { defineProps, withDefaults } from 'vue/dist/vue'

const route = useRoute()
const router = useRouter()
const filterForm = ref<{filter: string}>({
  filter: ''
})
const rowsFiltered = computed(() => {
  if (!filterForm.value.filter) return rows.value
  const key = filterForm.value.filter.toLowerCase().split(' ')
  return rows.value.filter((row) => {
    let encontrado = false
    props.filterByColumns.forEach((column) => {
      const value = row[column]?.toLowerCase()
      key.forEach((keyParte) => {
        if (value?.includes(keyParte)) encontrado = true
      })
    })
    return encontrado
  })
})
const $q = useQuasar()
const selected = ref([])
const rows = ref<IModel[]>([])

// BOTÃO DE VISUALIZAR
const openDialogView = ref(false)
const rowForView = ref<IModel|null>()

// BOTÃO DE EDITAR E NOVO
const openDialogForm = ref(false)
const rowForEdit = ref<IModel|null>()

const props = withDefaults(defineProps<{
  columns: [],
  filterByColumns?: [],
  stores?:null,
  dataViewComponent: null,
  formComponent: null,
  title: string,
  styleStatusForColumn?:(status: string) => string,
  filterData?:(rows: IModel[]) => IModel[]
  filterProfilesOptions?:(rows: IOption[]) => IOption[]
}>(), {
  styleStatusForColumn: () => '',
  filterData: (rows: IModel[]) => rows,
  filterProfilesOptions: (rows: IOption[]) => rows
})
const columns = ref(props.columns)

const methods = {
  onView (row: IModel) {
    rowForView.value = row
    router.replace({ query: { ...route.query, action: 'view', id: row?.id } }).then(() => {
      methods.toogleDialogView()
    })
  },
  toogleDialogView (): void {
    openDialogView.value = !openDialogView.value
  },
  onCloseDialogView () {
    rowForView.value = {}
    const query = route.query
    delete query.action
    delete query.id
    router.push({ query: query })
  },
  onEdit (row: IModel) {
    rowForEdit.value = { ...row } as IModel
    router.replace({ query: { ...route.query, action: 'edit', id: row?.id } }).then(() => {
      methods.toogleDialogForm()
    })
  },
  toogleDialogForm (reset = false): void {
    if (reset) rowForEdit.value = {}
    openDialogForm.value = !openDialogForm.value
  },
  onCloseDialogForm () {
    rowForEdit.value = {}
    const query = route.query
    delete query.action
    delete query.id
    router.push({ query: query })
  },
  onDelete (row: IModel) {
    $q.dialog({
      title: 'Atenção!',
      message: 'Deseja realmente excluir o registro?',
      cancel: true,
      persistent: true
    }).onOk(() => {
      props.stores.delete(row.id as number).then(() => {
        $notify.success('Registro excluido com sucesso!')
      })
    })
  },
  onCreate (row: IModel) {
    rows.value = [
      row,
      ...rows.value
    ]
  },
  list () {
    if (props.stores) {
      $loading.show('Buscando dados...')
      props.stores.listAll().then((data: IModel[]) => {
        $loading.hide()
        const r = props.filterData(data)
        rows.value = r
      })
    }
  },
  styleStatusForColumn (status: string) {
    if (props.styleStatusForColumn) {
      return props.styleStatusForColumn(status)
    }
  }
}

onBeforeMount(() => {
  methods.list()

  // Verificando se na URL existe parametro ID para carregar dialog de view/edit
  if (route.query?.id) {
    props.stores.getById(route.query?.id as unknown as number).then((row: IModel) => {
      const action = route.query?.action ? 'onEdit' : 'onView'
      methods[action](row)
    })
  }
})

// onMounted(() => {
// })
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