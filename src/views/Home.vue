<template>
  <main
    class="flex flex-col justify-center items-center w-full "
    :style="{ height: '95vh' }"
  >
    <section
      class="bg-gray-300 w-full sm:w-full md:w-full lg:w-3/5 xl:w-3/5 p-5"
    >
      <img
        class="object-cover w-full"
        :src="require('@/assets/microsoft_logo.svg')"
      />
      <span> Quick Start to use Graph in conjunction with VueJS</span>
      <section class="pt-10">
        <section v-if="auth.isAuthenticated">
          <h4>Welcome {{ auth.user.displayName }}!</h4>
          <p>Use the navigation bar icons at the top of the page</p>
        </section>
        <section v-else-if="auth.spinner.login">Loading...</section>
        <button
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          v-else
          @click.prevent="graphLogin"
        >
          Login
        </button>
        <button v-if="auth.isAuthenticated" @click.prevent="logout">
          Logout
        </button>
      </section>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { useGraph } from "../lib/microsoftGraph/config";
import {
  useMicrosoftGraphState,
  useMicrosoftGraphActions,
  useMicrosoftGraphGetters,
} from "@/store";
import {
  AuthType,
  UserAgentApplicationType,
} from "@/store/modules/microsoftGraph/state";

import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public auth: AuthType | null = useMicrosoftGraphGetters(["getAuth"]).getAuth
    .value;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public userAgentApplication: UserAgentApplicationType | null = useMicrosoftGraphGetters(
    ["getUserAgentApplication"]
  ).getUserAgentApplication.value;

  public graphLogin() {
    const { userAgentLogin } = useMicrosoftGraphActions(["userAgentLogin"]);

    try {
      userAgentLogin();
    } catch (e) {
      console.error(e);
    }
  }
  public logOut() {
    localStorage.clear();
    this.userAgentApplication?.userAgentApplication.logout();
  }
}
</script>
