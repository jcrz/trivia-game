<template>
  <div class="app">
    <div>
      <div class="nav">
        <router-link to="/question">Añadir Pregunta</router-link>
        <b-button @click="logout" variant="outline-primary">Log out</b-button>
      </div>
      <div class="jugar">
        <router-link to="/game" class="btn-jugar">JUGAR!</router-link>
        <p>Presiona JUGAR para comenzar una trivia</p>
      </div>
      <h5>Últimas jugadas</h5>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Puntos</th>
            <th>Porcentaje</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="play in plays" :key="play.id">
            <td>{{ play.user }}</td>
            <td>{{ play.score }}/3</td>
            <td>{{ play.percentage }}%</td>
            <td>{{ play.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  name: "Home",
  firestore() {
    return {
      plays: db.collection("plays"),
    };
  },
  methods: {
    logout() {
      // Cierra la sesión para el usuario
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
.app {
  width: 900px;
  margin: 60px auto;
}
table,
td,
th {
  border: 1px solid #ddd;
  text-align: left;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 15px;
}
.nav {
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
}
.jugar {
  text-align: center;
  padding: 30px;
  background-color: #08e64b;
  border-radius: 8px;
  width: 400px;
  margin: 20px auto;
}
.jugar p {
  margin-top: 10px;
}
.btn-jugar {
  padding: 5px 20px;
  background-color: aquamarine;
}
</style>