<template>
  <van-tabbar v-model="activeIndex" z-index="100" route>
    <van-tabbar-item v-for="(tab, index) in tabs" :key="tab.name" replace :to="tab.page">
      <div class="item flex flex-column flex-center">
        <img :src="iconSrc(tab.name, index)" class="icon" />
        <div class="text">
          {{ tab.nameUi }}
        </div>
      </div>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import utils from '@/utils/index'
import { ref, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

const tabs = [
  {
    nameUi: '首页',
    page: '/home',
    name: 'home',
  },
  {
    nameUi: '我',
    page: '/my',
    name: 'my',
  },
]
const route = useRoute()
const activeIndex = ref(0)
const iconSrc = (icon, index) => utils.getFileSrc(`tabbar-${icon}${activeIndex.value === index ? '-active' : ''}.png`)

watchEffect(() => {
  const index = tabs.findIndex(v => v.name === route.name)
  activeIndex.value = index
})
</script>

<style lang="scss" scoped>
.icon {
  width: 45px;
  margin-bottom: 10px;
}
</style>
