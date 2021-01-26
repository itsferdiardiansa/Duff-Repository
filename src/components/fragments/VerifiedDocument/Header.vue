<template>
  <div class="content-header flex items-center justify-between">
    <div class="flex items-center">
      <div class="title">
        <h2 class="font-bold text-2xl">Verified Document</h2>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'

export default {
  components: {},
  setup() {
    const router = useRouter()

    const createAnnouncement = () => {
      router.push('/announcement/create')
    }

    return {
      createAnnouncement,
    }
  },
}
</script>
