<template>
  <v-app>
    <Navbar />
    <v-main class="ma-4">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';

export default {
  name: "App",
  components: { Navbar, Footer },
  data: () => ({
	}),
	mounted(){
	},
	methods: {
	}
};
</script>
