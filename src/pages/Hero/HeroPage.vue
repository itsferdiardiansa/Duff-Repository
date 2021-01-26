<template>
  <div class="container">
    <Card>
      <div class="wrapper">
        <HeroFilter />

        <div class="mt-2">
          <HeroList />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@common/Card'
import HeroFilter from '@fragment/Hero/Filter'
import HeroList from '@fragment/Hero/List'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  components: {
    Card,
    HeroFilter,
    HeroList,
  },
  setup() {
    const route = useRoute()

    const isParent = computed(() => {
      return route.name === 'Hero'
    })

    return {
      isParent,
    }
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  @apply py-3 px-5;
}
</style>
