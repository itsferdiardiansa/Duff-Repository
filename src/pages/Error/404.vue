<template>
  <div class="w-full flex flex-col items-center justify-center -mt-20">
    <h3 class="text-3xl">Ooops, Page not found :(</h3>

    <div class="img h-2/3">
      <img svg-inline class="h-full pl-20" src="@icon/error-page.svg" />
    </div>

    <div class="btn">
      <Button label="Back to Home" variant="primary" @click="redirectToHome" />
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import Button from '@common/Button'

export default {
  components: {
    Button,
  },
  setup() {
    const router = useRouter()

    const redirectToHome = () => {
      router.push('/')
    }

    return {
      redirectToHome,
    }
  },
}
</script>
