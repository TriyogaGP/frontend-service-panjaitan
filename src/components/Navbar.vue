<template>
	<nav>
		<v-app-bar color="light-black darken-3" dark app>
			<v-avatar size="35">
				<v-img src="../../public/logo-panjaitan.png"></v-img>
			</v-avatar>
			<div class="ml-2 mr-2">SDKP</div>
			<v-divider vertical />
			<v-divider vertical />
			<v-list dense style="padding: 0px; margin-left: 3px;">
				<v-list-item
					router to="/dashboard"
					class="SelectedMenu"
					active-class="SelectedMenu-active"
				>
					<v-icon left middle>dashboard</v-icon>
					<v-list-item-title>
						<span>Dashboard</span>
					</v-list-item-title>
				</v-list-item>
			</v-list>
			<v-list dense style="padding: 0px; margin-left: 3px;" v-if="roleID === '1' || roleID === '2'">
				<v-list-item
					router to="/dataAdministrator"
					class="SelectedMenu"
					active-class="SelectedMenu-active"
				>
					<v-icon left middle>person</v-icon>
					<v-list-item-title>
						<span>Data Administrator</span>
					</v-list-item-title>
				</v-list-item>
			</v-list>
			<v-list dense style="padding: 0px; margin-left: 3px;">
				<v-list-item
					router to="/dataBiodata"
					class="SelectedMenu"
					active-class="SelectedMenu-active"
				>
					<v-icon left middle>person</v-icon>
					<v-list-item-title>
						<span>Data Biodata</span>
					</v-list-item-title>
				</v-list-item>
			</v-list>
			<v-spacer />
			<v-menu
				open-on-hover
				rounded="t-xs b-lg"
				offset-y
				transition="slide-y-transition"
				bottom
			>
				<template v-slot:activator="{ attrs, on }">
					<span
						class="white--text ma-3 UserPanel"
						v-bind="attrs"
						v-on="on"
					>
						{{ inisialuppercaseLetterFirst(nama) }}
						<v-avatar size="35">
							<v-img :src="fotoProfil"></v-img>
						</v-avatar>
					</span>
				</template>

				<v-list dense>
					<!-- <v-list-item
						v-if="roleID === '1'"
						router to="/settings"
						class="SelectedMenu"
						active-class="SelectedMenu-active"
						>
						<v-list-item-title>
							<span>Pengaturan</span>
						</v-list-item-title>
						<v-icon right>settings</v-icon>
					</v-list-item> -->
					<v-list-item
						router to="/profile"
						class="SelectedMenu"
						active-class="SelectedMenu-active"
					>
						<v-list-item-title>
							<span>Profil</span>
						</v-list-item-title>
						<v-icon right>person</v-icon>
					</v-list-item>
					<v-list-item
						@click="keluar()"
						class="SelectedMenu"
						active-class="SelectedMenu-active"
					>
						<v-list-item-title>
							<span>Keluar</span>
						</v-list-item-title>
						<v-icon right>exit_to_app</v-icon>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
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
	</nav>
</template>

<script>
import { mapActions } from "vuex";
import PopUpNotifikasiVue from "../views/Layout/PopUpNotifikasi.vue";
export default {
	components: {
    PopUpNotifikasiVue
  },
	data: () => ({
		fotoProfil: '',
		roleID: '',
		nama: '',

		//notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
	}),
	mounted() {
		if(!localStorage.getItem('user_token')) return this.$router.push({name: 'Login'});
		this.fotoProfil = localStorage.getItem('fotoProfil')
		this.nama = localStorage.getItem('nama')
		this.roleID = localStorage.getItem('roleID')
	},
	methods: {
		...mapActions(["fetchData"]),
		keluar() {
			this.notifikasi("question", "Apakah anda yakin ingin keluar ?", "2")
		},
		goToProses(){
			localStorage.removeItem('user_token');
			localStorage.removeItem('nama');
			localStorage.removeItem('nama_role');
			localStorage.removeItem('idLogin');
			localStorage.removeItem('roleID');
			localStorage.removeItem('fotoProfil');
			localStorage.removeItem('jabatan_guru');
			localStorage.removeItem('mengajar_bidang');
			localStorage.removeItem('mengajar_kelas');
			localStorage.removeItem('wali_kelas');
			localStorage.removeItem('kelas');
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
.menufont {
	font-size: 11px !important;
	color: #FFFFFF;
}
.SelectedTile:hover {
	border-radius: 2px;
	background: #44a4d0ae;
	color: white;
}
.SelectedTile-active {
	border-radius: 2px;
	background: rgba(10, 204, 117, 0.694);
	color: white;
}
.SelectedMenu:hover {
	border-radius: 2px;
	background: #939494;
	cursor: pointer;
}
.SelectedMenu-active {
	border-radius: 2px;
	background: rgba(132, 131, 195, 0.19);
	cursor: pointer;
}
.SelectedMenuNotif:hover {
	border-radius: 2px;
	background: #939494;
	cursor: pointer;
}
.SelectedMenuNotif-active {
	border-radius: 2px;
	background: rgba(132, 131, 195, 0.19);
	cursor: pointer;
}
.badgeNotif {
	cursor: pointer;
}
.UserPanel {
	cursor: pointer;
}
.scrollNotif{
  max-height: 500px !important;
  overflow-y: auto !important;
}
.judulNotif {
	margin-bottom: 1px !important;
	font-size: 14px;
	font-weight: bold;
}
.pesanNotif {
	margin-bottom: 1px !important;
	font-size: 12px;
	font-weight: 500;
	text-align: justify;
}
.tanggalNotif {
	margin-bottom: 1px !important;
	font-size: 10px;
	font-weight: 500;
	text-align: right;
	font-style: italic;
}
.kondisiNotif {
	margin-bottom: 1px !important;
	font-size: 10px;
	text-align: right;
	font-style: italic;
}
.theme--dark.v-icon {
	color: #FFFFFF !important;
}
.v-list-item {
	padding: 0px 6px !important;
}
.v-icon--left {
	margin-right: 5px;
}
.theme--dark.v-list {
	background: #272727 !important;
}
.box{
	width: 75px;
	height: 20px;
  /* background-image:-moz-linear-gradient(top, #272727, #5a5757); */
	/* background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#272727), to(#5a5757), color-stop(1,#5a5757)); */
	margin: 2px;
  color: #FFF;
}
.fourcorners{
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	-khtml-border-radius: 5px; 
	border-radius: 5px;
	padding: 5px;
	text-align: center;
	font-size: 10px;
}
</style>