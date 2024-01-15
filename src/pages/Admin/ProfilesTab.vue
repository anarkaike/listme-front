<template>
  <!-- TABELA PARA LISTAGEM DE PERFIS DE USUÁRIOS -->
  <q-table
    class="my-sticky-last-column-table"
    flat bordered
    :rows="profilesFiltered"
    compact
    :columns="columns"
    row-key="name"
    v-model:selected="selected"
  >
    <!--    selection="multiple"-->
    <!--    :selected-rows-label="methods.getSelectedString"-->

    <template v-slot:top>
      <div class="fit row wrap justify-between items-start content-start">
        <div class="text-h6 col-grow">Perfis de Usuários</div>
        <div style="min-width: 100px; margin-top: -3px;" class="q-pr-sm ctn-filter col-12 q-mb-sm col-md-5">
          <q-input dense name="busca" outlined label="Filtrar dados" type="text" v-model="filterForm.filter" class="q-mr-md"></q-input>
        </div>
        <div>
          <q-btn unelevated dense color="primary" class="q-px-md" @click="methods.toogleDialogForm(true)">
            Novo Perfil
          </q-btn>
        </div>
      </div>
    </template>
    <!-- TEMPLATE PARA SLOT DE BODY DA TABELA -->
    <template v-slot:body="props">
      <q-tr :props="props">
        <!-- TEMPLATE COLUNA CHECK -->
        <q-td style="display: none;">
          <q-checkbox :name="`admin_${props.row.id}`" :toggle-indeterminate="false" v-model="props.selected" />
        </q-td>

        <!-- TEMPLATE COLUNA NAME -->
        <q-td key="name" :props="props" @click="methods.onView(props.row)" style="cursor: pointer;">
          <strong>
            {{ props.row.name }}
          </strong>
          <div style="font-size: 10px;" v-html="props.row.description" />
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
    <template #title>{{ profileView.name }}</template>
    <JcProfileDataView v-model:data="profileView" />
  </JcDialog>
  <!-- DIALOG USER EDIT/NEW -->
  <JcDialog v-model:openDialog="openDialogForm" disable-btn-close @close="profileForEdit={}">
    <template #title>{{profileForEdit?.id?'Editando Perfil':'Cadastrando Perfil'}}</template>
    <JcProfileForm v-model:profile="profileForEdit" @on-cancel="methods.toogleDialogForm" @close-dialog="methods.toogleDialogForm" class="q-ma-sm q-ma-md-none" />
  </JcDialog>
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { ref, onBeforeMount, computed } from 'vue'
import type { IProfile } from '@/interfaces'
import {
  JcGroupBtnForTables,
  JcAudit,
  JcProfileDataView,
  JcDialog,
  JcProfileForm
} from '@/components'
import { $stores } from '@/stores/all'

const filterForm = ref<{filter: string}>({
  filter: ''
})
const profilesFiltered = computed(() => {
  if (!filterForm.value.filter) return profiles.value
  return profiles.value.filter((profile: IProfile) => {
    const key = filterForm.value.filter.toLowerCase().split(' ')
    const name = profile.name?.toLowerCase()
    const description = profile.description?.toLowerCase()
    let encontrado = false
    key.forEach((keyParte) => {
      if (name?.includes(keyParte) ||
        description?.includes(keyParte)) encontrado = true
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
const profiles = ref<IProfile[]>([])

// BOTÃO DE VISUALIZAR
const openDialogView = ref(false)
const profileView = ref<IProfile|null>()

// BOTÃO DE EDITAR E NOVO
const openDialogForm = ref(false)
const profileForEdit = ref<IProfile|null>()

const methods = {
  onView (profile: IProfile) {
    profileView.value = profile
    this.toogleDialogView()
  },
  toogleDialogView (): void {
    openDialogView.value = !openDialogView.value
  },
  onEdit (profile: IProfile) {
    profileForEdit.value = { ...profile } as IProfile
    this.toogleDialogForm()
  },
  toogleDialogForm (reset = false): void {
    if (reset) profileForEdit.value = { name: '', description: '' }
    openDialogForm.value = !openDialogForm.value
  },
  onDelete (profile: IProfile) {
    $q.dialog({
      title: 'Atenção!',
      message: `Deseja realmente excluir o perfil ${profile.name}?`,
      cancel: true,
      persistent: true
    }).onOk(() => {
      $stores.profiles.delete(profile.id as number)
    }).onOk(() => {
      // console.log('>>>> second OK catcher')
    }).onCancel(() => {
      // console.log('>>>> Cancel')
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
  },
  listProfiles () {
    $stores.profiles.listAll().then((data: IProfile[]) => { profiles.value = data })
  }
}

onBeforeMount(() => {
  methods.listProfiles()
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
