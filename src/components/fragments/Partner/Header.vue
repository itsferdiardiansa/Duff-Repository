<template>
  <div class="content-header flex items-center justify-between">
    <div class="flex items-center">
      <div class="title">
        <h2 class="font-bold text-2xl">Partner Data</h2>
      </div>
    </div>

    <div class="btn-create float-right">
      <Button 
        variant="primary"
        label="Create"
        :bold="true"
        :icon="['fa', 'plus']"
        @click="createPArtner" 
      />
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

    const createPArtner = () => {
      router.push('/partner/create')
    }

    return {
      createPArtner,
    }
  },
}
</script>
