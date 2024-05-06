<template>
  <v-form v-model="valid" @submit.prevent="handleSubmit">
    <v-container class="mt-8 px-8 px-lg-12">
      <v-row class="justify-center">
        <v-col cols=12>
          <v-text-field v-model="name" :rules="nameRules" label="Nome"></v-text-field>
        </v-col>
        <v-col cols=12>
          <v-text-field v-model="email" :rules="emailRules" label="Email"></v-text-field>
        </v-col>
        <v-col cols=12>
          <v-text-field v-model="ra" :rules="raRules" label="Registro Acadêmico"></v-text-field>
        </v-col>
        <v-col cols=12>
          <v-text-field :model-value="mask.masked(cpf)" :rules="cpfRules" label="CPF"
            @update:model-value="cpf = mask.unmasked($event)"></v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex flex-row-reverse">
        <v-btn :loading="loading" size="large" color="orange" class="text-white mt-2 ml-3" type="submit">
          Salvar
        </v-btn>
        <v-btn size="large" color="white" class="mt-2" @click="$router.push({ name: 'Students' })">
          Voltar
        </v-btn>
      </div>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Mask } from 'maska';

import { validateCPF } from '../../utils/validate-cpf';
import { createStudent } from '../../services/student.service';

export default {
  data() {
    return {
      loading: false,
      valid: false,
      name: '',
      email: '',
      ra: '',
      cpf: '',
      nameRules: [
        (v: string) => !!v || 'Nome é obrigatório',
      ],
      emailRules: [
        (v: string) => !!v || 'Email é obrigatório',
        (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido',
      ],
      raRules: [
        (v: string) => !!v || 'Registro acadêmico é obrigatório',
        (v: string) => /^\d+$/.test(v) || 'Registro deve contar apenas números',
      ],
      cpfRules: [
        (v: string) => !!v || 'Cpf é obrigatório',
        (v: string) => validateCPF(v) || 'Formato de cpf inválido',
      ],
    }
  },
  setup() {
    return {
      mask: new Mask({ mask: '###.###.###-##' }),
    }
  },
  methods: {
    async handleSubmit() {
      if (this.valid) {
        this.loading = true;
        await new Promise(resolve => setTimeout(resolve, 2000));

        await createStudent({
          name: this.name,
          email: this.email,
          ra: this.ra,
          cpf: this.cpf,
        });
        this.loading = false;

        this.$router.push({ name: 'Students' });
      }
    }
  }
}
</script>
