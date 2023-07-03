<template>
  <div>
    <h1 class="subheading grey--text">{{ kondisi !== 'DETAIL' ? 'Formulir Administrator' : 'Detail Data Administrator'}}</h1>
    <div class="text-right wadah">
      <span @click="gotolist()" class="link">Data Administrator</span>
      <v-icon small class="iconstyle">fa-solid fa-chevron-right</v-icon>
      <span>{{ kondisi !== 'DETAIL' ? 'Formulir Administrator' : 'Detail Data Administrator'}}</span>
    </div>
    <v-card class="mb-0 pa-8" outlined elevation="0">
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Consumer Type
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputData.consumerType"
						:items="levelOptions"
						item-text="text"
						item-value="value"
						placeholder="Consumer Type"
						label="Consumer Type"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
					/>
				</v-col>
			</v-row>
			<v-row no-gutters v-if="inputData.consumerType === 3">
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Wilayah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputData.wilayah"
						:items="wilayahpanjaitanOptions"
						item-text="label"
						item-value="kode"
						placeholder="Wilayah"
						label="Wilayah"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
					/>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Nama Lengkap
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputData.nama"
						placeholder="Nama Lengkap"
						outlined
						dense
						label="Nama Lengkap"
						color="light-black darken-3"
						hide-details
						:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
					/>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Username
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputData.username"
						placeholder="Username"
						outlined
						dense
						label="Username"
						color="light-black darken-3"
						hide-details
						:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
					/>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Kata Sandi
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputData.password"
						placeholder="Kata Sandi"
						:type="passType ? 'text' : 'password'"
						outlined
						dense
						label="Kata Sandi"
						color="light-black darken-3"
						hide-details
						:readonly="kondisi !== 'DETAIL' ? false : true"
					>
						<template v-slot:append>
							<v-icon
								class="mr-1"
								color="light-black darken-3"
								tabindex="-1"
								@click="onClickVisible('passType')"
								>{{ passType ? 'visibility' : 'visibility_off' }}</v-icon
							>
							<v-icon
								color="light-black darken-3"
								tabindex="-1"
								@click="endecryptData('endecryptType', kondisi)"
								>{{ endecryptType ? 'lock' : 'lock_open' }}</v-icon
							>
						</template>
					</v-text-field>
				</v-col>
			</v-row>
		</v-card>
		<v-row no-gutters>
			<v-col cols="12" class="float-right">
				<v-btn
          v-if="kondisi !== 'DETAIL'"
					color="#00479b"
					class="float-right mt-3 white--text text--darken-2"
					small
					:disabled="kondisiTombol"
					@click="simpanData()"
				>
					Selanjutnya
				</v-btn>
				<!-- <v-btn
          v-if="kondisi !== 'DETAIL'"
					color="#82817d"
					class="float-right mr-4 mt-3"
					dark
					small
					@click="kosongData()"
				>
					Batal
				</v-btn> -->
				<v-btn
					color="#9b1f15"
					class="float-right mr-4 mt-3"
					dark
					small
					@click="gotolist()"
				>
					Kembali Ke List
				</v-btn>
			</v-col>
		</v-row>
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
        @proses="gotolist"
        @cancel="dialogNotifikasi = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import PopUpNotifikasiVue from "../../Layout/PopUpNotifikasi.vue";
export default {
  name: 'FormulirAdministrator',
  components: {
    PopUpNotifikasiVue
  },
  data: () => ({
    inputData: {
      idAdmin: '',
      consumerType: '',
      wilayah: '',
      nama: '',
      username: '',
      password: '',
    },
    levelOptions: [
			{ text: 'Super Administrator', value: 1 },
			{ text: 'Administrator Pusat', value: 2 },
			{ text: 'Administrator Wilayah', value: 3 },
		],
    kondisi: '',
    passType: '',
    endecryptType: '',
    kondisiTombol: true,

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Formulir Administrator - SISTEM DATABASE KEPENDUDUKAN PANJAITAN",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  computed: {
		...mapState(['wilayahpanjaitanOptions']),
    ...mapGetters(['administrator']),
  },
  watch: {
		inputData: {
			deep: true,
			handler(value) {
				if(value.nama != '' && value.consumerType != '' && value.username != '' && value.password != ''){
					this.kondisiTombol = false
				}else{
					this.kondisiTombol = true
				}
			}
		},
		administrator: {
			deep: true,
			handler(value) {
        if(this.kondisi === 'EDIT' || this.kondisi === 'DETAIL'){
  				this.getData(value)
        }
			}
		},
	},
  mounted() {
    this.inputData.idAdmin = this.$route.params.uid;
    this.kondisi = this.$route.params.kondisi;
    if(this.kondisi === 'EDIT' || this.kondisi === 'DETAIL'){
      this.getAdminbyUID(this.inputData.idAdmin)
		}
    this.getWilayahPanjaitan()
  },
	methods: {
		...mapActions(["fetchData", "getWilayahPanjaitan", "getAdminbyUID"]),
    getData(administrator){
      this.inputData = {
        idAdmin: administrator.idAdmin,
        consumerType: administrator.consumerType,
        wilayah: administrator.kodeWilayah,
        nama: administrator.nama,
        username: administrator.username,
        password: administrator.kataSandi,
      }
    },
    simpanData(){
      let bodyData = {
        jenis: this.kondisi,
        idAdmin: this.inputData.idAdmin,
        consumerType: this.inputData.consumerType,
        wilayah: this.inputData.consumerType === 3 ? this.inputData.wilayah : '00',
        nama: this.inputData.nama,
        username: this.inputData.username,
        password: this.inputData.password,
      }
      let payload = {
				method: "post",
				url: `user/admin`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.notifikasi("success", res.data.message, "2")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    kosongData() {
      this.inputData = {
        idAdmin: '',
        consumerType: '',
        wilayah: '',
        nama: '',
        username: '',
        password: '',
      }
    },
    gotolist() {
			this.kosongData()
      this.$router.push({name: "DataAdministrator"});
    },
    onClickVisible(d) {
      this[d] = !this[d]
    },
    endecryptData(d, kondisi) {
      this[d] = !this[d]
      let url = kondisi === 'EDIT' ? this[d] ? 'decryptPass' : 'encryptPass' : this[d] ? 'encryptPass' : 'decryptPass' 
      let payload = {
        method: "get",
        url: `settings/${url}?kata=${this.inputData.password}`,
        authToken: localStorage.getItem('user_token')
      };
      this.inputData.password = ''
      this.fetchData(payload)
      .then((res) => {
        this.inputData.password = res.data.result.hasil;
      })
      .catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
      });
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

<style scoped>
.wadah {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
}
.iconstyle {
  margin-left: 5px;
  margin-right: 5px;
}
.link {
  color: #000;
  cursor: pointer;
  text-decoration: none;
}
.link:hover {
  color: #6fe484;
  cursor: pointer;
  text-decoration: underline;
}
.v-input .v-label {
  font-size: 11pt !important;
}
.v-text-field.v-input--dense {
  font-size: 13px !important;
}
</style>