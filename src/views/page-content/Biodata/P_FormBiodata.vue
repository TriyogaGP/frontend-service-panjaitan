<template>
  <div>
    <h1 class="subheading grey--text">{{ kondisi !== 'DETAIL' ? 'Formulir Biodata' : 'Detail Data Biodata'}}</h1>
    <div class="text-right wadah">
      <span @click="gotolist2()" class="link">Data Biodata</span>
      <v-icon small class="iconstyle">fa-solid fa-chevron-right</v-icon>
      <span>{{ kondisi !== 'DETAIL' ? 'Formulir Biodata' : 'Detail Data Biodata'}}</span>
    </div>
    <v-card class="mb-0 pa-8" outlined elevation="0">
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
					<v-row no-gutters>
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-start"
						>
							<v-text-field
								v-model="inputData.namaLengkap"
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
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-start pl-3"
						>
							<v-autocomplete
								v-model="inputData.statusMeninggal"
								:items="statusMeninggalOptions"
								item-text="text"
								item-value="value"
								placeholder="Status Meninggal"
								label="Status Meninggal"
								outlined
								dense
								color="light-black darken-3"
								hide-details
								:clearable="kondisi !== 'DETAIL' ? true : false"
								:readonly="kondisi !== 'DETAIL' ? false : true"
							/>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Tempat, Tanggal Lahir
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-row no-gutters>
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-center align-center"
						>
							<v-text-field
								v-model="inputData.tempat"
								placeholder="Tempat Lahir"
								outlined
								dense
								label="Tempat Lahir"
								color="light-black darken-3"
								hide-details
								:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-start pl-3"
						>
							<DatePicker
								v-model="inputData.tanggalLahir" 
								circle
								lang="id"
								position="bottom left"
								:date-format="{
									day: '2-digit',
									month: '2-digit',
									year: 'numeric'
								}"
								placeholder="Tanggal Lahir"
							/>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Alamat
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-textarea
						v-model="inputData.alamat"
						placeholder="Alamat"
						outlined
						dense
						rows="4"
						label="Alamat"
						color="light-black darken-3"
						hide-details
						:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
						no-resize
					/>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Provinsi
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputData.provinsi"
						:items="ProvinsiOptions"
						item-text="text"
						item-value="value"
						placeholder="Provinsi"
						label="Provinsi"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
						@change="wilayah('provinsi', $event)"
					/>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Kabupaten / Kota
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputData.kabKota"
						:items="KabKotaOptions"
						item-text="text"
						item-value="value"
						placeholder="Kabupaten / Kota"
						label="Kabupaten / Kota"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
						:disabled="inputData.provinsi ? false : true"
						@change="wilayah('kabkota', $event)"
					/>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Kecamatan
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputData.kecamatan"
						:items="KecamatanOptions"
						item-text="text"
						item-value="value"
						placeholder="Kecamatan"
						label="Kecamatan"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
						:disabled="inputData.kabKota ? false : true"
						@change="wilayah('kecamatan', $event)"
					/>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Kelurahan
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputData.kelurahan"
						:items="KelurahanOptions"
						item-text="text"
						item-value="value"
						placeholder="Kelurahan"
						label="Kelurahan"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
						:disabled="inputData.kecamatan ? false : true"
						@change="wilayah('kelurahan', $event)"
					/>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Kode Pos
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputData.kodePos"
						placeholder="Kode Pos"
						outlined
						dense
						label="Kode Pos"
						color="light-black darken-3"
						hide-details
						disabled
					/>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Pekerjaan
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputData.pekerjaan"
						:items="pekerjaanOptions"
						item-text="label"
						item-value="kode"
						placeholder="Pekerjaan"
						label="Pekerjaan"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
					/>
				</v-col>
			</v-row>
			<v-row no-gutters v-if="inputData.pekerjaan === 18">
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Pekerjaan Lainnya
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputData.pekerjaanLainnya"
						placeholder="Pekerjaan Lainnya"
						outlined
						dense
						label="Pekerjaan Lainnya"
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
					Telepon
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputData.telp"
						placeholder="Telepon"
						outlined
						dense
						label="Telepon"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 15, inputData.telp)"
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
					Nama Istri
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputData.namaIstri"
						placeholder="Nama Istri"
						outlined
						dense
						label="Nama Istri"
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
					Pekerjaan Istri
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputData.pekerjaanIstri"
						:items="pekerjaanOptions"
						item-text="label"
						item-value="kode"
						placeholder="Pekerjaan Istri"
						label="Pekerjaan Istri"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
					/>
				</v-col>
			</v-row>
			<v-row no-gutters v-if="inputData.pekerjaanIstri === 18">
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Pekerjaan Istri Lainnya
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputData.pekerjaanIstriLainnya"
						placeholder="Pekerjaan Istri Lainnya"
						outlined
						dense
						label="Pekerjaan Istri Lainnya"
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
					Nama Anak
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-row no-gutters class="mb-2">
						<v-col cols="12" md="12">
							<v-text-field
								v-model="inputData.anak[0]"
								placeholder="Nama Anak 1"
								outlined
								dense
								label="Nama Anak 1"
								color="light-black darken-3"
								hide-details
								:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
							/>
						</v-col>
					</v-row>
					<v-row no-gutters class="mb-2">
						<v-col cols="12" md="12">
							<v-text-field
								v-model="inputData.anak[1]"
								placeholder="Nama Anak 2"
								outlined
								dense
								label="Nama Anak 2"
								color="light-black darken-3"
								hide-details
								:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
							/>
						</v-col>
					</v-row>
					<v-row no-gutters class="mb-2">
						<v-col cols="12" md="12">
							<v-text-field
								v-model="inputData.anak[2]"
								placeholder="Nama Anak 3"
								outlined
								dense
								label="Nama Anak 3"
								color="light-black darken-3"
								hide-details
								:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
							/>
						</v-col>
					</v-row>
					<v-row no-gutters class="mb-2">
						<v-col cols="12" md="12">
							<v-text-field
								v-model="inputData.anak[3]"
								placeholder="Nama Anak 4"
								outlined
								dense
								label="Nama Anak 4"
								color="light-black darken-3"
								hide-details
								:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
							/>
						</v-col>
					</v-row>
					<v-row no-gutters>
						<v-col cols="12" md="12">
							<v-text-field
								v-model="inputData.anak[4]"
								placeholder="Nama Anak 5"
								outlined
								dense
								label="Nama Anak 5"
								color="light-black darken-3"
								hide-details
								:clearable="kondisi !== 'DETAIL' ? true : false"
						:readonly="kondisi !== 'DETAIL' ? false : true"
							/>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Jabatan Pengurus
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputData.jabatanPengurus"
						placeholder="Jabatan Pengurus"
						outlined
						dense
						label="Jabatan Pengurus"
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
					Komisaris Wilayah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputData.komisarisWilayah"
						placeholder="Komisaris Wilayah"
						outlined
						dense
						label="Komisaris Wilayah"
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
					Nama Ketua Komisaris
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputData.namaKetuaKomisaris"
						placeholder="Nama Ketua Komisaris"
						outlined
						dense
						label="Nama Ketua Komisaris"
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
					Ompu
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputData.ompu"
						:items="ompuOptions"
						item-text="label"
						item-value="kode"
						placeholder="Ompu"
						label="Ompu"
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
					Foto Profil
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
				<div class="d-flex flex-column justify-space-between">
					<div v-if="kondisi !== 'DETAIL'" class="avatar" @click="pilihFile()">
						<span class="tulisan">
							<v-icon small color="white">fa-solid fa-camera</v-icon>&nbsp;Ubah Foto Profil
						</span>
						<v-img :src="inputData.fotoProfil" />
					</div>
					<div v-else class="avatar">
						<v-img :src="inputData.fotoProfil" />
					</div>
					<input 
						v-if="kondisi !== 'DETAIL'"
						ref="fotoProfile"
						:key="componentKey"
						type="file"
						accept="image/*"
						style="display: none"
						@change="uploadFotoProfile($event)"
					>
				</div>
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
					@click="gotolist2()"
				>
					Kembali Ke List
				</v-btn>
			</v-col>
		</v-row>
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
        @proses="gotolist"
        @cancel="dialogNotifikasi = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import PopUpNotifikasiVue from "../../Layout/PopUpNotifikasi.vue";
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
  name: 'FormulirBiodata',
  components: {
    PopUpNotifikasiVue, Cropper, CircleStencil, RectangleStencil
  },
  data: () => ({
    inputData: {
      idBiodata: '',
      namaLengkap: '',
      tempat: '',
      tanggalLahir: '',
      alamat: '',
      provinsi: '',
      kabKota: '',
      kecamatan: '',
      kelurahan: '',
      kodePos: '',
      pekerjaan: '',
      pekerjaanLainnya: '',
      telp: '',
      namaIstri: '',
      pekerjaanIstri: '',
      pekerjaanIstriLainnya: '',
      anak: [],
      jabatanPengurus: '',
      wilayah: '',
      komisarisWilayah: '',
      namaKetuaKomisaris: '',
      ompu: '',
      statusMeninggal: '',
      fotoProfil: '',
    },
		tempfotoProfil: '',
    BASE_URL: '',
		urlSk: window.location.href,
		componentKey: 0,
    dialogCrop: false,
    image: {
      src: null,
      type: null,
    },
    FileFotoProfil: '',
    fotoProfil: '',
		anakTampung: [],
    kondisi: '',
    passType: '',
    endecryptType: '',
    kondisiTombol: true,
		statusMeninggalOptions: [
			{ text: 'Sudah Meninggal', value: 1 },
			{ text: 'Belum Meninggal', value: 0 },
		],

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Formulir Biodata - SISTEM DATABASE KEPENDUDUKAN PANJAITAN",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  computed: {
		...mapState([
			'wilayahpanjaitanOptions',
			'ompuOptions',
			'pekerjaanOptions',
			'ProvinsiOptions',
			'KabKotaOptions',
			'KecamatanOptions',
			'KelurahanOptions',
		]),
    ...mapGetters(['biodata']),
  },
  watch: {
		inputData: {
			deep: true,
			handler(value) {
				if(value.namaLengkap != '' && value.tempat != '' && value.tanggalLahir != '' && value.alamat != '' && value.pekerjaan != '' && value.wilayah != '' && value.ompu != ''){
					this.kondisiTombol = false
				}else{
					this.kondisiTombol = true
				}
			}
		},
		biodata: {
			deep: true,
			handler(value) {
        if(this.kondisi === 'EDIT' || this.kondisi === 'DETAIL'){
  				this.getData(value)
        }
			}
		},
	},
  mounted() {
    this.inputData.idBiodata = this.$route.params.uid;
    this.kondisi = this.$route.params.kondisi;
    if(this.kondisi === 'EDIT' || this.kondisi === 'DETAIL'){
      this.getBiodatabyUID(this.inputData.idBiodata)
		}
		this.BASE_URL = process.env.VUE_APP_NODE_ENV === "production" ? process.env.VUE_APP_VIEW_PROD_API_URL : process.env.VUE_APP_VIEW_DEV_API_URL
		this.inputData.fotoProfil = this.BASE_URL+'bahan/user.png'
    this.getWilayahPanjaitan()
    this.getOmpu()
    this.getPekerjaan()
		this.getWilayah({ bagian: 'provinsi', KodeWilayah: null })
  },
	methods: {
		...mapActions(["fetchData", "getOmpu", "getWilayahPanjaitan", "getPekerjaan", "getWilayah", "getBiodatabyUID"]),
		...mapActions({
      uploadFiles: "upload/uploadFiles",
    }),
    getData(biodata){
			biodata.anak.map(val => {
				this.anakTampung.push(val.namaAnak)
			})
      this.inputData = {
				idBiodata: biodata.idBiodata,
				namaLengkap: biodata.namaLengkap,
				tempat: biodata.tempat,
				tanggalLahir: biodata.tanggalLahir,
				alamat: biodata.alamat,
				provinsi: biodata.provinsi,
				kabKota: biodata.kabKota,
				kecamatan: biodata.kecamatan,
				kelurahan: biodata.kelurahan,
				kodePos: biodata.kodePos,
				pekerjaan: biodata.pekerjaan.kode,
				pekerjaanLainnya: biodata.pekerjaanLainnya,
				telp: biodata.telp,
				namaIstri: biodata.namaIstri,
				pekerjaanIstri: biodata.pekerjaanIstri.kode,
				pekerjaanIstriLainnya: biodata.pekerjaanIstriLainnya,
				anak: this.anakTampung,
				jabatanPengurus: biodata.jabatanPengurus,
				wilayah: biodata.wilayah.kode,
				komisarisWilayah: biodata.komisarisWilayah,
				namaKetuaKomisaris: biodata.namaKetuaKomisaris,
				ompu: biodata.ompu.kode,
				statusMeninggal: biodata.statusMeninggal === false ? 0 : 1,
				fotoProfil: biodata.fotoProfil,
			}
			this.tempfotoProfil = this.inputData.fotoProfil
			this.getWilayah({ bagian: 'kabkota', KodeWilayah: this.inputData.provinsi })
			this.getWilayah({ bagian: 'kecamatan', KodeWilayah: this.inputData.kabKota })
			this.getWilayah({ bagian: 'kelurahan', KodeWilayah: this.inputData.kecamatan })
    },
    async simpanData(){
      let bodyData = {
        jenis: this.kondisi,
        idBiodata: this.inputData.idBiodata,
				namaLengkap: this.inputData.namaLengkap,
				tempat: this.inputData.tempat,
				tanggalLahir: this.convertDateToPicker2(this.inputData.tanggalLahir),
				alamat: this.inputData.alamat,
				provinsi: this.inputData.provinsi,
				kabKota: this.inputData.kabKota,
				kecamatan: this.inputData.kecamatan,
				kelurahan: this.inputData.kelurahan,
				kodePos: this.inputData.kodePos,
				pekerjaan: this.inputData.pekerjaan,
				pekerjaanLainnya: this.inputData.pekerjaanLainnya,
				telp: this.inputData.telp,
				namaIstri: this.inputData.namaIstri,
				pekerjaanIstri: this.inputData.pekerjaanIstri,
				pekerjaanIstriLainnya: this.inputData.pekerjaanIstriLainnya,
				anak: this.inputData.anak,
				jabatanPengurus: this.inputData.jabatanPengurus,
				wilayah: this.inputData.wilayah,
				komisarisWilayah: this.inputData.komisarisWilayah,
				namaKetuaKomisaris: this.inputData.namaKetuaKomisaris,
				ompu: this.inputData.ompu,
				fotoProfil: this.fotoProfil,
				statusMeninggal: this.inputData.statusMeninggal,
      }
      let payload = {
				method: "post",
				url: `user/biodata`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then(async(res) => {
				if(this.FileFotoProfil){
					let uploadFotoProfil = await this.uploadLampiran(this.inputData.idBiodata, this.FileFotoProfil)
					if(uploadFotoProfil != undefined){ 
						this.notifikasi("success", res.data.message, "2")
					}else{ 
						this.notifikasi("error", 'Gagal simpan proses data', "1")
					}
				}else{
					this.notifikasi("success", res.data.message, "2")
				}
        // this.notifikasi("success", res.data.message, "2")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
		wilayah(kondisi, e){
			if(kondisi === 'provinsi'){
				if(e){
					this.getWilayah({ bagian: 'kabkota', KodeWilayah: e })
					this.inputData.kabKota = ''
					this.inputData.kecamatan = ''
					this.inputData.kelurahan = ''
					this.inputData.kodePos = ''
				}
			}else if(kondisi === 'kabkota'){
				if(e){
					this.getWilayah({ bagian: 'kecamatan', KodeWilayah: e })
					if(e !== this.inputData.kecamatan) {
						this.inputData.kelurahan = ''
						this.inputData.kodePos = ''	
					}
				}else{
					this.inputData.kecamatan = ''
					this.inputData.kelurahan = ''
					this.inputData.kodePos = ''
				}
			}else if(kondisi === 'kecamatan'){
				if(e){
					this.getWilayah({ bagian: 'kelurahan', KodeWilayah: e })
					if(e !== this.inputData.kelurahan) {
						this.inputData.kodePos = ''	
					}
				}else{
					this.inputData.kelurahan = ''
					this.inputData.kodePos = ''
				}
			}else if(kondisi === 'kelurahan'){
				if(e){
					let data = this.KelurahanOptions.filter(str => str.value === e)
					if(this.$route.params.kondisi === 'ADD'){
						this.inputData.kodePos = data[0].kodePos
					}else if(this.$route.params.kondisi === 'EDIT'){
						this.inputData.kodePos = this.inputData.kodePos ? data.length ? data[0].kodePos : this.inputData.kodePos : data[0].kodePos
					}
				}else{
					this.inputData.kodePos = ''
				}
			}
		},
    kosongData() {
      this.inputData = {
				idBiodata: '',
				namaLengkap: '',
				tempat: '',
				tanggalLahir: '',
				alamat: '',
				provinsi: '',
				kabKota: '',
				kecamatan: '',
				kelurahan: '',
				kodePos: '',
				pekerjaan: '',
				pekerjaanLainnya: '',
				telp: '',
				namaIstri: '',
				pekerjaanIstri: '',
				pekerjaanIstriLainnya: '',
				jabatanPengurus: '',
				wilayah: '',
				komisarisWilayah: '',
				namaKetuaKomisaris: '',
				ompu: '',
				fotoProfil: '',
				statusMeninggal: '',
			}
			this.$refs.fotoProfile.value = null
			this.FileFotoProfil = ''
			this.fotoProfil = ''
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
			this.FileFotoProfil = files
      this.fotoProfil = files.name
      this.loadImage(this.FileFotoProfil)
    },
    loadImage(files) {
      this.dialogCrop = true
      const blob = URL.createObjectURL(files);
      const reader = new FileReader();
      reader.onload = (e) => {
				this.inputData.fotoProfil = blob
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
			}, this.image.type);
			this.dialogCrop = false
		},
    tutupDialogCrop(){
      this.FileFotoProfil = ''
      this.fotoProfil = '';
      this.$refs.fotoProfile.value = null
			if(this.kondisi === 'ADD') {
				this.inputData.fotoProfil = this.BASE_URL+'bahan/user.png'
			}else if(this.kondisi === 'EDIT'){
				this.inputData.fotoProfil = this.tempfotoProfil
			}
      this.dialogCrop = false
    },
    async uploadLampiran(idBiodata, dataUpload) {
			if(dataUpload){
				const bodyData = {
					UserID: idBiodata,
					field: 'fotoprofil',
					nama_folder: idBiodata,
					nama_file: `${idBiodata}-fotoprofil`,
					jenis: "image",
					bagian: "berkas",
					table: "Biodata",
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
    gotolist() {
			this.kosongData()
      this.$router.push({name: "DataBiodata"});
    },
    gotolist2() {
      this.$router.push({name: "DataBiodata"});
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
.avatar {
  border: solid 2px #000000;
  border-radius: 50%;
  align-items: center;
  display: flex;
  justify-content: center;
  line-height: normal;
  position: relative;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  width: 120px;
  height: 120px;
  cursor: pointer;
}
.avatar:hover {
  border: solid 2px #000000;
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
  width: 120px;
  height: 30px;
}
.cropper {
  height: 450px !important;
}
</style>
<style>
.v-text-field.v-input--dense {
  font-size: 13px !important;
}
.v-calendar .input-field input {
	width: 390px !important;
	height: 42px !important;
}
</style>