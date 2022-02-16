<template>
  <div class="container">
    <div class="nav nav-tabs">
      <Tab
        v-for="(tab, i) in tabs"
        :index="i"
        :key="tab"
        :isActive="currentTab === i"
        @tabClick="onTabClick"
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
      console.log({index})
      this.currentTab = index
      console.log(this.currentTab)
    },
  },
  computed: {
    tabs(){
     return[ this.$t('common.passwords'),this.$t('tabs.createPassword') , this.$t('tabs.settings')]
    }
  },
  data() {
    return {
      currentTab: 0,
    }
  },
}
</script>

<style scoped></style>
