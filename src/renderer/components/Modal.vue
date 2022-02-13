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
              @click="$emit('closeModal')"
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
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

<style scoped></style>
