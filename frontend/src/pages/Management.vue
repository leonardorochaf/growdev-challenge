<template>
  <v-navigation-drawer v-model="isOpen">
    <h3 class="pa-5 text-center text-h5 font-weight-bold prevent-select">Módulo Acadêmico</h3>
    <v-divider></v-divider>
    <v-list-item link title="Alunos" to="/management/students" class="text-white bg-orange pa-4"></v-list-item>
  </v-navigation-drawer>
  <v-app-bar>
    <v-app-bar-nav-icon @click="isOpen = !isOpen"></v-app-bar-nav-icon>
    <v-app-bar-title class="text-center prevent-select">{{ headerTitle }}</v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-logout-variant" @click="logout"></v-btn>
    </template>
  </v-app-bar>
  <router-view />
</template>

<script lang="ts">

export default {
  name: 'Management',
  data() {
    return {
      isOpen: true,
      headerTitle: 'Consulta de alunos'
    }
  },
  methods: {
    logout() {
      this.$router.push({ name: 'Login', replace: true })
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === 'StudentInfoCreate' || to.name === 'StudentInfoUpdate') {
      this.headerTitle = 'Cadastro de aluno'
    } else {
      this.headerTitle = 'Consulta de alunos'
    }
    next()
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
