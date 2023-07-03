<template>
  <div>
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-card class="mt-2 mb-2" outlined elevation="0">
      <v-layout v-if="dataDashboard.length" class="ma-1" row wrap>
        <v-flex
          v-for="data in dataDashboard"
          :key="data.label"
          sm6 xs12 md4 lg4
          class="pa-1"
        >
          <v-card>
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
								<v-sheet color="green" width="40" height="40" elevation="6">
									<v-icon dark middle>person</v-icon>
								</v-sheet>
							</v-list-item-avatar>
              <v-list-item-content>
                <div class="judul text-center">{{ data.label }}</div>
                <v-list-item-title class="mb-2 text-center" style="font-size: 11pt; font-weight: bold;">{{ data.jml }}</v-list-item-title>
                <v-divider />
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>
      <h2 v-else style="font-weight: bold;">Data Tidak Tersedia</h2>
    </v-card>
    <v-dialog
      v-model="dialogNotifikasi"
      transition="dialog-bottom-transition"
      persistent
      width="500px"
    >
      <PopUpNotifikasiVue
        :notifikasi-kode.sync="notifikasiKode"
        :notifikasi-text.sync="notifikasiText"
        :notifikasi-button.sync="notifikasiButton"
        @proses="goToProses"
        @cancel="dialogNotifikasi = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PopUpNotifikasiVue from "./Layout/PopUpNotifikasi.vue";
export default {
  name: 'Dashboard',
  components: { PopUpNotifikasiVue },
  data: () => ({
    dataDashboard: [],

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Dashboard - SISTEM DATABASE KEPENDUDUKAN PANJAITAN",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  watch: {
  },
  mounted() {
    this.getData();
  },  
	methods: {
		...mapActions(["fetchData", "getDashboard"]),
    getData() {
      this.$store.dispatch('getDashboard')
      .then((res) => {
				this.dataDashboard = res.data.result;
			})
			.catch((err) => {
        // this.notifikasi("error", err.response.data.message, "2")
        console.log(err.response.data.message);
			});
		},
    goToProses(){
			localStorage.removeItem('user_token');
			localStorage.removeItem('nama');
			localStorage.removeItem('nama_role');
			localStorage.removeItem('idLogin');
			localStorage.removeItem('roleID');
			localStorage.removeItem('fotoProfil');
			this.$router.push({name: "Login"});
		},
    notifikasi(kode, text, proses){
      this.dialogNotifikasi = true
      this.notifikasiKode = kode
      this.notifikasiText = text
      this.notifikasiButton = proses
    },
  }
}
</script>

<style>
</style>