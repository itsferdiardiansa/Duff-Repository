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
      <slot></slot>
    </div>

    <!-- <Modal :onConfirm="toggleClick">
      <template v-slot:header> Confirmation </template>

      <template v-slot:body>
        <p class="text-sm text-gray-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </template>
    </Modal> -->
  </main>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '@common/Breadcrumb'
import Header from '@fragment/Base/Header'
import SideBar from '@fragment/Base/Sidebar'
// import Modal from '@common/Modal'

export default {
  components: {
    Header,
    SideBar,
    Breadcrumb,
    // Modal,
  },
  setup() {
    const route = useRoute()
    let onPageError = reactive(false)

    let breadcrumbs = reactive([{ name: 'Home', link: '/' }])

    const contentTitle = computed(() => {
      return route.name
    })

    const toggleClick = () => {
      alert('click ...')
    }

    onMounted(() => {
      breadcrumbs.push({ name: contentTitle })
    })

    return {
      contentTitle,
      breadcrumbs,
      onPageError,
      toggleClick,
    }
  },
}
</script>
<style lang="scss" scoped>
.content {
  margin-left: 255px;
  margin-top: 64px;
  text-align: left;
}
</style>
