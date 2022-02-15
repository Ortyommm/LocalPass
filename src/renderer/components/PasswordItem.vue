<template>
  <div class="d-flex justify-content-between list-group-item list-group-item-action passwordItem" @click.self="$emit('click', password)">
    <div>{{ password.passName }}</div>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ $t('passwordsTab.actions') }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a class="dropdown-item deletePass" href="#" @click.stop="$emit('delete', password)">{{$t('passwordsTab.delete')}}</a>
        </li>
        <li>
          <a class="dropdown-item editPass" href="#" @click.stop="$emit('edit', password)">{{$t('passwordsTab.edit')}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    password: Object
  },
  name: "PasswordItem"
}
</script>

<style>
  .passwordItem {
    cursor: pointer;
  }
</style>
