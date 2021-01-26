<template>
  <template v-for="(itemGroup, i) in data" :key="i">
    <div class="flex flex-col">
      <p
        class="uppercase text-xs text-gray-400 mb-4 mt-4 tracking-wider px-6"
        v-text="itemGroup.title"
      ></p>

      <template v-for="(item, j) in itemGroup.lists" :key="j">
        <router-link
          :to="item.link"
          :disabled="!item.link"
          :class="{ active: activeLink === item.name }"
          class="menu-item"
          v-text="item.name"
        ></router-link>
      </template>
    </div>
  </template>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRoute()

    const activeLink = computed(() => {
      return router.name
    })

    return {
      activeLink,
    }
  },
}
</script>
<style lang="scss" scoped>
.menu-item {
  @apply capitalize font-medium text-sm text-gray-500 hover:bg-indigo-700 hover:text-gray-100 transition ease-in-out duration-500;
  @apply px-6 py-2;

  &[disabled='true'] {
    @apply text-gray-300 cursor-not-allowed;
  }

  &.active {
    @apply bg-indigo-700 text-gray-100 pointer-events-none;
  }
}
</style>
