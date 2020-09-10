<template>
  <div>
    <div class="nav">
      <router-link to="/">Volver</router-link>
      <b-button @click="logout" variant="outline-primary">Log out</b-button>
    </div>
    <div class="title">
      <h4 class="titulo">Juega a la Trivia</h4>
    </div>
    <hr />
    <b-form @submit.prevent="play">
      <div v-for="(question, i) in selected_questions" :key="question.id">
        <b-card class="card-pregunta">
          <h5>{{ question.text }}</h5>
          <div>
            <label v-for="(answer, j) in question.answers" :key="j">
              <input
                v-model="form.answers[i]"
                class="btn-radio"
                :name="'question' + i"
                type="radio"
                :value="answer.isCorrect ? 'OK' : 'NO'"
              />
              <span class="text-radio">{{ answer.text }}</span>
            </label>
          </div>
        </b-card>
      </div>
      <br />
      <b-button type="submit" variant="success">Jugar</b-button>
    </b-form>
  </div>
</template>

<script>
//import firebase from 'firebase';
import { db } from "@/firebase";

const getDate = () => {
  const trailing = (d) => (d < 10 ? "0" + d : d);
  const now = new Date();
  return `${now.getFullYear()}-${trailing(now.getMonth())}-${trailing(
    now.getDate()
  )} ${trailing(now.getHours())}:${trailing(now.getMinutes())}:${trailing(
    now.getSeconds()
  )}`;
};
export default {
  name: "Game",
  data() {
    return {
      form: {
        answers: [],
      },
    };
  },
  firestore() {
    return {
      questions: db.collection("questions"),
    };
  },
  computed: {
    selected_questions() {
      let questions = [...this.questions];
      questions = questions.sort(() => {
        return 0.5 - Math.random();
      });
      return questions.slice(0, 3);
    },
  },
  methods: {
    play() {
      const score = this.form.answers.filter((answer) => answer == "OK").length;
      const percentage = Math.round((score * 100) / 3);
      db.collection("plays")
        .add({
          user: "Juan",
          score,
          percentage,
          date: getDate(),
        })
        .then(() => {
          //toast({html: 'Gracias por jugar'})
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
.btn-radio {
  margin-right: 3px;
}
.text-radio {
  margin-right: 15px;
}
.titulo {
  font-weight: bold;
  padding: 20px 0px;
  background-color: #08e64b;
  border-radius: 8px;
}
.title {
  text-align: center;
}
.nav {
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
}
.card-pregunta {
  margin-bottom: 12px;
}
</style>