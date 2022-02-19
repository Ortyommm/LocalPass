<template>
  <div
    class="
      container
      d-flex
      align-items-center
      justify-content-center
      flex-column
    "
    style="height: 100vh"
  >
    <h1 class="mb-4">{{ isFirstLaunch ? $t('login.createPassword') : $t('login.enterPassword') }}</h1>
    <form @submit="onFormSubmit">
      <div class="form-floating 100">
        <input
          type="password"
          class="form-control"
          id="pinCode"
          placeholder="1234"
          ref="pin"
          @input="onPinInput"
          :disabled="!isFirstLaunch && isDisabledByTimeout"
          :value="pin"
        />
        <label for="pinCode">{{ $t('common.password') }}</label>
      </div>
      <div class="form-floating 100 mt-2" v-if="isFirstLaunch">
        <input
          id="confirmPin"
          type="password"
          class="form-control"
          placeholder="1234"
          :value="confirmPin"
          @input="onConfirmPinInput"
        />
        <label for="confirmPin">{{ $t('login.repeatPassword') }}</label>
      </div>

      <button
        type="submit"
        class="btn btn-primary mt-2"
        :disabled="!isFirstLaunch && isDisabled"
      >
        {{ $t('login.enterBtn') }}
      </button>
    </form>
    <div style="height: 183px" v-if="errorText">
      <div
        class="
          alert alert-danger
          d-flex
          align-items-center
          mt-5
          position-fixed
        "
        style="left: 50%; transform: translateX(-50%)"
        role="alert"
      >
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        <div>{{errorText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {scryptVerify, scryptHash} from "../utils/cryptoFunctions";
import {pinStore} from "../utils/electronStore";
import {mapMutations} from "vuex";
const crypto = require('crypto')

export default Vue.extend({
  name: 'Login',
  methods: {
    ...mapMutations(['setPinKey']),
    onPinInput(e){
      this.pin = (e.target).value
      this.isDisabled = this.isFirstLaunch ? !this.pin || !this.confirmPin: !this.pin
    },
    onConfirmPinInput(e ){
      this.confirmPin = (e.target).value
      this.isDisabled = !this.pin || !this.confirmPin
    },
    setError(text){
      this.errorText = text
      this.isDisabledByTimeout = true
      setTimeout(() => {
        this.isDisabled = this.isDisabledByTimeout = false
        this.errorText = ''
      }, 2000)
    },
   async onFormSubmit(e){
      e.preventDefault()
      if(this.isFirstLaunch && this.pin !== this.confirmPin){
        this.setError(this.$t('errors.passwordsNotEqual'))
        return
      }
     if (this.isFirstLaunch) {
       const hashedPin = await scryptHash(this.pin.trim())
       pinStore.set(hashedPin, { fileName: 'pin.key' })
       this.setPinKey(hashedPin)
     }
      const hashedPinInFile = JSON.parse(pinStore.get('pin.key').toString())
      const isPinRight = await scryptVerify(this.pin.trim(), hashedPinInFile)
     if (isPinRight) {
       const key = crypto
         .createHash('sha512')
         .update(this.pin.trim())
         .digest('hex')
         .slice(0, 32)
       this.setPinKey(key)
       this.$router.replace('/home')
     } else {
       this.isDisabled = true
       this.setError(this.$t('errors.incorrectPassword'))
     }
    },
    focusInput(){
      this.$nextTick(() => this.$refs.pin.focus())
    }
  },
  data(){
    return {
      pin: '',
      confirmPin: '',
      isDisabled: true,
      isFirstLaunch: false,
      errorText: '',
      isDisabledByTimeout: false
    }
  },
  created() {
    this.isFirstLaunch = !pinStore.isExist('pin.key')
    this.focusInput()
  }
})
</script>

<style>
.hero-body {
  height: 100vh;
}
</style>
