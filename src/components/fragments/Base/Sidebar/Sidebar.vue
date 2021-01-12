<template>
  <aside class="sidebar animated faster">
    <div class="px-6 py-5 h-16 bg-indigo-900">
      <a href="javascript:void(0);" class="text-xl text-gray-50">
        <span>
          Loket<strong class="font-black">CMS</strong>
        </span>
      </a>
    </div>

    <div class="menu-list">
      <MenuList :data="menus" />
    </div>
  </aside>
</template>
<script>
import MenuList from './MenuList'

export default {
  components: {
    MenuList
  },
  data() {
    return {
      menus: [
        {
          title: 'Content Manager',
          lists: [
            {name: 'Hero'},
            {name: 'Event Modules'},
            {name: 'Thematic Page'},
            {name: 'URL Redirection'},
            {name: 'Hashtag'},
            {name: 'Loket Ads'},
            {name: 'Announcement'},
            {name: 'Partner'},
            {name: 'Footer'},
          ]
        },
        {
          title: 'Live Streaming',
          lists: [
            {name: 'Event Live Streaming'},
            {name: 'Event Calender'}
          ]
        },
        {
          title: 'Content Manager',
          lists: [
            {name: 'Verified User'},
            {name: 'Verified Document'}
          ]
        },
        {
          title: 'Operations',
          lists: [
            {name: 'Event'},
            {name: 'Blacklisty Word'},
            {name: 'Blacklisty Event'},
            {name: 'Pivot Bank'},
            {name: 'Failed Withdraw'},
          ]
        },
        {
          title: 'Discount',
          lists: [
            {name: 'Discount'}
          ]
        },
        {
          title: 'Feedback',
          lists: [
            {name: 'Feedback'}
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar {
  @apply w-64 z-50 max-h-full overflow-y-scroll;
  @apply md:fixed md:top-0 md:shadow-xl text-left;

  .menu-list {
    @apply flex flex-col w-full overflow-y-scroll;
    height: calc(100vh - 64px);
  }
}
</style>