<template>
  <Modal title="Изменение пароля приложения" @closeModal="$emit('closeModal')">
    <div
      v-if="errorText"
      class="alert alert-danger d-flex align-items-center"
      role="alert"
    >
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <div>{{ errorText }}</div>
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
        <label for="oldPin">Старый пароль</label>
      </div>
      <div class="form-floating 100 mt-2">
        <input
          id="newPin"
          v-model="newPin"
          type="password"
          class="form-control"
          placeholder="1234"
        />
        <label for="newPin">Новый пароль</label>
      </div>
      <div class="form-floating 100 mt-2">
        <input
          id="confirmNewPin"
          v-model="newPinConfirm"
          type="password"
          class="form-control"
          placeholder="1234"
        />
        <label for="confirmNewPin">Подтвердите пароль</label>
      </div>
      <button type="submit" class="btn btn-danger mt-2">Изменить</button>
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
        this.setError('Все поля должны быть заполнены!')
        return
      }

      const hashedPinInFile = JSON.parse(pinStore.get('pin.key').toString())
      const isOldPinCorrect = await scryptVerify(
        this.oldPin.trim(),
        hashedPinInFile
      )

      if (!isOldPinCorrect) {
        this.setError('Старый пароль введён неверно!')
        return
      }

      if (this.newPin.trim() !== this.newPinConfirm.trim()) {
        this.setError('Новый и подтверждаемый пароли не совпадают!')
        return
      }

      if (this.newPin.trim() === this.oldPin.trim()) {
        this.setError('Новый и старый пароли не должны совпадать!')
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
          console.log({decryptedKey, newPin})
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
    },
    setError(text) {
      this.errorText = text
      clearTimeout(this.lastErrorTimeout)
      this.lastErrorTimeout = setTimeout(() => {
        this.errorText = ''
      }, 2000)
    },
  },
}
</script>

<style scoped></style>
