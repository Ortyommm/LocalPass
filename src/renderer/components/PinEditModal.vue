<template>
  <Modal :title="$t('changeAppPasswordModal.title')" @closeModal="$emit('closeModal')">
    <div
      v-if="errorText"
      class="alert alert-danger d-flex align-items-center"
      role="alert"
    >
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <div>{{ errorText }}</div>
    </div>
    <div
      v-if="successText"
      class="alert alert-success d-flex align-items-center mt-1"
      style="left: 50%; transform: translateX(-50%)"
      role="alert"
    >
      <i class="bi bi-check me-2"></i>
      <div>
        {{ successText }}
        <!--Success text-->
      </div>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="form-floating 100">
        <input
          id="oldPin"
          v-model="oldPin"
          type="password"
          class="form-control"
          placeholder="1234"
        />
        <label for="oldPin">{{$t('changeAppPasswordModal.oldPassword')}}</label>
      </div>
      <div class="form-floating 100 mt-2">
        <input
          id="newPin"
          v-model="newPin"
          type="password"
          class="form-control"
          placeholder="1234"
        />
        <label for="newPin">{{$t('changeAppPasswordModal.newPassword')}}</label>
      </div>
      <div class="form-floating 100 mt-2">
        <input
          id="confirmNewPin"
          v-model="newPinConfirm"
          type="password"
          class="form-control"
          placeholder="1234"
        />
        <label for="confirmNewPin">{{$t('changeAppPasswordModal.confirmPassword')}}</label>
      </div>
      <button type="submit" class="btn btn-danger mt-2">{{ $t('common.change') }}</button>
    </form>
  </Modal>
</template>

<script>
import Modal from 'src/renderer/components/Modal'
import {
  decrypt,
  encrypt,
  scryptHash,
  scryptVerify,
} from 'src/renderer/utils/cryptoFunctions'
import store from '../store'
import { passStore, pinStore } from 'src/renderer/utils/electronStore'
const crypto = require('crypto')
export default {
  name: 'PinEditModal',
  components: { Modal },
  data() {
    return {
      oldPin: '',
      newPin: '',
      newPinConfirm: '',
      errorText: '',
      successText: ''
    }
  },
  computed: {
    pinKey() {
      return store.getters.pinKey
    },
  },
  methods: {
    async onSubmit() {
      if (
        !this.oldPin.trim() ||
        !this.newPin.trim() ||
        !this.newPinConfirm.trim()
      ) {
        this.setError(this.$t('errors.emptyFields'))
        return
      }

      const hashedPinInFile = JSON.parse(pinStore.get('pin.key').toString())
      const isOldPinCorrect = await scryptVerify(
        this.oldPin.trim(),
        hashedPinInFile
      )

      if (!isOldPinCorrect) {
        this.setError(this.$t('errors.incorrectOldPassword'))
        return
      }

      if (this.newPin.trim() !== this.newPinConfirm.trim()) {
        this.setError(this.$t('errors.notEqualNewConfirmPasswords'))
        return
      }

      if (this.newPin.trim() === this.oldPin.trim()) {
        this.setError(this.$t('errors.oldNewPasswordEqual'))
        return
      }

      const newPin = crypto
        .createHash('sha512')
        .update(this.newPin.trim())
        .digest('hex')
        .slice(0, 32)
      const hashedPin = await scryptHash(this.newPin.trim())
      pinStore.set(hashedPin, { fileName: 'pin.key' })
      const filePaths = passStore.getFilesPaths().filter((filePath) => {
        return filePath.slice(-5) === '.json'
      })
      filePaths.forEach((filePath) => {
        const { fileName, passData, passName } = JSON.parse(
          passStore.get(filePath).toString()
        )

        const newPassData = {}

        for (const key in passData) {
          const decryptedKey = decrypt(key, this.pinKey)
          const decryptedValue = decrypt(passData[key], this.pinKey)
          // console.log({decryptedKey, newPin})
          const newEncryptedKey = encrypt(decryptedKey, newPin)
          const newEncryptedValue = encrypt(decryptedValue, newPin)
          newPassData[newEncryptedKey] = newEncryptedValue
        }

        passStore.set(
          { fileName, passData: newPassData, passName },
          { fileName }
        )
      })
      store.commit('setPinKey', newPin)
      this.setSuccess(this.$t('success.updated'))
    },
    setError(text) {
      this.errorText = text
      clearTimeout(this.lastErrorTimeout)
      this.lastErrorTimeout = setTimeout(() => {
        this.errorText = ''
      }, 2000)
    },
    setSuccess(text) {
      this.errorText = ''
      clearTimeout(this.lastSuccessTimeout)
      this.successText = text
      this.lastSuccessTimeout = setTimeout(() => {
        this.successText = ''
      }, 2000)
    },
  },
}
</script>

<style scoped></style>
