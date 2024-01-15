<template>
  <div class="ctn-jc-data-view row jc-data-view">
    <div class="col-md-4 col-12 q-pa-none q-pt-md q-pa-sm-none">
      <q-list bordered >

        <!-- INFO NOME -->
        <q-item class="q-pa-sm q-pa-md-md">
          <q-item-section class="q-pa-none">
            <q-item-label class="text-caption text-weight-light">Nome:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{data.name}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

        <!-- INFO DESCRIÇÃO -->
        <q-list>
          <q-item class="q-pa-sm q-pa-md-md">
            <q-item-section>
              <q-item-label class="text-caption text-weight-light">Descrição:</q-item-label>
              <q-item-label class="text-body2 text-weight-medium"><div v-html="data.description" /></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator />

        <!-- INFO CRIADO EM -->
        <q-item>
          <q-item-section avatar><q-icon name="post_add" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Criado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{humanizeDatetime(data.created_at)}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

        <!-- INFO ATUALIZADO EM -->
        <q-item>
          <q-item-section avatar><q-icon name="save_as" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Atualizado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{humanizeDatetime(data.updated_at)}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- INFO PERMISSÕES -->
    <div class="col-md-8 col-12 q-pl-none q-pl-md-md">
      <div class="text-h6 q-mb-sm">Permissões atribuídas a este perfil:</div>
      <div v-if="data">
        <span v-for="(permission, kPermission) in data.permissions" :key="permission.id">
            <div v-if="kPermission===0 || data.permissions[kPermission-1].model!==permission.model" class="q-mt-md">
              <strong>{{ toEModelsLabels[permission.name.split(':')[0]]??permission.name.split(':')[0] }}</strong> :
            </div>
            <q-chip>
              {{ toEPermissionsLabels[permission.name.split(':')[1]]??permission.name.split(':')[1] }}
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
import { useHumanize } from '@/composables'

// CONSTANTES ---------------------------------------------------
const { humanizeDatetime } = useHumanize()
const toEModelsLabels = EModelsLabels
const toEPermissionsLabels = EPermissionsLabels
const props = withDefaults(defineProps<{
  data: IProfile
}>(), {})
const data = ref<IProfile>(props.data)
const emit = defineEmits<{(e: 'update:data', data: IProfile): void}>()

// WATCHS ---------------------------------------------------
watchEffect(() => {
  emit('update:data', data.value)
})

// METODOS ---------------------------------------------------
// const methods = {}
</script>

<style lang="scss" scoped>
.ctn-jc-data-view {

}
</style>
