<template>
    <Modal :title="password.passName" @closeModal="$emit('closeModal')">
      <p>
        {{$t('deleteModal.message')}}
        <strong>{{ password.passName }}</strong
        >?
      </p>
      <button
        type="button"
        class="btn btn-danger"
        @click="$emit('deleteConfirm', password)"
      >
        {{ $t('deleteModal.delete') }}
      </button>
    </Modal>
</template>

<script>
import Modal from 'src/renderer/components/Modal'
export default {
  name: 'DeleteModal',
  components: { Modal },
  props: {
    password: Object,
  },
}
</script>

<style scoped></style>
