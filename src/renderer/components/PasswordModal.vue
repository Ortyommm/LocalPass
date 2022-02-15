<template>
  <Modal :title="password.passName" @closeModal="$emit('closeModal')">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Ключ</th>
          <th scope="col">Значение</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='[key, value] in decryptedPassword' :key='key'>
          <td><p class="text-break">{{ key }}</p></td>
          <td>
            <div class="d-flex justify-content-between">
              <p class="text-break">{{value}}</p>
              <div class="buttonContainer">
                <button class='btn btn-outline-secondary' @click='copyText(value)'><i class='bi bi-clipboard'></i></button></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </Modal>
</template>

<script>
import Modal from 'src/renderer/components/Modal'
import { decrypt } from 'src/renderer/utils/cryptoFunctions'
import store from '../store'

export default {
  name: 'PasswordModal',
  components: { Modal },
  computed: {
    pinKey(){
      return store.getters.pinKey
    },
  },

  methods: {
    copyText(value){
      navigator.clipboard.writeText(value)
    }
  },

  data() {
    return {
      decryptedPassword: [],
    }
  },
  created() {
    for (const key in this.password.passData) {
      const decryptedKey = decrypt(key, this.pinKey)
      const decryptedValue = decrypt(this.password.passData[key], this.pinKey)
      this.decryptedPassword.push([decryptedKey, decryptedValue])
    }
  },
  props: {
    password: Object,
  },
}
</script>

<style scoped></style>
