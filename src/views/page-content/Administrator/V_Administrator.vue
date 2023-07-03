<template>
  <div>
    <h1 class="subheading grey--text">Data Administrator</h1>
    <v-card class="mt-2 mb-2 pa-1" outlined elevation="0">
      <v-row no-gutters class="pa-2">
        <v-col cols="12" md="6">
          <v-btn
            color="light-blue darken-3"
            small
            dense
            depressed
            class="ma-2 white--text text--darken-2"
            @click="getUID"
          >
            <v-icon small>add</v-icon>&nbsp;Tambah
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-row no-gutters>
            <v-col cols="12" md="9">
              <v-text-field
                v-model="searchData"
                append-icon="mdi-magnify"
                label="Pencarian..."
                single-line
                hide-details
                solo
                dense
                color="light-black darken-3"
                clearable
                @keyup.enter="getAdmin(1, limit, searchData)"
              />
            </v-col>
            <v-col cols="12" md="3" class="pl-2 d-flex justify-end align-center">
              <v-autocomplete
                v-model="page"
                :items="pageOptions"
                item-text="value"
                item-value="value"
                label="Page"
                outlined
                dense
                color="light-black darken-3"
                hide-details
                :disabled="DataAdministrator.length ? false : true"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="px-1">
        <v-data-table
          loading-text="Sedang memuat... Harap tunggu"
          no-data-text="Tidak ada data yang tersedia"
          no-results-text="Tidak ada catatan yang cocok ditemukan"
          :headers="headers"
          :loading="loadingTable"
          :items="DataAdministrator"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          show-expand
          item-key="idAdmin"
          hide-default-header
          hide-default-footer
          class="elevation-1"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
        >
          <!-- header -->
          <template v-slot:header="{ props }">
            <thead class="v-data-table-header">
              <tr>
                <th v-for="header in props.headers" :key="header.text" style="font-weight: bold;">{{ header.text.toUpperCase() }}</th>
              </tr>
            </thead>
          </template>
          <template #[`item.number`]="{ item }">
            {{ page > 1 ? ((page - 1)*limit) + DataAdministrator.indexOf(item) + 1 : DataAdministrator.indexOf(item) + 1 }}
          </template>
          <template #[`item.statusAdmin`]="{ item }">
            <v-icon small v-if="item.statusAdmin == true" color="green">check</v-icon>
            <v-icon small v-else-if="item.statusAdmin == false" color="red">clear</v-icon>
            <br>
            <span v-html="item.statusAdmin == true ? 'Active' : 'Non Active'" /> 
          </template>
          <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="white">
              <v-btn
                :value="item.idAdmin"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.idAdmin == idLog || item.statusAdmin == false"
                @click="FData('EDIT', item.idAdmin)"
              >
                <v-icon small>edit</v-icon>&nbsp;Ubah
              </v-btn> 
              <v-btn
                :value="item.idAdmin"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.mutasiAkun == true"
                @click="ProsesRecord(item, 'STATUSRECORD', !item.statusAdmin)"
              >
                <v-icon small>{{ item.statusAdmin === false ? 'visibility' : 'visibility_off' }}</v-icon>&nbsp;{{ item.statusAdmin === false ? 'Active' : 'Non Active' }}
              </v-btn> 
              <v-btn
                :value="item.idAdmin"
                color="#bd3a07"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.idAdmin == idLog || item.statusAdmin == false"
                @click="HapusRecord(item)"
              >
                <v-icon small>delete</v-icon>&nbsp;Hapus
              </v-btn> 
              <v-btn
                :value="item.idAdmin"
                color="#04f7f7"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="FData('DETAIL', item.idAdmin)"
              >
                <v-icon small>info</v-icon>&nbsp;Detail
              </v-btn> 
              <v-divider />
            </td>
          </template>
        </v-data-table>
      </div>
      <v-row>
        <v-col cols="10" class="mt-2 d-flex justify-start align-center">
				<span>Halaman <strong>{{ pageSummary.page ? pageSummary.page : 0 }}</strong> dari Total Halaman <strong>{{ pageSummary.totalPages ? pageSummary.totalPages : 0 }}</strong> (Records {{ pageSummary.total ? pageSummary.total : 0 }})</span>
			</v-col>
			<v-col cols="2" class="mt-2 text-right">
				<div class="d-flex justify-end">
					<v-autocomplete
						v-model="limit"
						:items="limitPage"
						item-text="value"
						item-value="value"
            label="Limit"
						outlined
						dense
            color="light-black darken-3"
						hide-details
						:disabled="DataAdministrator.length ? false : true"
					/>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataAdministrator.length ? pageSummary.page != 1 ? false : true : true"
						@click="() => { page = pageSummary.page - 1 }"
					>
						keyboard_arrow_left
					</v-icon>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataAdministrator.length ? pageSummary.page != pageSummary.totalPages ? false : true : true"
						@click="() => { page = pageSummary.page + 1 }"
					>
						keyboard_arrow_right
					</v-icon>
				</div>
			</v-col>
      </v-row>
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
import { mapActions, mapGetters, mapState } from "vuex";
import PopUpNotifikasiVue from "../../Layout/PopUpNotifikasi.vue";
export default {
  name: 'DataAdministrator',
  components: {
    PopUpNotifikasiVue
  },
  data: () => ({
		DataAdministrator: [],
    expanded: [],
    singleExpand: true,
		searchData: '',
    page: 1,
    pageCount: 0,
    itemsPerPage: 100,
    limit: 20,
		limitPage: [
			{ value: 5 },
			{ value: 10 },
			{ value: 20 },
			{ value: 50 },
			{ value: 100 },
		],
    pageOptions: [
      { value: 1 }
    ],
		pageSummary: {
			page: '',
			limit: '',
			total: '',
			totalPages: ''
		},
		headers: [
      { text: "No", value: "number", sortable: false, width: "5%" },
      { text: "#", value: "data-table-expand", sortable: false, width: "5%" },
      { text: "Nama", value: "nama", sortable: false },
      { text: "Wilayah", value: "namaWilayah", sortable: false },
      { text: "Role", value: "namaRole", sortable: false },
      { text: "Status", value: "statusAdmin", sortable: false },
    ],
    rowsPerPageItems: { "items-per-page-options": [5, 10, 25, 50] },
    totalItems: 0,
    roleID: '',
    idLog: '',
    endecryptType: '',

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Data Administrator - SISTEM DATABASE KEPENDUDUKAN PANJAITAN",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  computed: {
    ...mapGetters(['dataadministrator', 'UID']),
    ...mapState(['loadingTable']),
  },
  watch: {
    UID: {
			deep: true,
			handler(value) {
        this.$router.push({name: "FormulirAdministrator", params: { kondisi: 'ADD', uid: value }});
      }
    },
    dataadministrator: {
			deep: true,
			handler(value) {
        this.DataAdministrator = value.records
        this.pageSummary = {
          page: this.DataAdministrator.length ? value.pageSummary.page : 0,
          limit: this.DataAdministrator.length ? value.pageSummary.limit : 0,
          total: this.DataAdministrator.length ? value.pageSummary.total : 0,
          totalPages: this.DataAdministrator.length ? value.pageSummary.totalPages : 0
        }
        for (let index = 1; index <= this.pageSummary.totalPages; index++) {
          this.pageOptions.push({ value: index })
        }
			}
		},
    page: {
			deep: true,
			handler(value) {
        this.DataAdministrator = []
				this.getAdmin({page: value, limit: this.limit, keyword: this.searchData})
			}
		},
    limit: {
			deep: true,
			handler(value) {
        this.DataAdministrator = []
				this.getAdmin({page: 1, limit: value, keyword: this.searchData})
			}
		},
  },
  mounted() {
    this.roleID = localStorage.getItem('roleID')
    this.idLog = localStorage.getItem('idLogin')
    this.getAdmin({page: this.page, limit: this.limit, keyword: this.searchData})
	},
	methods: {
		...mapActions(["fetchData", "getAdmin", "getUID"]),
    HapusRecord(item) {
      let bodyData = {
        jenis: 'DELETE',
        idAdmin: item.idAdmin,
      }
      let payload = {
				method: "post",
				url: `user/admin`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.getAdmin({page: 1, limit: this.limit, keyword: this.searchData})
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    ProsesRecord(item, jenis, kondisi) {
      let bodyData = {
        jenis: jenis,
        idAdmin: item.idAdmin,
        kondisi: kondisi,
      }
      let payload = {
				method: "post",
				url: `user/admin`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.getAdmin({page: 1, limit: this.limit, keyword: this.searchData})
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    FData(kondisi, uid){
      this.$router.push({name: "FormulirAdministrator", params: { kondisi: kondisi, uid: uid }});
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

<style scoped>
.v-input .v-label {
  font-size: 11pt !important;
}
.v-text-field.v-input--dense {
  font-size: 13px !important;
}
</style>