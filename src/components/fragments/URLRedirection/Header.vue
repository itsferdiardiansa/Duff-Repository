<template>
  <div class="content-header flex items-center justify-between">
    <div class="flex items-center">
      <div class="title">
        <h2 class="font-bold text-2xl">URL redirection Data</h2>
      </div>
    </div>

    <div class="btn-create float-right">
      <Button :textBold="true" @click="createURLRedirection" variant="primary">
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

    const createURLRedirection = () => {
      router.push('/url-redirection/create')
    }

    return {
      createURLRedirection,
    }
  },
}
</script>
