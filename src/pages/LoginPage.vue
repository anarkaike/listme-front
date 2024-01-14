<template>
  <div class="box-title no-bg">Acesse o Sistema</div>
  <q-page style="min-height: auto;" view="lHh Lpr lFf">
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <div class="col-11 q-gutter-y-sm">
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
        <div class="full-width q-gutter-y-sm q-py-lg">
          <q-btn
            label="Criar nova conta"
            color="secondary"
            class="full-width"
            flat
            icon="add"
            to="/register"
            size="md"
            @click="handlerOpenRegister"
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { authStore } from '@/stores/auth-store'
import useLoading from '@/composables/useLoading'

const { showLoading, hideLoading } = useLoading()
const router = useRouter()
const { isFullscreen, enter } = useFullscreen()
const loading = ref<boolean>(false)
const pwsVisible = ref(false)
const form = ref({
  email: 'anarkaike@gmail.com',
  password: '123456'
})

const handlerOpenRegister = () => {
  if (!isFullscreen.value) {
    enter()
  }
}

const handleLogin = async () => {
  showLoading('Entrando...')
  authStore().login(form.value.email, form.value.password).then(() => {
    hideLoading()
    router.push({ name: 'me' })
  })
}
</script>
