<template>
  <div id="app" class="container-fluid">
<!--    <script type="application/javascript" defer src="src/renderer/assets/js/popper.min.js"></script>-->
<!--    <script type="application/javascript" defer src="src/renderer/assets/js/bootstrap.min.js"></script>-->
<!--    <PortalTarget name="modal"></PortalTarget>-->
    <router-view v-slot="{ Component, route }">
      <transition name="slide-up" mode="out-in">
<!--          <suspense>-->
<!--            <template #default>-->
<!--        <keep-alive>-->
              <component
                :is="Component"
                :key="route.meta.usePathKey ? route.path : undefined"
              />
<!--        </keep-alive>-->
<!--            </template>-->
<!--            <template #fallback> Loading... </template>-->
<!--          </suspense>-->
      </transition>
    </router-view>
  </div>
</template>

<script>
// import {PortalTarget} from 'portal-vue'
// import Vue from 'vue'

export default {
  name: 'App',
  components: {}
}
</script>

<style lang="scss">

</style>
