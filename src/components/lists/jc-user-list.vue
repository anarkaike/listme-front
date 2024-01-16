<template>
  <JcGenericList
    :singular-label="props.singularLabel"
    :plural-label="props.pluralLabel"
    :data-view-component="JcUserDataView"
    :form-component="JcUserForm"
    :filter-by-columns="['name']"
    :stores="$stores.users"
    :columns="columns"
    :filterData="props.filterData"
    :filterProfilesOptions="props.filterProfilesOptions"
    :title="props.title"
    :styleStatusForColumn="methods.styleStatusForColumn"
  >

    <!-- COLUNA NOME -->
    <template #columns="scope">

      <!-- TEMPLATE COLUNA NAME -->
      <q-td key="name" :props="scope.props" @click="scope.onView(scope.props.row)" style="cursor: pointer;">
        <strong>
          {{ scope.props.row.name }}
          <q-chip outline :style="[methods.styleStatusForChip(scope.props.row.status)]" class="chip-status q-ml-xs" dense>
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
import { defineProps, ref, withDefaults } from 'vue'
import {
  JcUserDataView,
  JcUserForm,
  JcGenericList
} from '@/components'
import { $stores } from '@/stores/all'
import { EUserStatusLabels, EUserStatusValues } from '@/enums'
import type { IModel, IOption } from '@/interfaces'

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
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'profiles', align: 'left', label: 'Perfis', field: 'profiles', sortable: false },
  { name: 'auditoria', align: 'center', label: 'Auditoria', field: 'auditoria', sortable: false },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])

const methods = {
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
