<template>
  <li class="nav-item">
    <a @click="onTabClick" href="#" :class="isActive ? 'active nav-link ' : 'nav-link' "><slot /></a>
  </li>
</template>

<script >
export default {
  name: 'Tab',
  props: {
    index: Number,
    isActive: Boolean,
  },
  methods: {
    onTabClick ( e ) {
      e.preventDefault();
      //@ts-ignore
      this.$emit('click', this.index)
    }
  }
}
</script>

<style scoped></style>
