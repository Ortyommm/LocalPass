<template>
  <div id="app" class="container-fluid">
    <script type="application/javascript" defer src="src/renderer/assets/js/popper.min.js"></script>
    <script type="application/javascript" defer src="src/renderer/assets/js/bootstrap.min.js"></script>

    <Transition mode="out-in" name="slide-up">
      <!-- <keep-alive> -->
      <RouterView />
      <!-- </keep-alive> -->
    </Transition>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ImageParsing',
  components: {}
})
</script>

<style lang="scss">

</style>
