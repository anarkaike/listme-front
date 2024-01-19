<template>
  <div class="ctn-circular-logo">
    <q-img
      :src="$stores.auth.$state?.saas_client?.url_logo??'./imgs/logo-listme.png'"
      spinner-color="white"
      style="border-radius: 24%;"
    />
  </div>
</template>
<script lang="ts" setup>
import { $stores } from '@/stores/all'
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
  }
</style>
