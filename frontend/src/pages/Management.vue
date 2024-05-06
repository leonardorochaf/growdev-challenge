<template>
  <v-navigation-drawer v-model="isOpen">
    <h3 class="pa-5 text-center text-h5 font-weight-bold">Módulo Acadêmico</h3>
    <v-divider></v-divider>
    <v-list-item link title="Alunos" to="/management/students" class="text-white bg-orange pa-4"></v-list-item>
  </v-navigation-drawer>
  <v-app-bar>
    <v-app-bar-nav-icon @click="isOpen = !isOpen"></v-app-bar-nav-icon>
    <v-app-bar-title class="text-center">{{ headerTitle }}</v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-logout-variant"></v-btn>
    </template>
  </v-app-bar>
  <router-view />
</template>

<script lang="ts">

export default {
  data() {
    return {
      isOpen: true,
      headerTitle: 'Consulta de alunos'
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
