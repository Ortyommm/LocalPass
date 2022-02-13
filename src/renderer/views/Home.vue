<template>
  <div class="container">
    <div class="nav nav-tabs">
      <Tab
        v-for="(tab, i) in tabs"
        :index="i"
        :key="tab"
        :isActive="currentTab === i"
        @click="onTabClick"
      >
        {{ tab }}
      </Tab>
    </div>
    <div>
      <FirstTabContent v-if="currentTab === 0" />
      <ThirdTabContent v-else-if="currentTab === 2"/>
      <SecondTabContent v-show="currentTab === 1" />
    </div>
  </div>
</template>

<script>
import Tab from '../components/Tab.vue'
import FirstTabContent from '../components/FirstTabContent.vue'
import SecondTabContent from 'src/renderer/components/SecondTabContent'
import ThirdTabContent from 'src/renderer/components/ThirdTabContent'

export default {
  name: 'Home',
  components: {
    ThirdTabContent,
    SecondTabContent,
    FirstTabContent,
    Tab,
  },
  methods: {
    onTabClick(index) {
      this.currentTab = index
    },
  },
  data() {
    return {
      currentTab: 0,
      tabs: ['Пароли', 'Создать пароль', 'Опции'],
    }
  },
}
</script>

<style scoped></style>
