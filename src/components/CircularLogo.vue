<template>
  <div class="ctn-circular-logo" @click="router.push({ name: 'home' })">
    <q-img
      :src="$stores.auth.$state?.saas_client?.url_logo??'./imgs/logo-listme.png'"
      spinner-color="white"
      style="border-radius: 24%;"
    />
  </div>
</template>
<script lang="ts" setup>
import { $stores } from '@/stores/all'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<style lang="scss" scoped>
  .ctn-circular-logo {
    background-color: #FFF;
    background-image: url('imgs/fundo-circular-colorido.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    height: 100px;
    width: 100px;
    border: 3px solid var(--q-primary);
    border-radius: 100%;
    /*padding: 20px 10px 10px 10px;*/
    padding: 10px;
    cursor: pointer;

    position: absolute;
    left: 50%;
    margin-left: -50px;
    top: -15px;
    transition: all 0.1s linear;
    box-shadow: 0px -10px 10px rgba(0, 0, 0, 0.5);

    &:hover {
      width: 120px;
      height: 120px;
      margin-left: -60px;
      padding: 8px 13px 10px 10px;
      opacity: 0.9;
      top: 3px;
      box-shadow: 0px -10px 50px rgba(0, 0, 0, 0.5);
    }
  }
</style>
