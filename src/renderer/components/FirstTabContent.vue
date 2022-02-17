<template>
  <div>
    <!--    <Portal to="modal">-->
    <DeleteModal
      v-if="showDeleteModal"
      :password="currentPassword"
      @deleteConfirm="onPasswordDeleteConfirm"
      @closeModal="onModalClose"
    />
    <PasswordModal
      v-if="showPasswordModal"
      :password="currentPassword"
      @closeModal="onModalClose"
    />
    <PasswordEditModal
      v-if="showPasswordEditModal"
      :password="currentPassword"
      @closeModal="onModalClose"
    />
    <!--    </Portal>-->
    <div class="input-group mb-3 mt-2">
      <span class="input-group-text">
        <i class="bi bi-search"></i>
      </span>
      <input
        type="text"
        class="form-control"
        :placeholder="$t('passwordsTab.search')"
        :aria-label="$t('passwordsTab.search')"
        aria-describedby="basic-addon1"
        :value="query"
        @input="onSearchInput"
      />
    </div>
    <template v-if="$store.getters.passwords.length > 0">
      <div class="list-group mt-2">
        <PasswordItem
          v-for="password in filteredPasswords"
          :password="password"
          :key="JSON.stringify(password.passData)"
          @delete="onPasswordDelete(password)"
          @open="onPasswordClick(password)"
          @edit="onPasswordEdit(password)"
        />
      </div>
    </template>
    <template v-else>
      <h2>Паролей нет!</h2>
      <p>Чтобы их создать перейдите в раздел "Создать пароль"</p>
    </template>
  </div>
</template>

<script>
import { passStore } from '../utils/electronStore'
import PasswordItem from 'src/renderer/components/PasswordItem'
import DeleteModal from 'src/renderer/components/DeleteModal'
import PasswordModal from 'src/renderer/components/PasswordModal'
import PasswordEditModal from 'src/renderer/components/PasswordEditModal'
import { mapMutations } from 'vuex'

export default {
  name: 'FirstTabContent',
  components: {
    PasswordEditModal,
    PasswordModal,
    DeleteModal,
    PasswordItem,
  },
  data() {
    return {
      showDeleteModal: false,
      showPasswordModal: false,
      showPasswordEditModal: false,
      currentPassword: null,
      filteredPasswords: [],
      query: '',
    }
  },
  computed: {
    //VUE 3 is caching computed properties, so I can use it now only for watch
    passwords() {
      return this.$store.getters.passwords
    },
  },
  // watch: {
  //   passwords: function (){
  //     console.log('passwords')
  //     this.filteredPasswords = this.$store.getters.passwords.filter(password => password.passName.toLocaleLowerCase().includes(this.query.toLocaleLowerCase()))
  //   }
  // },
  methods: {
    ...mapMutations(['setPasswords']),
    onSearchInput(e) {
      this.query = e.target.value
      this.filteredPasswords = this.$store.getters.passwords.filter(
        (password) =>
          password.passName
            .toLocaleLowerCase()
            .includes(this.query.toLocaleLowerCase())
      )
    },
    onPasswordClick(password) {
      this.currentPassword = password
      this.showPasswordModal = true
    },
    onPasswordDelete(password) {
      this.currentPassword = password
      this.showDeleteModal = true
    },
    onPasswordDeleteConfirm(password) {
      passStore.delete(password.fileName)
      this.setPasswords(
        this.$store.getters.passwords.filter(
          (el) => el.fileName !== password.fileName
        )
      )
      this.showDeleteModal = false
      this.currentPassword = null
    },
    onPasswordEdit(password) {
      this.currentPassword = password
      this.showPasswordEditModal = true
    },
    onModalClose() {
      this.showDeleteModal =
        this.showPasswordModal =
        this.showPasswordEditModal =
          false
      this.currentPassword = null
    },
  },
  created() {
    //because computed not working
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'setPasswords') {
        this.filteredPasswords = mutation.payload.filter((password) =>
          password.passName
            .toLocaleLowerCase()
            .includes(this.query.toLocaleLowerCase())
        )
      }
    })

    let passwordsPaths = passStore.getFilesPaths()
    const passwords = []
    for (const path of passwordsPaths) {
      passwords.push(JSON.parse(passStore.get(path).toString()))
    }
    this.filteredPasswords = passwords
    this.setPasswords(passwords)
  },
}
</script>

<style scoped></style>
