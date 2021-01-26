<template>
  <div class="content-header flex items-center justify-between">
    <div class="flex items-center">
      <div class="title">
        <h2 class="font-bold text-2xl">Loket Ads</h2>
      </div>
    </div>

    <div class="btn-create float-right">
      <Button :textBold="true" @click="createLoketAds" variant="primary">
        Create
      </Button>
    </div>
  </div>
</template>
<script>
import Button from '@common/Button'
import { useRouter } from 'vue-router'

export default {
  components: {
    Button,
  },
  setup() {
    const router = useRouter()

    const createLoketAds = () => {
      router.push('/loket-ads/create')
    }

    return {
      createLoketAds,
    }
  },
}
</script>
