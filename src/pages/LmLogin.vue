<template>
  <div class="page-title no-bg">Acesse o Sistema</div>
  <q-page style="min-height: auto;">
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
          :rules="[
            (val) => (val.length !== 0) || 'Digite sua senha',
            (val) => (val.length >= 6) || 'Digite pelo menos 6 caracter!'
          ]"
        >
          <template #prepend>
            <q-icon name="lock" />
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
        <div class="full-width q-gutter-y-sm">
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
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import useNotify from '@/composables/useNotify'
import { useFullscreen } from '@vueuse/core'
// import { $api } from '../services/api'
import { authStore } from '@/stores/auth-store'

// import useAuthUser from 'src/composables/UseAuthUser'
// import apiAuth from 'src/composables/api/ApiAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isFullscreen, enter } = useFullscreen()
// const { isLoggedIn } = useAuthUser()
// const { login, isLoggedIn } = useAuthUser()
// const { listAll } = apiAuth()
// const { notifySuccess, notifyError } = useNotify()

const form = ref({
  email: 'anarkaike@gmail.com',
  password: '123456'
})

onMounted(() => {
  // console.log('process.env. ', process.env)
  // if (isLoggedIn) {
  // router.push({ name: 'me' })
  // }
})

const handlerOpenRegister = () => {
  if (!isFullscreen.value) {
    enter()
  }
}

const handleLogin = async () => {
  authStore().login(form.value.email, form.value.password).then(() => {
    router.push({ name: 'me' })
  })
}
</script>
