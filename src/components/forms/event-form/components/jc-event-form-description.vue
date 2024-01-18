<template>
  <div class="jc-event-form-description">

    <q-form class="col-grow" ref="myForm" @submit.prevent="methods.next">
      <div class="row">
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

        <q-stepper-navigation class="col-12 row">
          <q-btn
            :fab-mini="$q.screen.xs || $q.screen.sm"
            :outline="$q.screen.xs || $q.screen.sm"
            :flat="$q.screen.md || $q.screen.lg || $q.screen.xl"
            @click="methods.cancel"
            color="primary"
            class="q-mr-sm col-auto"
          >
            <icon icon="ei:close-o" />
            <span class="only-desktop q-ml-xs">Cancelar</span>
          </q-btn>
          <q-btn
            :fab-mini="$q.screen.xs || $q.screen.sm"
            :outline="$q.screen.xs || $q.screen.sm"
            :flat="$q.screen.md || $q.screen.lg || $q.screen.xl"
            @click="methods.prev"
            color="primary"
            class="q-mr-sm col-auto"
          >
            <icon icon="ep:top" />
            <span class="only-desktop q-ml-xs">Voltar</span>
          </q-btn>
          <q-btn
            :fab-mini="$q.screen.xs || $q.screen.sm"
            :outline="$q.screen.xs || $q.screen.sm"
            :flat="$q.screen.md || $q.screen.lg || $q.screen.xl"
            @click="methods.save"
            class="q-mr-sm col-auto"
            color="primary"
          >
            <icon icon="material-symbols-light:save-outline" />
            <span class="only-desktop q-ml-xs">Salvar</span>
          </q-btn>
          <q-space class="col-grow" />
          <q-btn @click="methods.next" color="primary" class="q-ml-sm col-auto" >
            Próximo
            <icon icon="ep:bottom" class="q-ml-sm" />
          </q-btn>
        </q-stepper-navigation>
      </div>
    </q-form>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, Ref, watchEffect, withDefaults } from 'vue'
import { IEvent } from '@/interfaces'

const props = withDefaults(defineProps<{
  row: IEvent
}>(), {

})
const row: Ref<IEvent> = ref<IEvent>(props.row)
const emit = defineEmits([
  'update:row',
  'on-cancel',
  'on-save',
  'on-prev',
  'on-next'
])

watchEffect(() => {
  if (typeof row.value.description === 'undefined') {
    row.value.description = ''
  }
})

watchEffect(() => {
  row.value = props.row
})
const methods = {
  next () {
    emit('on-next')
  },
  prev () {
    emit('on-prev')
  },
  save () {
    emit('on-save')
  },
  cancel () {
    emit('on-cancel')
  }
}
</script>
<style lang="scss" scoped>

</style>
