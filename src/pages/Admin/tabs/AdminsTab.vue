<template>
  <!-- TABELA PARA LISTAGEM DE ADMINSTRADORES -->
  <q-table
    class="my-sticky-last-column-table"
    flat bordered
    :rows="users"
    compact
    :columns="columns"
    row-key="name"
    v-model:selected="selected"
  >
<!--    selection="multiple"-->
<!--    :selected-rows-label="methods.getSelectedString"-->

    <template #top>
      <div class="fit row wrap justify-between items-start content-start">
        <div class="text-h6">Admins</div>
        <div>
          <q-btn unelevated dense color="primary" class="q-px-md" @click="methods.toogleDialogForm(true)">
            Novo Admin
          </q-btn>
        </div>
      </div>
    </template>
    <!-- TEMPLATE PARA SLOT DE BODY DA TABELA -->
    <template v-slot:body="props">
      <q-tr :props="props">
        <!-- TEMPLATE COLUNA CHECK -->
        <q-td auto-width style="display: none;">
          <q-checkbox :name="`admin_${props.row.id}`" :toggle-indeterminate="false" v-model="props.selected" />
        </q-td>

        <!-- TEMPLATE COLUNA NAME -->
        <q-td key="name" :props="props" @click="methods.onView(props.row)" style="cursor: pointer;">
          {{ props.row.name }}
          <div style="font-size: 0.8em; color: #666;">{{ props.row.email }}</div>
          <div style="font-size: 0.8em; color: #666;">{{ props.row.phone }}</div>
        </q-td>

        <!-- TEMPLATE COLUNA STATUS -->
        <q-td key="status" :props="props" auto-width style="text-align: center;cursor: pointer;">
          <JcBtnToogle v-model:status="props.row.status" activeValue="active" inactiveValue="inactive" />
        </q-td>

        <!-- TEMPLATE COLUNA AUDTORIA -->
        <q-td key="auditoria" :props="props" style="font-size: 10px;">
          <JcAudit :row="props.row" />
        </q-td>

        <!-- TEMPLATE COLUNA ACTIONS -->
        <q-td key="actions" :props="props" auto-width>
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
  <JcDialog v-model:openDialog="openDialogView" :tags-title="tagsProfileUserView">
    <template #title>{{ userView.name }}</template>
    <JcUsersDataView :user="userView" />
  </JcDialog>
  <!-- DIALOG USER EDIT/NEW -->
  <JcDialog v-model:openDialog="openDialogForm" disable-btn-close @close="userForEdit={}">
    <template #title>{{userForEdit?.id?'Editando Administrador':'Cadastrando Administrador'}}</template>
    <JcUserForm :user="userForEdit" @on-cancel="methods.toogleDialogForm" @close-dialog="methods.toogleDialogForm" class="q-ma-sm q-ma-md-none" />
  </JcDialog>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
import type { IUser } from '@/interfaces'
import {
  JcGroupBtnForTables,
  JcAudit,
  JcBtnToogle,
  JcUsersDataView,
  JcDialog,
  JcUserForm
} from '@/components'
import { $stores } from '@/stores/all'

const columns = ref([
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: false },
  { name: 'auditoria', align: 'center', label: 'Auditoria', field: 'auditoria', sortable: false },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])
const selected = ref([])
const users = ref<IUser[]>([])

// BOTÃO DE VISUALIZAR
const openDialogView = ref(false)
// const auditRow = ref<object|null>({})
const userView = ref<IUser|null>()
const tagsProfileUserView = computed(() => {
  if (!userView.value || !userView.value.profiles) return []
  return userView.value.profiles.map(profile => ({ title: 'Perfil: ' + profile.name }))
})
// BOTÃO DE EDITAR E NOVO
const openDialogForm = ref(false)
const userForEdit = ref<IUser|null>()

const methods = {
  getSelectedString () {
    return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected `
  },
  onView (user: IUser) {
    userView.value = user
    this.toogleDialogView()
  },
  toogleDialogView (): void {
    openDialogView.value = !openDialogView.value
  },
  onEdit (user: IUser) {
    userForEdit.value = user
    this.toogleDialogForm()
  },
  toogleDialogForm (reset = false): void {
    if (reset) userForEdit.value = {}
    openDialogForm.value = !openDialogForm.value
  },
  onDelete (user: IUser) {
    console.log('Junio: delete AdminTab', user)
  }
}

onBeforeMount(() => {
  $stores.users.listAll().then((data: IUser[]) => {
    users.value = data.filter(user => {
      return (user.profile_ids && (
        user.profile_ids.includes(1) ||
        user.profile_ids.includes(4) ||
        user.profile_ids.includes(5) ||
        user.profile_ids.includes(6)))
    })
  })
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

  thead tr:last-child th:last-child {    /* bg color is important for th; just specify one */
    background-color: var(--bg-transparent-4);
  }
  td:last-child {
    background-color: var(--bg-transparent-4);
  }
  th:last-child,
  td:last-child {
    position: sticky;
    right: 0;
    z-index: 1;
  }
}
</style>
