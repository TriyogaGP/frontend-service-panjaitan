<template>
  <div>
    <v-card class="ma-1" style="border: 1px solid #000; border-radius: 5px;">
      <v-row class="ma-1">
        <v-col cols="8" class="kotakleft">
          <v-tabs
            v-model="tab"
            fixed-tabs
            background-color="light-black darken-3"
            dark
          >
            <v-tab v-for="item in itemsTab" :key="item.code" :href="`#${item.code}`">
              <v-icon left>
                {{ item.icon }}
              </v-icon>
              {{ item.text }}
            </v-tab>
            <v-tab-item value="1">
              <div class="customScrollLeft">
                <div class="text-right">
                  <v-btn
                    color="#0bd369"
                    small
                    dense
                    depressed
                    class="white--text text--darken-2 mt-2"
                    @click="kondisiForm = !kondisiForm"
                  >
                    <v-icon small>{{ kondisiForm ? 'visibility_off' : 'visibility' }}</v-icon>&nbsp;Ubah Data Diri
                  </v-btn>
                </div>
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
                    {{ previewData.namaRole }}
                  </v-col>
                </v-row>
                <v-row no-gutters>
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
                    {{ previewData.wilayah }}
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
                    <span v-if="kondisiForm" v-html="previewData.nama"></span>
                    <v-text-field
                      v-else
                      v-model="inputAdministrator.nama"
                      placeholder="Nama Lengkap"
                      outlined
                      dense
                      label="Nama Lengkap"
                      color="light-black darken-3"
                      hide-details
                      clearable
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
                    <span v-if="kondisiForm" v-html="previewData.username"></span>
                    <v-text-field
                      v-else
                      v-model="inputAdministrator.username"
                      placeholder="Username"
                      outlined
                      dense
                      label="Username"
                      color="light-black darken-3"
                      hide-details
                      clearable
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
                    {{ previewData.password }}&nbsp;
                    <v-icon
                      color="light-black darken-3"
                      tabindex="-1"
                      @click="endecryptData('endecryptType')"
                      >{{ endecryptType ? 'lock' : 'lock_open' }}</v-icon
                    >
                  </v-col>
                </v-row>
                <div class="text-right">
                  <v-btn
                    v-if="!kondisiForm"
                    color="#0bd369"
                    small
                    dense
                    depressed
                    class="white--text text--darken-2 mt-2"
                    @click="SimpanDataProfile()"
                  >
                    Simpan Data
                  </v-btn>
                </div>
              </div>
            </v-tab-item>
            <v-tab-item value="2">
              <div class="customScrollLeft">
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    md="4"
                    class="pt-2 d-flex align-center"
                  >
                    Kata Sandi Lama
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                    class="pt-3"
                  >
                    <v-text-field
                      v-model="authData.passwordLama"
                      placeholder="Kata Sandi Lama"
                      :type="passTypeLama ? 'text' : 'password'"
                      outlined
                      dense
                      label="Kata Sandi Lama"
                      color="light-black darken-3"
                      hide-details
                      clearable
                    >
                      <template v-slot:append>
                        <v-icon
                          class="mr-1"
                          color="light-black darken-3"
                          tabindex="-1"
                          @click="onClickVisible('passTypeLama')"
                          >{{ passTypeLama ? 'visibility' : 'visibility_off' }}</v-icon
                        >
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    md="4"
                    class="pt-2 d-flex align-center"
                  >
                    Kata Sandi Baru
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                    class="pt-3"
                  >
                    <v-text-field
                      v-model="authData.passwordBaru"
                      placeholder="Kata Sandi Baru"
                      :type="passTypeBaru ? 'text' : 'password'"
                      outlined
                      dense
                      label="Kata Sandi Baru"
                      color="light-black darken-3"
                      hide-details
                      clearable
                    >
                      <template v-slot:append>
                        <v-icon
                          class="mr-1"
                          color="light-black darken-3"
                          tabindex="-1"
                          @click="onClickVisible('passTypeBaru')"
                          >{{ passTypeBaru ? 'visibility' : 'visibility_off' }}</v-icon
                        >
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    md="4"
                    class="pt-2 d-flex align-center"
                  >
                    Kata Sandi Konfirmasi Baru
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                    class="pt-3"
                  >
                    <v-text-field
                      v-model="authData.passwordConfBaru"
                      placeholder="Kata Sandi Konfirmasi Baru"
                      :type="passTypeConfBaru ? 'text' : 'password'"
                      outlined
                      dense
                      label="Kata Sandi Konfirmasi Baru"
                      color="light-black darken-3"
                      hide-details
                      clearable
                    >
                      <template v-slot:append>
                        <v-icon
                          class="mr-1"
                          color="light-black darken-3"
                          tabindex="-1"
                          @click="onClickVisible('passTypeConfBaru')"
                          >{{ passTypeConfBaru ? 'visibility' : 'visibility_off' }}</v-icon
                        >
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <div class="text-right mt-2">
                  <v-btn
                    color="light-black darken-3"
                    class="white--text text--darken-2"
                    small
                    dense
                    depressed
                    :disabled="kondisiTombol"
                    @click="UbahKataSandi()"
                    >
                    Ubah Kata Sandi
                  </v-btn>
                </div>
              </div>
            </v-tab-item>
          </v-tabs>
        </v-col>
        <v-col cols="4" class="kotakright">
          <v-layout>
            <v-flex class="mt-2">
              <div class="d-flex flex-column justify-space-between align-center">
                <div class="avatar" @click="pilihFile()">
                  <span class="tulisan">
                    <v-icon small color="white">fa-solid fa-camera</v-icon>&nbsp;Ubah Foto Profil
                  </span>
                  <v-img :src="previewData.fotoProfil" />
                </div>
                <input 
                  ref="fotoProfile"
                  :key="componentKey"
                  type="file"
                  accept="image/*"
                  style="display: none"
                  @change="uploadFotoProfile($event)"
                >
              </div>
              <p class="white--text subheading mt-1 text-center"><strong>{{nama}}</strong></p>
              <p class="white--text text-center">{{namaRole}}</p>
            </v-flex>
          </v-layout>
          <v-divider style="border: 1px solid #FFF" />
        </v-col>
      </v-row>
    </v-card>
    <v-dialog
      v-model="dialogCrop"
      scrollable
      width="700px"
      height="500px"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-text class="pt-4">
          <cropper
            ref="cropper"
            class="cropper"
            :auto-zoom="true"
            :src="image.src"
            stencil-component="circle-stencil"
          />
            <!-- :stencil-size="{
              width: 300,
              height: 300
            }"
            :stencil-props="{
              handlers: {},
              movable: false,
              resizable: false,
              aspectRatio: 1,
            }"
            image-restriction="stencil" -->
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-row 
            no-gutters
            class="mr-3"
          >
            <v-col
              class="text-end"
              cols="12"
            >
              <v-btn
                color="#e6e7e8"
                class="elevation-0 tombol-tutup mr-3"
                @click="tutupDialogCrop()"
              >
                Tutup
              </v-btn>
              <v-btn
                color="#e6e7e8"
                class="elevation-0 tombol-tutup"
                @click="crop"
              >
                Crop Lampiran
              </v-btn>
            </v-col>
          </v-row>  
        </v-card-actions>
      </v-card>
		</v-dialog>
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
import { mapActions, mapState } from "vuex";
import PopUpNotifikasiVue from "./Layout/PopUpNotifikasi.vue";
import PdfCetakan from './Layout/PdfCetakan.vue';
import { Cropper, CircleStencil, RectangleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

function getMimeType(file, fallback = null) {
	const byteArray = (new Uint8Array(file)).subarray(0, 4);
  let header = '';
  for (let i = 0; i < byteArray.length; i++) {
      header += byteArray[i].toString(16);
  }
	switch (header) {
    case "89504e47":
      return "image/png";
      case "47494638":
        return "image/gif";
        case "ffd8ffe0":
          case "ffd8ffe1":
    case "ffd8ffe2":
      case "ffd8ffe3":
        case "ffd8ffe8":
          return "image/jpeg";
    default:
      return fallback;
    }
  }

export default {
  name: 'Profile',
  components: { PopUpNotifikasiVue, PdfCetakan, Cropper, CircleStencil, RectangleStencil },
  data: () => ({
    roleID: '',
    nama: '',
    namaRole: '',
    urlSk: window.location.href,
    BASE_URL: '',
    inputAdministrator: {
      idAdmin: '',
      wilayah: '',
      nama: '',
      username: '',
    },
    previewData: {
      idAdmin: '',
      consumerType: '',
      wilayah: '',
      nama: '',
      username: '',
      password: '',
      fotoProfil: '',
    },
    authData: {
      passwordLama: '',
      passwordBaru: '',
      passwordConfBaru: '',
    },
    kondisiForm: true,
    levelOptions: [
			{ text: 'Super Administrator', value: 1 },
			{ text: 'Administrator Pusat', value: 2 },
			{ text: 'Administrator Wilayah', value: 3 },
		],
    kondisiTombol: true,
    passType: '',
    passTypeLama: '',
    passTypeBaru: '',
    passTypeConfBaru: '',
    endecryptType: '',
    itemsTab: [
			{code: '1', text: 'Data Profile', icon: 'mdi-account'},
			{code: '2', text: 'Ubah Kata Sandi', icon: 'mdi-lock'},
		],
		tab: '',
		componentKey: 0,
    dialogCrop: false,
    image: {
      src: null,
      type: null,
    },
    FileFotoProfil: '',
    fotoProfil: '',

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Profile - SISTEM DATABASE KEPENDUDUKAN PANJAITAN",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  watch:{
		tab:{
			handler(value){
				if (value == '1') {
          this.getProfile()
          this.passType = true
          this.endecryptType = false
          this.clearForm()
        }
			}
		},
    authData: {
      deep: true,
      handler(value){
        if(value.passwordLama == null){ this.authData.passwordLama = '' }
        if(value.passwordBaru == null){ this.authData.passwordBaru = '' }
        if(value.passwordConfBaru == null){ this.authData.passwordConfBaru = '' }
  
        if(value.passwordLama != '' && value.passwordBaru != '' && value.passwordConfBaru != ''){
          this.kondisiTombol = false
        }else{
          this.kondisiTombol = true	
        }
      }
    },
	},
  mounted() {
    this.roleID = localStorage.getItem("roleID")
    this.nama = localStorage.getItem("nama")
    this.namaRole = localStorage.getItem("nama_role")
    this.BASE_URL = process.env.VUE_APP_NODE_ENV === "production" ? process.env.VUE_APP_VIEW_PROD_API_URL : process.env.VUE_APP_VIEW_DEV_API_URL
    this.passType = true
    this.endecryptType = false
    this.passTypeLama = false
    this.passTypeBaru = false
    this.passTypeConfBaru = false
  },
  methods: {
    ...mapActions({
      fetchData: "fetchData",
      uploadFiles: "upload/uploadFiles",
    }),
		getProfile() {
			let payload = {
				method: "put",
				url: `auth/profile`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
				let data = res.data.result;
        this.inputAdministrator = {
          idAdmin: data.idAdmin,
          wilayah: data.kodeWilayah,
          nama: this.uppercaseLetterFirst2(data.nama),
          username: data.username,
        }
        this.previewData = {
          idAdmin: data.idAdmin,
          namaRole: data.namaRole,
          wilayah: data.namaWilayah,
          nama: this.uppercaseLetterFirst2(data.nama),
          username: data.username,
          password: data.kataSandi,
          fotoProfil: data.fotoProfil,
        }

        localStorage.setItem('nama', this.previewData.nama)
        localStorage.setItem('fotoProfil', this.previewData.fotoProfil)
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
		},
    SimpanDataProfile(){
      let bodyData = {
        wilayah: this.inputAdministrator.wilayah,
        nama: this.inputAdministrator.nama,
        username: this.inputAdministrator.username,
      }
      let payload = {
        method: "post",
        url: `auth/ubah-profile`,
        body: bodyData,
        authToken: localStorage.getItem('user_token')
      };
      this.fetchData(payload)
      .then(async (res) => {
        this.kondisiForm = true
        this.clearForm()
        this.getProfile()
        this.notifikasi("success", res.data.message, "2")
      })
      .catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
      });
    },
    UbahKataSandi() {
      let bodyData = {
        passwordLama: this.authData.passwordLama,
        passwordBaru: this.authData.passwordBaru,
        passwordConfBaru: this.authData.passwordConfBaru,
      }
      let payload = {
				method: "post",
				url: `auth/ubah-katasandi`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then(async (res) => {
				this.clearForm()
        this.getProfile()
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    pilihFile() {
      this.$refs.fotoProfile.click();
    },
    async uploadFotoProfile(e) {
      let files = e.target.files[0];
      if(!files) return this.notifikasi("warning", 'Ulangi unggah Foto Profile', "1")
      let ukuran = (files.size / (1024*1024)).toFixed(2);
      if(ukuran > 5.00) { 
        this.componentKey++; 
        return this.notifikasi("warning", 'Unggah Foto Profile anda terlalu besar !', "1")
      }
      this.fotoProfil = files.name
      this.loadImage(files)
    },
    loadImage(files) {
      this.dialogCrop = true
      const blob = URL.createObjectURL(files);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = {
          src: blob,
          type: getMimeType(e.target.result, files.type),
        }
      }
      reader.readAsArrayBuffer(files);
    },
    crop() {
			const { canvas } = this.$refs.cropper.getResult();
			canvas.toBlob(async (blob) => {
        this.FileFotoProfil = blob
        let uploadFotoProfil = await this.uploadLampiran(localStorage.getItem("idLogin"), this.FileFotoProfil)
        if(uploadFotoProfil != undefined){ 
          localStorage.setItem('fotoProfil', `${this.BASE_URL}/image/${uploadFotoProfil.data.result.idAdmin}/${uploadFotoProfil.data.result.namaFile}`)
          this.tutupDialogCrop()
          this.notifikasi("success", "Berhasil ubah Foto Profile", "2")
        }else{ 
          this.componentKey++;
          this.tutupDialogCrop()
          this.notifikasi("error", 'Gagal ubah Foto Profile', "1")
        }
			}, this.image.type);

		},
    tutupDialogCrop(){
      this.FileFotoProfil = ''
      this.fotoProfil = '';
      this.$refs.fotoProfile.value = null
      this.dialogCrop = false
    },
    async uploadLampiran(idAdmin, dataUpload) {
			if(dataUpload){
				const bodyData = {
					UserID: idAdmin,
					field: 'fotoprofil',
					nama_folder: idAdmin,
					nama_file: `${idAdmin}-fotoprofil`,
					jenis: "image",
					bagian: "berkas",
					table: "Admin",
					files: dataUpload,
				};
				try {
					let response = await this.uploadFiles(bodyData);
					return response
				} catch (err) {
					this.notifikasi("error", err.response.data.message, "1")
				}
			}else{
        return undefined
      }
		},
    goToProses() {
      window.location.reload();
    },
    onClickVisible(d) {
      this[d] = !this[d]
    },
    endecryptData(d) {
      this[d] = !this[d]
      let url = this[d] ? 'decryptPass' : 'encryptPass' 
      let payload = {
				method: "get",
				url: `settings/${url}?kata=${this.previewData.password}`,
				authToken: localStorage.getItem('user_token')
			};
      this.previewData.password = ''
			this.fetchData(payload)
			.then((res) => {
				this.previewData.password = res.data.result.hasil;
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    clearForm(){
      this.authData = {
        passwordLama: '',
        passwordBaru: '',
        passwordConfBaru: '',
      }
      this.inputAdministrator = {
        idAdmin: '',
        wilayah: '',
        nama: '',
        username: '',
      }
    },
		notifikasi(kode, text, proses){
      this.dialogNotifikasi = true
      this.notifikasiKode = kode
      this.notifikasiText = text
      this.notifikasiButton = proses
    },
  },
}
</script>
<style>
.v-calendar .input-field input {
	width: 265px !important;
  height: 40px !important;
}
</style>
<style scoped>
.kotakleft {
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
  border-right: 3px solid #4CAF50;
}
.kotakright {
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
  padding: 10px;
  background-color: #272727;
}
.kotak {
	border: 2px dashed #000;
	border-radius: 5px;
	text-align: justify;
	background: #FFF;
	color: #000;
	margin: 5px;
  padding: 5px;
  font-size: 9pt;
}
.v-tab {
	font-size: 8pt !important;
	font-weight: bold !important;
}
.v-input .v-label {
  font-size: 11pt !important;
}
.v-text-field.v-input--dense {
  font-size: 13px !important;
}
.avatar {
  border: solid 2px #FFF;
  border-radius: 50%;
  align-items: center;
  display: flex;
  justify-content: center;
  line-height: normal;
  position: relative;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  width: 185px;
  height: 185px;
  cursor: pointer;
}
.avatar:hover {
  border: solid 2px #FFF;
  opacity: 0.5;
}

.avatar:hover img {
  position: absolute;
  z-index: 1;
}
.tulisan {
  position: absolute;
  visibility: hidden;
}
.avatar:hover .tulisan {
  border-radius: 5px;
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  background: #000000;
  color: #FFF;
  font-size: 12px;
  visibility: visible;
  font-weight: bold;
  z-index: 100;
  width: 185px;
  height: 30px;
}
.cropper {
  height: 450px !important;
}
.customScrollLeft {
  width: 100%;
  height: 500px;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 5px;
  padding: 8px;
  border: 2px solid #000;
	border-radius: 5px;
}

.customScrollLeft::-webkit-scrollbar {
  width: 16px;
}
.customScrollLeft::-webkit-scrollbar-thumb {
  background-color: #4CAF50;
  border: 5px solid #fff;
  border-radius: 10rem;
}
.customScrollLeft::-webkit-scrollbar-track {
  position: absolute;
  right: -3rem;
  top: -50rem;
  background: transparent;
}
.customScrollRight {
  width: 100%;
  height: 270px;
  background: #272727;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 5px;
}

.customScrollRight::-webkit-scrollbar {
  width: 16px;
}
.customScrollRight::-webkit-scrollbar-thumb {
  background-color: #4CAF50;
  border: 5px solid #272727;
  border-radius: 10rem;
}
.customScrollRight::-webkit-scrollbar-track {
  position: absolute;
  right: -3rem;
  top: -50rem;
  /* background: transparent; */
}
</style>