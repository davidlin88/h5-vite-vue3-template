<script>
export default {
  name: 'App'
}
</script>

<template>
  <router-view
    v-slot="{ Component }"
  >
    <keep-alive>
      <component
        :is="Component"
        v-if="$route.meta.keepAlive"
        :key="$route.fullPath"
      />
    </keep-alive>
    <component
      :is="Component"
      v-if="!$route.meta.keepAlive"
      :key="$route.fullPath"
    />
    <Tabbar v-show="$route.meta.tabbar" />
  </router-view>
</template>

