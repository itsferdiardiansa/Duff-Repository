<template>
  <Header />

  <SideBar />

  <main class="content bg-gray-100">
    <div class="page-header px-6 py-6 shadow-md bg-gray-50">
      <div class="container">
        <h3 class="text-2xl font-bold" v-text="contentTitle"></h3>
      </div>
    </div>

    <div class="p-6">
      <Breadcrumb :data="breadcrumbs" />
    </div>

    <div class="h-full flex flex-row flex-wrap px-6">
      <transition name="slide" mode="out-in" appear>
        <component :is="ChildComponent"></component>
      </transition>
    </div>
  </main>
</template>
<script>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '@common/Breadcrumb'
import Header from '@fragment/Base/Header'
import SideBar from '@fragment/Base/Sidebar'

export default {
  components: {
    Header,
    SideBar,
    Breadcrumb,
  },
  setup() {
    const route = useRoute()
    let onPageError = reactive(route.name === 'Page Not Found')

    const contentTitle = computed(() => {
      return route.name
    })

    const toggleClick = () => {
      alert('click ...')
    }

    const ChildComponent = computed(() => {
      return route.meta.components.default
    })

    const breadcrumbs = computed(() => {
      return route.meta.breadcrumbs
    })

    return {
      contentTitle,
      breadcrumbs,
      onPageError,
      toggleClick,
      ChildComponent,
    }
  },
}
</script>
<style lang="scss" scoped>
.slide-leave-active,
.slide-enter-active {
  transition: 0.3s ease-in-out;
}
.slide-enter {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(5%, 0);
  opacity: 0;
}

.content {
  margin-left: 225px;
  margin-top: 55px;
  text-align: left;
}
</style>
