<template>
  <div class="menu-item" :class="{ active: activeLink === item.link, inactive: !item.link }" @click="selectMenuItem">
    <router-link
      :to="item.link"
      :disabled="!item.link"
    >
      <font-awesome-icon :icon="item.icon" class="w-3.5 mr-2" v-if="item.icon" />
      <span v-text="item.name"></span>
    </router-link>
  
    <template v-if="isHasChildren">
      <div class="menu-item-collapsed">
        <template v-for="item in item.children || []" :key="item.link">
          <SubMenu :item="item" />
        </template>
      </div>
    </template>
  </div>
  
</template>
<script>
import { computed, getCurrentInstance, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
 props: {
    item: {
      type: Object
    }
  },
  setup(props) {
    const router = useRoute()
    const { parent } = getCurrentInstance()

    const activeLink = computed(() => {
      return router.path
    })

    const isHasChildren = computed(() => {
      return Reflect.has(props.item, 'children')
    })

    const selectMenuItem = () => {
      parent.emit('setIndexMenuItem', 12)
    }
    
    onMounted(() => {
      parent.emit('setOrderMenuItem')
    })

    return {  
      activeLink,
      isHasChildren,
      selectMenuItem
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-item {
  @apply capitalize font-medium text-sm text-gray-500;

  &[disabled='true'] {
    @apply text-gray-300 cursor-not-allowed;
  }

  &.active {
    @apply bg-indigo-700 text-gray-100 pointer-events-none;
  }

  &.inactive {
    @apply text-gray-300 pointer-events-none;
  }

  a {
    @apply flex items-center px-6 py-2.5 hover:bg-indigo-700 hover:text-gray-100 transition ease-in-out duration-500;
  }

  &-open {
    a {
      @apply block;
    }
  }

  &-collapsed {
    a {
      @apply pl-10 hidden;
    }
  }
}
</style>