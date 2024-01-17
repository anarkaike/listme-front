<template>
  <div view="lHh Lpr lFf">
    <div class="box-title no-bg">
      <div class="q-pt-md" style="font-weight: lighter; font-size: 15px;">Bem vindo ao Sistema</div>
      <div style="font-weight: bold; font-size: 20px;">{{$stores.auth.saas_client?.company_name}}</div>
    </div>
    <q-page style="min-height: auto;">
      <!-- FORMULARIO DE LOGIN -->
      <q-form class="row justify-center" @submit.prevent="methods.login">
        <div class="col-11 q-gutter-y-sm">
          <!-- CAMPO EMAIL -->
          <q-input
            label="Email"
            v-model="form.email"
            filled
            autofocus
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Digite seu email',
              val => (/^[A-Za-z0-9+_.-]+@([A-Za-z0-9+_-])+\.([A-Za-z0-9+_-])+$/.test(val)) || 'Email digitado é inválido!'
            ]"
            type="email"
          >
            <template #prepend>
              <q-icon name="alternate_email" />
            </template>
          </q-input>

          <!-- CAMPO SENHA -->
          <q-input
            label="Senha"
            v-model="form.password"
            filled
            lazy-rules
            :type="pwsVisible ? 'text' : 'password'"
            :rules="[
              (val) => (val.length !== 0) || 'Digite sua senha',
              (val) => (val.length >= 6) || 'Digite pelo menos 6 caracter!'
            ]"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-icon
                :name="pwsVisible ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="pwsVisible = !pwsVisible"
              />
            </template>
          </q-input>

          <!-- CAMPO ENTRAR -->
          <div class="full-width">
            <q-btn
              label="Entrar"
              color="primary"
              class="full-width"
              primary
              unelevated
              type="submit"
            />
          </div>

          <!-- BOTÃO IR PARA REGISTRO -->
          <div class="full-width q-gutter-y-sm q-py-lg">
            <q-btn
              label="Criar nova conta"
              color="secondary"
              class="full-width"
              flat
              icon="add"
              to="/register"
              size="md"
              @click="methods.toRegister"
            />
            <q-btn
              label="Recuperar minha senha"
              color="secondary"
              class="full-width"
              icon="lock_reset"
              flat
              :to="{ name: 'forgot-password'}"
              size="md"
              style="display: none;"
            />
          </div>
        </div>
      </q-form>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { $stores } from '@/stores/all'
import { useRouter } from 'vue-router'
import { colors } from 'quasar'

const { hexToRgb } = colors

const router = useRouter()
const { isFullscreen, enter } = useFullscreen()
const pwsVisible = ref(false)
const form = ref({ email: 'anarkaike@gmail.com', password: '123456' })

const methods = {
  toRegister () {
    if (!isFullscreen.value) {
      enter()
    }
  },
  async login () {
    $stores.auth.login(form.value.email, form.value.password, router)
  }
}

onBeforeMount(() => {
  $stores.auth.getSaasClientByDomain()
})
</script>
