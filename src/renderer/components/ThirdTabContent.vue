<template>
  <div class="mt-2">
    <PinEditModal
      v-if="showPinEditModal"
      @closeModal="showPinEditModal = false"
      @changePassword="clearFileInput"
    />
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
      </div>
    </div>
    <div
      v-if="errorText"
      class="alert alert-danger d-flex align-items-center"
      role="alert"
    >
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <div>{{ errorText }}</div>
    </div>
    <h2>{{ $t('common.passwords') }}:</h2>
    <div class="mt-3 justify-content-between row">
      <div class="col-12">
        <button class="btn btn-primary" @click="createBackup">
          {{ $t('settings.createBackup') }}
        </button>
        <!--<button class="btn btn-secondary col-5" id="openBackupBtn">Открыть резервную копию</button>-->
      </div>
      <div class="col-12 mt-2">
        <input
          ref="fileInput"
          type="file"
          class="d-none"
          accept=".zip"
          @change="loadBackup"
        />
        <button class="btn btn-outline-primary" @click="openFileInput">
          {{ $t('settings.loadBackup') }}
        </button>
      </div>
      <div class="col-12 mt-2">
        <button class="btn btn-danger" @click="showPinEditModal = true">
          {{ $t('settings.changePassword') }}
        </button>
      </div>
      <hr class="mt-4" />
      <div class="row">
        <h2>{{ $t('settings.language') }}:</h2>
        <button class="btn btn-primary col-4 mt-3" @click="setLocale">
          {{ getLocaleString() }}
        </button>
      </div>

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
import JSZip from 'jszip'
import util from 'util'
import isJsonString from 'src/renderer/utils/isJsonString'
import { passStore } from 'src/renderer/utils/electronStore'
import { decrypt } from 'src/renderer/utils/cryptoFunctions'
import { mapGetters } from 'vuex'
const zip = new JSZip()
const path = require('path')
const fs = require('fs')

export default {
  name: 'ThirdTabContent',
  components: { PinEditModal },
  data() {
    return {
      successText: '',
      errorText: '',
      showPinEditModal: false,
    }
  },
  computed: {
    ...mapGetters(['pinKey']),
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
    setError(text) {
      this.errorText = text
      clearTimeout(this.lastErrorTimeout)
      this.lastErrorTimeout = setTimeout(() => {
        this.errorText = ''
      }, 4500)
    },
    clearFileInput() {
      this.$refs.fileInput.type = ''
      this.$refs.fileInput.type = 'file'
    },
    createBackup() {
      saveBackupOnDesktop().then(() => {
        this.setSuccess(this.$t('settings.createBackupSuccess'))
      })
    },
    async loadBackup() {
      const backupPath = this.$refs.fileInput.files[0].path
      if (backupPath.slice(-4) !== '.zip') {
        this.setError(this.$t('errors.notZip'))
        return
      }
      const file = await util.promisify(fs.readFile)(path.normalize(backupPath))
      const passwordsData = []
      const zipFile = await zip.loadAsync(file)
      const promises = []
      Object.keys(zipFile.files).forEach(function (filename) {
        promises.push(
          zipFile.files[filename].async('string').then(function (fileData) {
            if (isJsonString(fileData)) passwordsData.push(JSON.parse(fileData))
          })
        )
      })
      await Promise.all(promises)
      const passwordsInPassStore = passStore.getFilesPaths()
      for (const password of passwordsData) {
        if (passwordsInPassStore.includes(password.fileName)) {
          return
        }
        try {
          //if we can decrypt, we add password
          decrypt(Object.values(password.passData)[0], this.pinKey)
          passStore.set(
            {
              fileName: password.fileName,
              passData: password.passData,
              passName: password.passName,
            },
            { fileName: password.fileName }
          )
        } catch (e) {
          this.setError(this.$t('errors.importingPin'))
        }
      }
      if (!this.errorText) {
        this.setSuccess(this.$t('success.importedPasswords'))
      }
      this.clearFileInput()
    },
    openFileInput() {
      this.$refs.fileInput.click()
    },
    getLocaleString() {
      switch (this.$i18n.locale) {
        case 'ru':
          return 'Русский'
        case 'en':
          return 'English'
      }
    },
    setLocale() {
      this.$i18n.locale = this.$i18n.locale === 'ru' ? 'en' : 'ru'
      localStorage.setItem('locale', this.$i18n.locale)
    },
  },
}
</script>

<style scoped></style>
