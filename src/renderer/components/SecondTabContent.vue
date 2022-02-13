<template>
  <div>
    <div
      v-if="errorText"
      class="alert alert-danger d-flex align-items-center mt-1 "
      style="left: 50%; transform: translateX(-50%)"
      role="alert"
    >
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <div>{{errorText}}</div>
    </div>
    <div
      v-if='successText'
      class="alert alert-success d-flex align-items-center mt-1 "
      style="left: 50%; transform: translateX(-50%)"
      role="alert"
    >
      <i class="bi bi-check me-2"></i>
<!--      success-->
      <div>{{successText}}</div>
    </div>
    <div id="formData">
      <div class="form-floating w-100 mt-2">
        <input
          type="text"
          class="form-control"
          placeholder="Имя"
          id="passName"
          v-model="passName"
          @delete="onKeyValueDelete"
        />
        <label for="passName">Имя</label>
      </div>
      <KeyValuePair
        v-for="field in fields"
        :key="field.id"
        :uid="field.id"
        :defaultKey='decryptedPassword ? field.key : null'
        :defaultValue='decryptedPassword ? field.value : null'
        @input="onKeyValueInput"
        @delete="onKeyValueDelete"
      />
    </div>
    <div id="controls">
      <div class="mt-2">
        <i
          @click="createField"
          class="bi bi-plus-circle-fill text-success"
          style="cursor: pointer; font-size: 1.2rem"
        ></i>
      </div>
      <button type="button" class="btn btn-success mt-5" @click="savePassword">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import KeyValuePair from 'src/renderer/components/KeyValuePair'
import {encrypt} from "src/renderer/utils/cryptoFunctions";
import {passStore} from "src/renderer/utils/electronStore";
import store from '../store'
export default {
  name: 'SecondTabContent',
  components: { KeyValuePair },
  props: {
    decryptedPassword: Array,
    name: String,
    fileName: String
  },
  data() {
    return {
      passName: this.name || '',
      fields: [{ id: 0, key: '', value: '' }],
      lastId: 0,
      errorText: '',
      successText: ''
    }
  },
  computed: {
    pinKey(){
      //store for cases when this.$store is undefined (in modals)
     return (this.$store || store).getters.pinKey
    },
    passwords(){
      return (this.$store || store).getters.passwords
    }
  },
  created() {
    if(this.decryptedPassword){
      this.decryptedPasswordToFields(this.decryptedPassword)
    }
  },
  methods: {
    setPasswords(passwords){
      (this.$store || store).commit('setPasswords', passwords)
    },
    decryptedPasswordToFields(){
      this.fields = []
      console.log(this.decryptedPassword)
      this.fields = this.decryptedPassword.map(([key, value]) => {
        this.lastId++
        return { id: this.lastId, key, value }
      })
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
    createField() {
      this.lastId++
      this.fields.push({ id: this.lastId, key: '', value: '' })
    },
    onKeyValueInput(event) {
      const changedField = this.fields.find((field) => field.id === event.id)
      changedField.key = event.data[0]
      changedField.value = event.data[1]
    },
    onKeyValueDelete(id) {
      if (this.fields.length === 1) {
        return
      }
      const indexOfField = this.fields.findIndex((el) => el.id === id)
      this.fields.splice(indexOfField, 1)
    },
    savePassword() {
      const keyArray = this.fields.map((el) => el.key.trim())
      const keySet = new Set(keyArray)
      const valuesArray = this.fields.map((el) => el.value.trim())
      console.log({keySet, keyArray})

      if(!this.passName.trim()){
        this.setError('Имя не должно быть пустым')
        return
      }

      if(keyArray.includes('') || valuesArray.includes('')){
        this.setError('Поля и значения не должны быть пустыми')
        return
      }

      if (keyArray.length !== keySet.size) {
        this.setError('Ключи не должны повторяться')
        return
      }

      this.errorText = ''
      const passData = {}
      for (let i = 0; i<keyArray.length; i++){
        const key = encrypt(keyArray[i], this.pinKey)
        const value = encrypt(valuesArray[i], this.pinKey)
        passData[key] = value
      }
      // const indexOfPasswords = this.passwords.findIndex(password => password.fileName === this.fileName)
      // this.setPasswords(this.passwords.splice(indexOfPasswords), )
      // console.log(this.fileName, 'fname')

      // this.decryptedPassword === edit password, not creating
      if(this.decryptedPassword){
        this.setPasswords(this.passwords.map(p => {
          if(p.fileName === this.fileName){
            console.log({ passName: this.passName, passData, fileName: this.fileName })
            p = { passName: this.passName, passData, fileName: this.fileName }
          }
          return p
        }))
      } else {
        this.setPasswords([...this.passwords].splice(this.passwords.length, -1, { passName: this.passName, passData, fileName: this.fileName } ))
      }
      // let passwordsPaths = passStore.getFilesPaths()
      // const passwords = []
      // for (const path of passwordsPaths) {
      //   passwords.push(JSON.parse(passStore.get(path).toString()))
      // }
      // this.setPasswords(passwords)
    // this.pass
      passStore.set({ passName: this.passName, passData }, { saveFileName: true, fileName: this.fileName })
      if(!this.decryptedPassword){
        this.lastId++
        this.fields = [{ id: this.lastId, key: '', value: '' }]
        this.passName = ''
        console.log({fields: this.fields })
        this.setSuccess('Успешно сохранено!')
      } else {
        this.setSuccess('Успешно обновлено!')
      }
    },
  },
}
</script>

<style scoped></style>
