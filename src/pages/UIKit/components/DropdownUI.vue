<template>
  <div class="w-8/12 text-left mt-10">
    <div class="font-black text-lg mb-4">Dropdown Menu</div>

    <div ref="codeEl" class="dropdown-menu-demo">
      <div ref="profile" class="avatar" @click="toggleDropdown">
        <img svg-inline src="@asset/avatar.svg" />
      </div>

      <div ref="user" class="avatar ml-80" @click="toggleUserDropdown">
        <img svg-inline src="@asset/avatar.svg" />
      </div>

      <Dropdown ref="profileDropdown" :safeNode="() => $refs.profile">
        <template #menu>
          <DropdownItem>
            <div class="flex">
              <font-awesome-icon
                class="w-4 mr-2"
                :icon="['fa', 'sign-out-alt']"
              />
              <span>Logout</span>
            </div>
          </DropdownItem>
        </template>
      </Dropdown>

      <Dropdown ref="userDropdown" :safeNode="() => $refs.user">
        <template #menu>
          <DropdownItem>
            <div class="flex">
              <font-awesome-icon
                class="w-4 mr-2"
                :icon="['fa', 'sign-out-alt']"
              />
              <span>User</span>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div class="flex">
              <font-awesome-icon
                class="w-4 mr-2"
                :icon="['fa', 'sign-out-alt']"
              />
              <span>Theme</span>
            </div>
          </DropdownItem>
        </template>
      </Dropdown>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { computed, ref, unref } from 'vue';
import { Dropdown, DropdownItem } from '@common/DropdownMenu';

export default {
  components: {
    Dropdown,
    DropdownItem,
  },
  beforeCreate() {},
  setup() {
    const profile = ref();
    const profileDropdown = ref();
    const user = ref();
    const userDropdown = ref();

    const toggleDropdown = () => {
      const profileDropdownEl = unref(profileDropdown);

      profileDropdownEl.toggleDropdown();
    };

    const toggleUserDropdown = () => {
      const userDropdownEl = unref(userDropdown);

      userDropdownEl.toggleDropdown();
    };

    return {
      profile,
      profileDropdown,
      toggleDropdown,
      user,
      userDropdown,
      toggleUserDropdown,
    };
  },
};
</script>
<style lang="scss" scoped>
.avatar {
  @apply w-10 overflow-hidden rounded-full cursor-pointer inline-block;
}
</style>
