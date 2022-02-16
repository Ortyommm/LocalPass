<template>
  <div class="keyValuePair">
    <div class="d-flex justify-content-between mt-2">
      <div class="form-floating w-25">
        <input type="text" class="form-control key" placeholder="Поле" v-model="key">
        <label>Поле</label>
      </div>
      <div class="form-floating" style="width: 70%;">
        <textarea class="form-control textarea-controlled value" :placeholder="$t('common.value')" v-model="value"></textarea>
        <label>{{ $t('common.value') }}</label>
      </div>
      <div class="keyValuePairControl align-self-center">
        <i @click="$emit('delete', uid)" class="bi bi-dash-circle-fill text-danger" style="font-size: 1.2rem; cursor: pointer"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KeyValuePair",
  props: {
    uid: Number,
    defaultKey: String,
    defaultValue: String
  },
  data(){
    return {
      key: this.defaultKey || '',
      value: this.defaultValue || ''
    }
  },
  watch: {
    key(){
      this.onInput()
    },
    value(){
      this.onInput()
    }
  },
  methods: {
    onInput(){
      this.$emit('input', {data: [this.key, this.value], id: this.uid})
    }
  }
}
</script>

<style scoped>

</style>
