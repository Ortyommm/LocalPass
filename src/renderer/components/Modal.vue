<template>
  <div>
    <div
      class="modal fade show"
      tabindex="-1"
      style="display: block;"
      role="dialog"
      aria-labelledby="passModalLabel"
      aria-modal="true"
      @click="$emit('closeModal')"
    >
      <div class="modal-dialog" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ title }}
            </h5>
            <button
              class="btn-close"
              aria-label="Close"
              data-bs-dismiss="modal"
              type="button"
              @click="$emit('closeModal')"
            ></button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" ></div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: String,
  },
}
</script>

<style lang='scss' scoped>

  .modal-dialog {
    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
    @media (min-width: 992px) {
      max-width: 960px;
    }
    @media (min-width: 1200px) {
      max-width: 1140px;
    }
    @media (min-width: 1408px) {
    max-width: 1344px;
    }
  }

</style>
