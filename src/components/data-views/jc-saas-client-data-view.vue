<template>
  <div class="ctn-jc-data-view row reverse  jc-data-view">
    <!-- COLUNA DE INFOS -->
    <div class="col-md-8 col-12 q-pl-none q-pl-md-md">
      <q-list>

        <!-- INFO NOME DA EMPRESA -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="arcticons:google-my-business" /></q-item-section>
          <q-item-section class="q-pa-none">
            <q-item-label class="text-caption text-weight-light">Nome da empresa:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.company_name}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO NOME DO CONTATO -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="fluent:person-accounts-20-regular" /></q-item-section>
          <q-item-section class="q-pa-none">
            <q-item-label class="text-caption text-weight-light">Nome do contato:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.contact_name}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO EMAIL -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="iconamoon:email-thin" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Email:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.email}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO CELULAR -->
        <q-item class="q-pa-sm q-pa-md-xs">
          <q-item-section avatar><icon icon="et:phone" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Celular:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.phone}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- COLUNA DE FOTO, STATUS E AUDITORIA -->
    <div class="col-md-4 col-12 q-pa-none q-pt-md q-pa-sm-none">
      <q-list bordered >
        <!-- INFO LOGO -->
        <q-item class="q-pa-none">
          <q-item-section v-if="row.url_logo && row.url_logo!=='' && typeof row.url_logo==='string'">
            <q-img :src="row.url_logo" fit="contain" style="max-height: 200px;" />
          </q-item-section>
          <q-item-section v-else class="text-body text-grey-6 text-center">
            <q-item-label>Nenhuma <strong>logo</strong> cadastrada ainda</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO STATUS -->
        <q-item :style="{color:(row.status?'green':'gray')}">
          <q-item-section avatar><q-icon :name="row.status?'toggle_on':'toggle_off'" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Status:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.status?'Ativo':'Inativo'}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO AUDITORIA - CRIADO EM -->
        <q-item>
          <q-item-section avatar><icon icon="ph:calendar-plus-light" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Criado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.created_at}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- INFO AUDITORIA - ATUALIZADO EM -->
        <q-item>
          <q-item-section avatar><icon icon="material-symbols-light:edit-calendar-outline" /></q-item-section>
          <q-item-section>
            <q-item-label class="text-caption text-weight-light">Atualizado em:</q-item-label>
            <q-item-label class="text-body2 text-weight-medium">{{row.updated_at}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, watchEffect } from 'vue'
import type { ISaasClient } from '@/interfaces'

// CONSTANTES ---------------------------------------------------
const props = withDefaults(defineProps<{ row: ISaasClient }>(), {})
const emit = defineEmits<{(e: 'update:row', row: ISaasClient): void}>()
const row = ref<ISaasClient>(props.row)

// WATCHS ---------------------------------------------------
watchEffect(() => {
  emit('update:row', row.value)
})

// METODOS ---------------------------------------------------
// const methods = {}
</script>

<style lang="scss" scoped>
.ctn-jc-data-view {

}
</style>
