<template>
  <div class="flex flex-col">
    <p
      class="uppercase text-xs text-gray-400 mb-4 mt-4 tracking-wider px-6"
      v-text="item.title"
      v-if="item.title"
    ></p>

    <template v-for="(item, key) in item.lists" :key="key">
      <SubMenu :item="item" :orderId="orderId" :ref="el => { if (el) menuItem[key] = el }" />
    </template>
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import SubMenu from './SubMenu'

export default {
  components: {
    SubMenu
  },
  props: {
    item: {
      type: [Object, Array]
    },
    orderId: {
      type: Number
    }
  },
  setup(props) {
    const router = useRoute()
    const menuItem = ref([])

    const activeLink = computed(() => {
      return router.path
    })

    const filteredOrderId = computed(() => {
      return props.orderId
    })

    onMounted(() => {
      // console.log(typeof menuItem.value)
    })

    return {  
      activeLink,
      filteredOrderId,
      menuItem
    }
  }
}
</script>
<style lang="scss" scoped>

</style>