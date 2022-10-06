<template>
  <div
      class="h-screen w-full flex justify-center items-center bg-cover bg-center relative p-6"
      :style="styles"
  >
    <div class="relative z-10 w-full max-w-md">
      <div class="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <img class="mx-auto h-12 w-auto" src="/logo.png" alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-basic">
          Lorem ipsum.
        </h2>
      </div>
      <v-panel class="bg-light">
        <v-panel-content>
          <form class="space-y-6" @submit.prevent="userLogin">
            <div class="flex flex-col space-y-6 py-3">
              <div>
                <v-field v-model.trim="login.username" label="Логін" autocomplete="off" />
              </div>

              <div>
                <v-field
                    v-model.trim="login.password"
                    label="lorem"
                    type="password"
                    autocomplete="new-password"
                />
              </div>

              <div class="flex items-center justify-between">
                <v-checkbox v-model="remember" label="Lorem ipsum." />
              </div>

              <div class="flex-shrink-0 flex justify-end">
                <v-button
                    :loading="loading"
                    @click="userLogin"
                    class="px-4 py-1.5 rounded text-sm bg-orange-500"
                >
                  Lorem.
                </v-button>
              </div>
            </div>
          </form>
        </v-panel-content>
      </v-panel>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

interface ILoginData {
  username: string
  password: string
}

@Component({
  name: 'login-page',
  layout: 'empty',
})
export default class LoginPage extends Vue {
  showForm = false;

  loading = false;

  login: ILoginData = {
    username: '',
    password: '',
  };

  remember = false;

  async userLogin() {
    try {
      this.loading = true;
      const keys = Object.keys(this.login) as Array<keyof ILoginData>;

      const form = new FormData();

      keys.forEach((key) => form.append(key, this.login[key]));

      await this.$auth.loginWith('local', { data: this.login });
    } catch (err) {
      this.$notification.error('🚧 🚧 🚧');
    } finally {
      this.loading = false;
    }
  }

  mounted() {
    this.showForm = true;
  }
}
</script>
