<template>
  <li class="nav-item">
    <a @click.prevent="onTabClick" href="#" :class="isActive ? 'active nav-link ' : 'nav-link' "><slot /></a>
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
    onTabClick () {
      // e.preventDefault();
      this.$emit('tabClick', this.index)
    }
  }
}
</script>

<style scoped></style>
