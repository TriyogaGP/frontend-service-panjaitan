<template>
  <div>
    <h1 class="subheading grey--text">{{ kondisi !== 'DETAIL' ? 'Formulir Biodata' : 'Detail Data Biodata'}}</h1>
    <div class="text-right wadah">
      <span @click="gotolist()" class="link">Data Biodata</span>
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
  name: 'FormulirBiodata',
  components: {
    PopUpNotifikasiVue
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
    },
		anakTampung: [],
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
    this.getWilayahPanjaitan()
    this.getOmpu()
    this.getPekerjaan()
		this.getWilayah({ bagian: 'provinsi', KodeWilayah: null })
  },
	methods: {
		...mapActions(["fetchData", "getOmpu", "getWilayahPanjaitan", "getPekerjaan", "getWilayah", "getBiodatabyUID"]),
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
				statusMeninggal: biodata.statusMeninggal,
			}
			this.getWilayah({ bagian: 'kabkota', KodeWilayah: this.inputData.provinsi })
			this.getWilayah({ bagian: 'kecamatan', KodeWilayah: this.inputData.kabKota })
			this.getWilayah({ bagian: 'kelurahan', KodeWilayah: this.inputData.kecamatan })
    },
    simpanData(){
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
				statusMeninggal: this.inputData.statusMeninggal,
      }
      let payload = {
				method: "post",
				url: `user/biodata`,
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
				statusMeninggal: '',
			}
    },
    gotolist() {
			this.kosongData()
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