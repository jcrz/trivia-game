<template>
  <div>
    <div class="nav">
      <router-link to="/">Volver</router-link>
      <b-button @click="logout" variant="outline-primary">Log out</b-button>
    </div>
    <div>
      <div class="title">
        <h3>Agrega un Pregunta</h3>
      </div>
      <hr />
      <b-form @submit.prevent="add_question">
        <b-form-group label="Pregunta:">
          <b-form-textarea v-model="question" minlength="10" required></b-form-textarea>
        </b-form-group>

        <b-form-group label="Respuesta correcta:">
          <b-form-input v-model="correct" minlength="1" required></b-form-input>
        </b-form-group>

        <b-form-group label="Respuesta incorrecta:">
          <b-form-input v-model="fake1" minlength="1" required></b-form-input>
        </b-form-group>

        <b-form-group label="Respuesta incorrecta:">
          <b-form-input v-model="fake2" minlength="1" required></b-form-input>
        </b-form-group>

        <b-form-group label="Respuesta incorrecta:">
          <b-form-input v-model="fake3" minlength="1" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success">Agregar</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase';
import { db } from "@/firebase";
//import M from 'materialize-css'
export default {
  name: "Question",
  data() {
    return {
      question: "",
      correct: "",
      fake1: "",
      fake2: "",
      fake3: "",
    };
  },
  methods: {
    add_question() {
      let answers = [
        { text: this.correct, isCorrect: true },
        { text: this.fake1, isCorrect: false },
        { text: this.fake2, isCorrect: false },
        { text: this.fake3, isCorrect: false },
      ];
      answers = answers.sort(() => {
        return 0.5 - Math.random();
      });
      db.collection("questions")
        .add({
          text: this.question,
          answers: answers,
        })
        .then(() => {
          //M.toast({html: 'Agregada nueva pregunta'})
          this.$router.push("/");
        });
    },
    logout() {
      // Cierra la sesión para el usuario
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
.submit {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: none;
  color: #d0aa11;
}
.nav {
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
}
.title {
  text-align: center;
  font-weight: bold;
  padding: 20px 0px;
  background-color: #08e64b;
  border-radius: 8px;
}
</style>