<template>
  <div class="pt-10 px-4 px-lg-16 d-flex flex-column flex-lg-row justify-space-between">
    <form class="d-flex flex-grow-1 mr-lg-16" @submit.prevent="loadStudents(page, filter)">
      <v-text-field v-model="filter" variant="outlined" rounded="sm" bg-color="white"
        placeholder="Digite a sua busca"></v-text-field>
      <v-btn size="large" color="orange" variant="outlined" rounded="sm" icon="mdi-magnify" type="submit"></v-btn>
    </form>
    <v-btn @click="$router.push({ name: 'StudentInfoCreate' })" size="x-large" color="orange" rounded="lg"
      class="text-white">Cadastrar aluno</v-btn>
  </div>
  <Loading v-if="loading"></Loading>
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
          <td class="text-center">{{ mask.masked(student.cpf) }}</td>
          <td class="d-flex justify-center align-center">
            <v-btn icon="mdi-pencil" color="green" variant="plain"
              @click="$router.push({ name: 'StudentInfoUpdate', params: { id: student.id } })" />
            <v-btn icon="mdi-delete" color="red" variant="plain" @click="openDialog(student.id)" />
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination @update:modelValue="loadStudents" v-model="page" :length="totalPages" :page="page" :total-visible="6"
      class="pt-6" active-color="orange"></v-pagination>
  </div>

  <v-dialog v-model="dialog" width="auto">
    <v-card max-width="400" prepend-icon="mdi-alert-circle-outline"
      text="Tem certeza que deseja deletar esse estudante?" title="Confirmar exclusão">
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn class="ms-auto" text="Cancelar" @click="dialog = false"></v-btn>
        <v-btn :loading="loadingDelete" class="mr-2 bg-red" text="Confirmar" @click="deleteStudent"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useToast } from 'vue-toastification';
import { Mask } from 'maska';

import Loading from '../../components/Loading.vue';
import { deleteStudent, getStudents } from '../../services/student.service';

export default {
  name: 'StudentList',
  components: {
    Loading
  },
  setup() {
    const mask = new Mask({ mask: '###.###.###-##' })
    const toast = useToast();

    return { mask, toast };
  },
  data() {
    return {
      loading: false,
      loadingDelete: false,
      students: [],
      itemsPerPage: 10,
      page: 1,
      totalPages: 1,
      filter: '',
      dialog: false,
      studentIdToDelete: undefined
    }
  },
  created() {
    this.loadStudents(this.page);
  },
  methods: {
    async loadStudents(page: number) {
      try {
        this.loading = true;

        const { students, currentPage, totalPages } = await getStudents({ page: page, filter: this.filter });

        this.students = students;
        this.totalPages = totalPages;
        this.page = currentPage;
      } catch (err) {
        this.toast.error(err.message);
      } finally {
        this.loading = false;
      }
    },
    openDialog(id: number) {
      this.studentIdToDelete = id;
      this.dialog = true;
    },
    async deleteStudent() {
      try {
        this.loadingDelete = true;
        await deleteStudent(this.studentIdToDelete);
        this.loadingDelete = false;
        this.dialog = false;
        this.toast.success('Estudante deletado com sucesso');

        await this.loadStudents(this.page);
      } catch (err) {
        this.toast.error(err.message);
      } finally {
        this.loadingDelete = false;
        this.loading = false;
        this.dialog = false;
      }
    }
  }
}
</script>
