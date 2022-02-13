<template>
<Modal @closeModal="$emit('closeModal')" :title='password.passName' >
  <SecondTabContent :decryptedPassword='decryptedPassword' :name='password.passName' :fileName='password.fileName'/>
</Modal>
</template>

<script>
import Modal from 'src/renderer/components/Modal'
import { decrypt } from 'src/renderer/utils/cryptoFunctions'
import SecondTabContent from 'src/renderer/components/SecondTabContent'
import store from 'src/renderer/store'

export default {
  name: 'PasswordEditModal',
  components: { SecondTabContent, Modal },
  computed: {
    pinKey(){
      return store.getters.pinKey
    },
  },
  data() {
    return {
      decryptedPassword: [],
      passName: '',
      lastId: 0,
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
    password: Object
  }
}
</script>

<style scoped>

</style>
