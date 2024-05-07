<template>
  <header class="bg-white d-flex justify-center pa-6 text-h4 font-weight-bold prevent-select">
    Edtech
  </header>
  <v-container class="pa-0 pa-lg-12 d-flex justify-center">
    <v-card class="rounded-md mt-12 pa-5 w-100 w-xl-50" :elevation="4">
      <v-card-title class="text-center font-weight-bold">
        <h1 class="font-weight text-h4 prevent-select">Login</h1>
        <v-divider class="mt-5 bg-secondary" />
      </v-card-title>
      <v-form v-model="valid" @submit.prevent="handleLogin">
        <v-card-text>
          <v-text-field variant="outlined" label="Nome de usuário" v-model="username"
            :rules="usernameRules"></v-text-field>
          <v-text-field class="pt-6" variant="outlined" label="Senha" v-model="password" :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-center mt-2">
          <v-btn :loading="loading" color="white" class="bg-orange w-100" type="submit">
            Acessar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { useToast } from 'vue-toastification';

import { login } from '../services/auth.service';
import { setInLocalStorage } from '../services/local-storage.service';

export default {
  name: 'Login',
  props: {
    isAuthError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      toast: useToast(),
    }
  },
  data() {
    return {
      loading: false,
      valid: false,
      username: '',
      password: '',
      usernameRules: [
        (v: string) => !!v || 'Nome de usuário é obrigatório',
      ],
      passwordRules: [
        (v: string) => !!v || 'Senha é obrigatória',
      ],
      showPassword: false,
    }
  },
  created() {
    if (this.isAuthError) {
      this.toast.error(this.errorMessage);
    }
  },
  methods: {
    async handleLogin() {
      if (!this.valid) return;

      try {
        this.loading = true;
        const { token } = await login({ username: this.username, password: this.password });
        setInLocalStorage('token', token);

        this.$router.push({ name: 'Management', replace: true });
      } catch (err) {
        this.toast.error(err.message);
      } finally {
        this.loading = false;
      }
    },
  }
}
</script>

<style>
.prevent-select {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
