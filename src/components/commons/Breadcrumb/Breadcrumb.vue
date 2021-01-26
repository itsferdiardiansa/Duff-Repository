<template>
  <ul class="breadcrumb">
    <template v-for="(item, key) in data" :key="key">
      <li class="breadcrumb-item">
        <template v-if="data.length - 1 === key">
          <span v-text="item.name"></span>
        </template>
        <template v-else>
          <router-link :to="item.path" v-text="item.name"></router-link>
        </template>
      </li>

      <template v-if="data.length - 1 !== key">
        <span class="breadcrumb-separator" v-text="separator"></span>
      </template>
    </template>
  </ul>
</template>
<script>
import { useRouter } from 'vue-router'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    separator: {
      type: String,
      default: '/',
    },
  },
  setup() {
    const router = useRouter()

    const handleClick = path => {
      console.log(path)
      router.push(path)
    }

    return {
      handleClick,
    }
  },
}
</script>
<style lang="scss" scoped>
.breadcrumb {
  @apply flex;

  &-item {
    color: #e86b32;

    &:last-child {
      @apply text-gray-400;
    }

    &:first-child {
      &::before {
        display: none;
      }
    }
  }

  &-separator {
    @apply inline-block text-gray-400 px-2;
  }
}
</style>
