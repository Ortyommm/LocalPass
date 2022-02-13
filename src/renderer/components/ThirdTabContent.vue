<template>
  <div class="mt-2">
    <Portal to="modal">
      <PinEditModal
        v-if="showPinEditModal"
        @closeModal="showPinEditModal = false"
      />
    </Portal>
    <div
      v-if="successText"
      class="alert alert-success d-flex align-items-center mt-1"
      style="left: 50%; transform: translateX(-50%)"
      id="successOptions"
      role="alert"
    >
      <i class="bi bi-check me-2"></i>
      <div>
        {{ successText }}
        <!--Success text-->
      </div>
    </div>
    <h2>Пароли:</h2>
    <div class="mt-3 justify-content-between row">
      <div class="col-12">
        <button class="btn btn-primary" @click="createBackup">
          Создать резервную копию
        </button>
        <!--<button class="btn btn-secondary col-5" id="openBackupBtn">Открыть резервную копию</button>-->
      </div>
      <div class="col-12 mt-2">
        <button class="btn btn-danger" @click="showPinEditModal = true">
          Изменить пароль приложения
        </button>
      </div>
<!--      <hr class="mt-4" />-->
<!--      <h2>Внешний вид:</h2>-->
<!--      <div class="col-12 mt-2">-->
<!--        <button class="btn btn-primary" @click="changeTheme">-->
<!--          Поменять тему-->
<!--        </button>-->
<!--      </div>-->
    </div>
    <!--  <input class="form-control visually-hidden" type="file" id="openBackupInput" accept=".zip">-->
  </div>
</template>

<script>
import saveBackupOnDesktop from 'src/renderer/utils/saveBackupOnDesktop'
import PinEditModal from 'src/renderer/components/PinEditModal'
import { Portal } from 'portal-vue'

export default {
  name: 'ThirdTabContent',
  components: { PinEditModal, Portal },
  data() {
    return {
      successText: '',
      showPinEditModal: false,
    }
  },
  methods: {
    setSuccess(text) {
      this.errorText = ''
      this.successText = text
      clearTimeout(this.lastSuccessTimeout)
      this.lastSuccessTimeout = setTimeout(() => {
        this.successText = ''
      }, 2000)
    },
    createBackup() {
      saveBackupOnDesktop().then(() => {
        this.setSuccess('Резервная копия успешно сохранена на рабочий стол')
      })
    },
    changeTheme() {
    },
  },
}
</script>

<style scoped></style>
