<template>
  <Card>
    <div class="relative overflow-hidden" style="min-height: 120px;max-height: 120px;">
      <img
        class="h-full w-full object-cover object-center"
        src="https://s3.amazonaws.com/loket-sandbox/images/banner/20201203014748_5fc7e1547268e.jpg"
        alt="Image Default"
      />
    </div>
    <div class="relative bg-gray-50">
      <div class="py-2 px-4 text-left">
        <h6 class="text-sm font-bold text-red-800">Advenced Agora</h6>
        <h1 class="text-sm font-bold">Agoda Create Data Channel</h1>

        <div class="py-4">
          <p class="text-xs"> Oct 22, 2020 - Oct 31, 2020</p>
          <p class="text-xs"> 01:00 - 04:00</p>
          <p class="text-xs"> Event Id: 2378</p>
        </div>

        <div class="pb-3 organizer">
          <p class="text-xs font-extrabold"> Rg Triawan</p>
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
  }  
}
</script>