export const SET_PEKERJAAN = (state, pekerjaan) => {
	state.pekerjaanOptions = pekerjaan
}

export const SET_WILAYAHPANJAITAN = (state, wilayahpanjaitan) => {
	state.wilayahpanjaitanOptions = wilayahpanjaitan
}

export const SET_OMPU = (state, ompu) => {
	state.ompuOptions = ompu
}

export const SET_WILAYAH = (state, data) => {
	if(data.kategori === 'provinsi'){
		state.ProvinsiOptions = data.wilayah
	}else if(data.kategori === 'kabkota'){
		state.KabKotaOptions = data.wilayah
	}else if(data.kategori === 'kecamatan'){
		state.KecamatanOptions = data.wilayah
	}else if(data.kategori === 'kelurahan'){
		state.KelurahanOptions = data.wilayah
	}else if(data.kategori === 'kabkotaOnly'){
		state.KabKotaOnlyOptions = data.wilayah
	}
}

export const SET_ADMIN = (state, data) => {
	state.DataAdministrator = data
}

export const SET_ADMINBY = (state, data) => {
	state.dataAdministrator = data
}

export const SET_BIODATA = (state, data) => {
	state.DataBiodata = data
}

export const SET_BIODATABY = (state, data) => {
	state.dataBiodata = data
}

export const SET_PROFILE = (state, data) => {
	state.dataProfil = data
}

export const SET_DASHBOARD = (state, data) => {
	state.DataDashboard = data
}


//------------------------------------------------------------//
export const SET_UID = (state, data) => {
	state.dataUID = data
}
export const SET_LOADINGTABLE = (state, data) => {
	state.loadingTable = data
}