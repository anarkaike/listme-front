<template>
  <JcGenericList
    :singular-label="props.singularLabel"
    :plural-label="props.pluralLabel"
    :data-view-component="JcUserDataView"
    :form-component="JcUserForm"
    :filter-by-columns="['name']"
    :stores="$stores.users"
    :rows="users"
    :columns="columns"
    :filterData="props.filterData"
    :filterProfilesOptions="props.filterProfilesOptions"
    :title="props.title"
    :styleStatusForColumn="$stylesByStatusOfUser.background"
    @onUpdate="methods.onUpdate"
    @onCreate="methods.onCreate"
    @onDelete="methods.onDelete"
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
      <q-td key="name" :props="scope.props" @click="scope.onView(scope.props.row)" style="cursor: pointer;">
        <strong>
          {{ scope.props.row.name }}
          <q-chip outline :style="[$stylesByStatusOfUser.chip(scope.props.row.status)]" class="chip-status q-ml-xs" dense>
            {{toEUserStatusLabels[scope.props.row.status]}}
          </q-chip>
        </strong>
        <div style="font-size: 10px;">
          {{ scope.props.row.phone }}
        </div>
        <div style="font-size: 10px;">
          {{ scope.props.row.email }}
        </div>
      </q-td>

      <!-- TEMPLATE COLUNA PROFILES -->
      <q-td auto-width key="profiles" :props="scope.props" style="font-size: 10px;" @click="scope.onView(scope.props.row)">
        <div v-if="scope.props.row.profiles && scope.props.row.profiles.length > 0">
          <div v-for="profile in scope.props.row.profiles" :key="profile.id">
            <q-chip outline class="chip-status q-ml-xs" dense>
              {{profile.name}}
            </q-chip>
          </div>
        </div>
      </q-td>

    </template>
  </JcGenericList>
</template>
<script lang="ts" setup>
import { defineProps, ref, withDefaults, onBeforeMount } from 'vue'
import { $stores } from '@/stores/all'
import { IUser } from '@/interfaces'
import { JcUserDataView, JcUserForm, JcGenericList } from '@/components'
import { EUserStatusLabels } from '@/enums'
import type { IModel, IOption } from '@/interfaces'
import { $stylesByStatusOfUser } from '@/composables'

// PROPS ----------------------------------------
const props = withDefaults(defineProps<{
  title?: string,
  singularLabel?: string,
  pluralLabel?: string,
  filterData?:(rows: IModel[]) => IModel[]
  filterProfilesOptions?:(options: IOption[]) => IOption[]
}>(), {
  singularLabel: 'Usuário',
  pluralLabel: 'Usuários',
  title: 'Listagem de registros',
  filterData: (rows: IModel[]) => rows,
  filterProfilesOptions: (options: IOption[]) => options
})
const toEUserStatusLabels = EUserStatusLabels
const columns = ref([
  { name: 'photo', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'profiles', align: 'left', label: 'Perfis', field: 'profiles', sortable: false },
  { name: 'auditoria', align: 'center', label: 'Auditoria', field: 'auditoria', sortable: false },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])

const users = ref<IUser[]>([])

const methods = {
  list () {
    $stores.users.listAll().then((res: IUser[]) => { users.value = res as IUser[] })
  },
  onDelete (event: IUser) {
    users.value.splice(users.value.findIndex((r: IUser) => r.id === event.id), 1)
  },
  onUpdate (event: IUser) {
    users.value[users.value.findIndex((r: IUser) => r.id === event.id)] = event
  },
  onCreate (event: IUser) {
    users.value.unshift(event)
  }
}

onBeforeMount(() => {
  methods.list()
})
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
