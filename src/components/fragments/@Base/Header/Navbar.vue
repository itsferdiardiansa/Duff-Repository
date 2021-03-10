<template>
  <nav class="navigation" aria-label="primary">
    <div class="navigation--wrapper">
      <div ref="profile" class="profile" @click="toggleDropdown">
        <img svg-inline src="@asset/avatar.svg" />
      </div>

      <Dropdown
        ref="profileDropdown"
        :strict="true"
        :safeNode="() => $refs.profile"
      >
        <template #header>
          <div class="flex">
            <div class="avatar">
              <img
                class="w-10 overflow-hidden rounded-full"
                svg-inline
                src="@asset/avatar.svg"
              />
            </div>

            <div class="ml-3 flex flex-col">
              <label class="font-medium">{{ user }}</label>
              <span class="font-light">
                <Badge variant="success" size="xs" :dot="true" class="mr-1" />
                online
              </span>
            </div>
          </div>
        </template>

        <template #menu>
          <DropdownItem @click="tryLogout">
            <div class="flex">
              <font-awesome-icon
                class="w-4 mr-2"
                :icon="['fa', 'sign-out-alt']"
              />
              <span class="w-40">Logout</span>
            </div>
          </DropdownItem>
        </template>
      </Dropdown>
    </div>
  </nav>
</template>
<script>
import { computed, ref, unref } from 'vue';
import { useStore } from 'vuex';
import { Dropdown, DropdownItem } from '@common/DropdownMenu';
import Badge from '@common/Badge';

export default {
  components: {
    Dropdown,
    DropdownItem,
    Badge,
  },
  setup() {
    const store = useStore();
    const profile = ref();
    const profileDropdown = ref();

    const toggleDropdown = () => {
      const profileDropdownEl = unref(profileDropdown);

      profileDropdownEl.toggleDropdown();
    };

    const user = computed(() => {
      return store.getters['user/getUser'];
    });

    const tryLogout = async () => {
      sModal.show({
        title: 'Confirmation',
        content: 'Are you sure to log out?',
        onConfirmFn: () => {
          store.dispatch('user/doLogout');
        },
      });
    };

    return {
      user,
      profile,
      profileDropdown,
      toggleDropdown,
      tryLogout,
    };
  },
};
</script>
<style lang="scss" scoped>
.navigation {
  @apply relative z-20 flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row;

  &--wrapper {
    @apply relative;

    .profile {
      @apply w-9 overflow-hidden rounded-full cursor-pointer inline-block;
      // @apply flex flex-row items-center w-full px-4 py-4 mt-2 text-base font-bold text-left text-gray-50 bg-transparent rounded-lg;
      // @apply md:w-auto md:mt-0 md:ml-4 focus:outline-none;

      &--avatar {
        @apply relative w-8 h-8;

        .img-avatar {
          @apply rounded-full border border-gray-100 shadow-sm;
        }
      }

      &--username {
        @apply ml-4 text-base font-normal;
      }
    }

    .dropdown {
      @apply absolute z-10 right-0 hidden bg-gray-50 group-hover:block;

      &--collapsed {
        @apply p-2 bg-white bg-gray-50 shadow-lg;

        .list {
          @apply grid grid-cols-1 gap-4 md:grid-cols-2 text-base;
        }
      }
    }
  }
}
</style>
