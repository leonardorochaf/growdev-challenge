<template>
  <div class="pt-10 px-4 px-lg-16 d-flex flex-column flex-lg-row justify-space-between">
    <div class="d-flex flex-grow-1 mr-lg-16">
      <v-text-field v-model="filter" variant="outlined" rounded="sm" bg-color="white"
        placeholder="Digite a sua busca"></v-text-field>
      <v-btn @click="loadStudents(page, filter)" size="large" color="orange" variant="outlined" rounded="sm"
        icon="mdi-magnify"></v-btn>
    </div>
    <v-btn size="x-large" color="orange" rounded="lg" class="text-white">Cadastrar aluno</v-btn>
  </div>
  <div v-if="loading" class="d-flex justify-center align-center flex-grow-1">
    <v-progress-circular indeterminate color="orange" size="64" />
  </div>
  <div v-else class="pt-10">
    <v-table>
      <thead>
        <tr>
          <th class="text-center">
            Registro Acadêmico
          </th>
          <th class="text-center">
            Nome
          </th>
          <th class="text-center">
            CPF
          </th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td class="text-center">{{ student.ra }}</td>
          <td class="text-center">{{ student.name }}</td>
          <td class="text-center">{{ student.cpf }}</td>
          <td class="d-flex justify-center align-center">
            <v-btn icon="mdi-pencil" color="green" variant="plain" />
            <v-btn icon="mdi-delete" color="red" variant="plain" />
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination @update:modelValue="loadStudents" v-model="page" :length="totalPages" :page="page" :total-visible="6"
      class="pt-6" active-color="orange"></v-pagination>
  </div>
</template>

<script lang="ts">
import { getStudents } from '../../services/student.service';

export default {
  data() {
    return {
      students: [],
      itemsPerPage: 10,
      loading: false,
      page: 1,
      totalPages: 1,
      filter: ''
    }
  },
  created() {
    this.loadStudents(this.page);
  },
  methods: {
    async loadStudents(page: number) {
      this.loading = true;

      const { students, currentPage, totalPages } = await getStudents({ page: page, filter: this.filter });

      this.students = students;
      this.totalPages = totalPages;
      this.page = currentPage;
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.v-pagination__item--is-active {
  color: "red" !important
}
</style>
