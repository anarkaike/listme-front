<template>
  <div class="ctn-jc-data-view row jc-data-view">
    <div class="col-md-4 col-12 q-pa-none q-pt-md q-pa-sm-none">
      <q-list bordered >
        <q-item class="q-pa-sm q-pa-md-md">
          <q-item-section class="q-pa-none">
            <q-item-label class="text-caption text-weight-light">Nome:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.name}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-list>
          <q-item class="q-pa-sm q-pa-md-md">
            <q-item-section>
              <q-item-label class="text-caption text-weight-light">Descrição:</q-item-label>
              <q-item-label class="text-body2 text-weight-medium">{{row.description}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator />
        <q-item>
          <q-item-section avatar><q-icon name="post_add" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Criado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.created_at}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section avatar><q-icon name="save_as" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Atualizado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.updated_at}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-md-8 col-12 q-pl-none q-pl-md-md">
      <div class="text-h6 q-mb-sm">Permissões atribuídas a este perfil:</div>
      <div v-if="row">
        <span v-for="(permission, kPermission) in row.permissions" :key="permission.id">
            <div v-if="kPermission===0 || row.permissions[kPermission-1].model!==permission.model" class="q-mt-md">
              <strong>{{ toEModelsLabels[permission.name.split(':')[0]] }}</strong> :
            </div>
            <q-chip>
              {{ toEPermissionsLabels[permission.name.split(':')[1]] }}
            </q-chip>
        </span>
      </div>
      <div v-else>
        Nenhuma permissão atribuída a este perfil
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, watchEffect } from 'vue'
import type { IProfile } from '@/interfaces'
import { EModelsLabels, EPermissionsLabels } from '@/enums'

// CONSTANTES ---------------------------------------------------
const toEModelsLabels = EModelsLabels
const toEPermissionsLabels = EPermissionsLabels
const props = withDefaults(defineProps<{ row: IProfile }>(), {})
const row = ref<IProfile>(props.row)
const emit = defineEmits<{(e: 'update:row', row: IProfile): void}>()

// WATCHS ---------------------------------------------------
watchEffect(() => {
  emit('update:row', row.value)
})
</script>

<style lang="scss" scoped>
.ctn-jc-data-view {

}
</style>
