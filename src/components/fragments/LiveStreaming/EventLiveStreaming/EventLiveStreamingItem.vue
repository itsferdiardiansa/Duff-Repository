<template>
  <Card>
    <div class="relative overflow-hidden" style="min-height: 120px;max-height: 120px;">
      <img
        class="h-full w-full object-cover object-center"
        :src="data.thumbnail"
        alt="Image Default"
      />
    </div>
    <div class="relative bg-gray-50">
      <div class="py-2 px-4 text-left">
        <h6 class="text-sm font-bold text-red-800" v-text="data.title"></h6>
        <h1 class="text-sm font-bold" v-text="data.subtitle"></h1>

        <div class="py-4">
          <p class="text-xs" v-text="data.date"></p>
          <p class="text-xs" v-text="data.time"></p>
          <p class="text-xs" v-text="data.event_id"></p>
        </div>

        <div class="pb-3 organizer">
          <p class="text-xs font-extrabold" v-text="data.author"></p>
          <p class="text-xs font-extrabold"> 
            <span>Status: </span>
            <span class="text-red-600">Broadcasting</span>
          </p>
        </div>
      </div>
    </div>
  </Card>
</template>
<script>
import Card from '@common/Card'

export default {
  components: {
    Card
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }  
}
</script>