<template>

  <!-- TABELA PARA LISTAGEM DE ADMINSTRADORES -->
  <q-table
    class="my-sticky-last-column-table"
    flat bordered
    :rows="usersFiltered"
    compact
    :columns="columns"
    row-key="name"
    v-model:selected="selected"
  >
<!--    selection="multiple"-->
<!--    :selected-rows-label="methods.getSelectedString"-->

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
            {{ props.row.name }}
            <q-chip outline :style="[methods.styleStatusForChip(props.row.status)]" class="chip-status q-ml-xs" dense>
              {{toEUserStatusLabels[props.row.status]}}
            </q-chip>
          </strong>
          <div style="font-size: 10px;">
            {{ props.row.phone }}
          </div>
          <div style="font-size: 10px;">
            {{ props.row.email }}
          </div>
        </q-td>

        <!-- TEMPLATE COLUNA PROFILES -->
        <q-td auto-width key="profiles" :props="props" style="font-size: 10px;" @click="methods.onView(props.row)">
            <div v-if="props.row.profiles && props.row.profiles.length > 0">
              <div v-for="profile in props.row.profiles" :key="profile.id">
                <q-chip outline class="chip-status q-ml-xs" dense>
                  {{profile.name}}
                </q-chip>
              </div>
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
    <template #title>{{ userView.name }}</template>
    <JcUserDataView v-model:data="userView" />
  </JcDialog>
  <!-- DIALOG USER EDIT/NEW -->
  <JcDialog v-model:openDialog="openDialogForm" disable-btn-close @close="userForEdit={}">
    <template #title>{{userForEdit?.id?'Editando Administrador':'Cadastrando Administrador'}}</template>
    <JcUserForm v-model:user="userForEdit" @on-cancel="methods.toogleDialogForm" @close-dialog="methods.toogleDialogForm" class="q-ma-sm q-ma-md-none" />
  </JcDialog>
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { ref, onBeforeMount, computed } from 'vue'
import type { IUser } from '@/interfaces'
import {
  JcGroupBtnForTables,
  JcAudit,
  JcUserDataView,
  JcDialog,
  JcUserForm
} from '@/components'
import { $stores } from '@/stores/all'
import { $notify } from '@/composables'
import { EUserStatusLabels, EUserStatusValues } from '@/enums'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const toEUserStatusLabels = EUserStatusLabels
const filterForm = ref<{filter: string}>({
  filter: ''
})
const usersFiltered = computed(() => {
  if (!filterForm.value.filter) return users.value
  return users.value.filter((user: IUser) => {
    const key = filterForm.value.filter.toLowerCase().split(' ')
    const name = user.name?.toLowerCase()
    const email = user.email?.toLowerCase()
    const phone = user.phone?.toLowerCase()
      .replace('.', '')
      .replace(' ', '')
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
    let encontrado = false
    key.forEach((keyParte) => {
      if (name?.includes(keyParte) ||
        email?.includes(keyParte) ||
        phone?.includes(keyParte)) encontrado = true
    })
    return encontrado
  })
})
const $q = useQuasar()
const columns = ref([
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'profiles', align: 'left', label: 'Perfis', field: 'profiles', sortable: false },
  { name: 'auditoria', align: 'center', label: 'Auditoria', field: 'auditoria', sortable: false },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])
const selected = ref([])
const users = ref<IUser[]>([])

// BOTÃO DE VISUALIZAR
const openDialogView = ref(false)
const userView = ref<IUser|null>()

// BOTÃO DE EDITAR E NOVO
const openDialogForm = ref(false)
const userForEdit = ref<IUser|null>()

const methods = {
  onView (user: IUser) {
    userView.value = user
    router.replace({ name: 'admin', query: { ...route.query, action: 'view', id: user?.id } }).then(() => {
      this.toogleDialogView()
    })
  },
  toogleDialogView (): void {
    openDialogView.value = !openDialogView.value
  },
  onEdit (user: IUser) {
    userForEdit.value = { ...user } as IUser
    router.replace({ name: 'admin', query: { ...route.query, action: 'edit', id: user?.id } }).then(() => {
      this.toogleDialogForm()
    })
  },
  toogleDialogForm (reset = false): void {
    if (reset) userForEdit.value = {}
    openDialogForm.value = !openDialogForm.value
  },
  onDelete (user: IUser) {
    $q.dialog({
      title: 'Atenção!',
      message: `Deseja realmente excluir o usuário ${user.name}?`,
      cancel: true,
      persistent: true
    }).onOk(() => {
      $stores.users.delete(user.id as number).then(() => {
        $notify.success('Usuário excluido com sucesso!')
      })
    })
  },
  listAdmins () {
    $stores.users.listAll().then((data: IUser[]) => {
      users.value = data
      // users.value = data.filter(user => {
      //   return (user.profile_ids && (
      //     user.profile_ids.includes(1) ||
      //     user.profile_ids.includes(4) ||
      //     user.profile_ids.includes(5) ||
      //     user.profile_ids.includes(6)))
      // })
    })
  },
  styleStatusForColumn (status: EUserStatusValues): string {
    switch (status) {
      case EUserStatusValues.active:
        return 'color: green; background-color: #f8fcf4; background: linear-gradient(150deg, #f8fcf4 20%, #FFF 100%);'
      case EUserStatusValues.inactive:
        return 'color: gray; background-color: #f4f4f4; background: linear-gradient(150deg, #f4f4f4 20%, #FFF 100%)'
      case EUserStatusValues.blocked:
        return 'color: red; background-color: #f9f2f2; background: linear-gradient(150deg, #f9f2f2 20%, #FFF 100%)'
    }
    return ''
  },
  styleStatusForChip (status: EUserStatusValues): string {
    switch (status) {
      case EUserStatusValues.active:
        return 'border-color: green; color: green; background-color: #bcff7a !important;'
      case EUserStatusValues.inactive:
        return 'border-color: gray; color: gray; background-color: #e0e0e0 !important;'
      case EUserStatusValues.blocked:
        return 'border-color: red; color: red; background-color: #ffc6c6 !important;'
    }
    return ''
  }
}

onBeforeMount(() => {
  methods.listAdmins()
  if (route.query?.id) {
    $stores.users.getById(route.query?.id as unknown as number).then((user: IUser) => {
      const action = route.query?.action ? 'onEdit' : 'onView'
      methods[action](user)
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
