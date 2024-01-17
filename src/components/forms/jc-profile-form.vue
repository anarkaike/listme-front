<template>
  <div class="jc-profile-form row jc-form">
    <div class="col-grow q-pr-md-md q-px-xs q-mb-lg col-md-3" v-if="row.url_photo && row.url_photo!=='' && typeof row.url_photo==='string'">
      <q-img :src="row.url_photo" style="max-height: 200px;" fit="contain" />
    </div>

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="profile" label="Perfil" />
      <q-tab name="permissions" label="Permissões" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="profile">

        <!-- FORMULÁRIO PERFIL -->

        <q-form class="col-grow" ref="myForm" @submit.prevent="methods.save" :class="{ 'col-md-9':row.url_photo && row.url_photo!=='' }">
          <div class="row">

            <!-- CAMPO NAME -->
            <div class="col-12">
              <q-input
                filled
                v-model="row.name"
                label="Nome"
                lazy-rules
                dense
                :rules="[ val => val && val.length > 0 || 'Digite o nome']"
              >
                <template #prepend>
                  <q-icon name="badge" />
                </template>
              </q-input>
            </div>

            <!-- CAMPO DESCRIÇÃO COM EDITOR -->
            <div class="col-12">
              <q-editor ref="editorRef"
                        v-model="row.description"
                        :dense="$q.screen.lt.md"
                        :toolbar="[
              [
                'bold',
                'italic',
                'strike',
                'underline',
                'subscript',
                'superscript',
                'removeFormat'
              ],
              [
                'token',
                'hr',
                'link',
                'custom_btn',
                'quote'
              ],
              [
                'unordered',
                'ordered',
                'outdent',
                'indent',
                {
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  options: ['left', 'center', 'right', 'justify']
                }
              ],
              [
                {
                  icon: $q.iconSet.editor.formatting,
                  fixedLabel: true,
                  options: [
                    'p',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'code'
                  ]
                },
                {
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7'
                  ]
                },
                {
                  icon: $q.iconSet.editor.font,
                  fixedLabel: true,
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana'
                  ]
                }
              ],
              [
                'undo',
                'redo'
              ],
              ['print', 'fullscreen']
              // ['viewsource']
            ]"
                        :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana'
            }"
              />
            </div>

          </div>

          <!-- BOTÕES SALVAR E CANCELAR -->
          <div class="row q-mt-lg sticky-buttons">
            <q-space class="col-auto" />
            <q-btn label="Cancelar" @click="methods.cancel" color="primary" flat class="q-mr-sm" />
            <q-btn :label="row.id?'Atualizar':'Cadastrar'" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-tab-panel>

      <q-tab-panel name="permissions">

        <!-- FORMULÁRIO ADD/REM PERMISSÕES -->
        <div v-if="row && permissions.length > 0">
          <span v-for="(permission, kPermission) in permissions" :key="permission.id">
              <div v-if="kPermission===0 || permissions[kPermission-1].model!==permission.model" class="q-mt-md">
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

      </q-tab-panel>
    </q-tab-panels>

  </div>
</template>

<script lang="ts" setup>
import { IPermission } from '@/interfaces'
import { defineProps, withDefaults, Ref, ref, watchEffect, onBeforeMount } from 'vue'
import { QForm } from 'quasar'
import type { IProfile } from '@/interfaces'
import { $stores } from '@/stores/all'
import { EModelsLabels, EPermissionsLabels } from '@/enums'

// CONSTANTES ---------------------------------------------------
const toEModelsLabels = EModelsLabels
const toEPermissionsLabels = EPermissionsLabels
const myForm = ref<QForm|null>(null)
const props = withDefaults(defineProps<{ row?: IProfile|null }>(), {})
const row: Ref<IProfile> = ref<IProfile>(props.row ?? { name: '', description: '' } as IProfile)
const tab = ref('profile')
const editorRef = ref(null)
const permissions: Ref<IPermission[]> = ref([])
const emit = defineEmits([
  'on-cancel',
  'on-submit',
  'on-create',
  'on-update',
  'close-dialog'
])

watchEffect(() => {
  if (typeof row.value.description === 'undefined') {
    row.value.description = ''
  }
})

// METODOS ------------------------------------------------------
const methods = {
  save () {
    const method = row.value.id ? 'update' : 'create'
    $stores.profiles[method](row.value).then((value: IProfile) => {
      emit('on-submit', value)
      emit(row.value.id ? 'on-update' : 'on-create', value)
      methods.closeDialog()
    })
  },
  cancel () {
    row.value = {} as IProfile
    emit('on-cancel')
  },
  closeDialog () {
    row.value = {} as IProfile
    emit('close-dialog')
  },
  getPermissionsByProfileId (profileId: number) {
    $stores.permissions.listByProfile(profileId).then((res: IPermission[]) => {
      permissions.value = res
    })
  }
}
onBeforeMount(() => {
  methods.getPermissionsByProfileId(row.value.id as number)
})
</script>

<style lang="scss" scoped>
</style>
