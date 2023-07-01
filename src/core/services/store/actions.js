import ApiService from "@/core/services/api.service";

export const getPekerjaan = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsPekerjaan`, localStorage.getItem('user_token'));
		commit('SET_PEKERJAAN', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getWilayahPanjaitan = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsWilayahPanjaitan`, localStorage.getItem('user_token'));
		commit('SET_WILAYAHPANJAITAN', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getOmpu = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsOmpu`, localStorage.getItem('user_token'));
		commit('SET_OMPU', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getWilayah = async ({ commit }, data) => {
	try {
		let res = await ApiService.get(`settings/optionsWilayah?bagian=${data.bagian}&KodeWilayah=${data.KodeWilayah}`, localStorage.getItem('user_token'));
		commit('SET_WILAYAH', { wilayah: res.data.result, kategori: data.bagian })
	} catch (error) {
		console.log(error);
	}
}

export const getAdminbyUID = async ({ commit }, uid) => {
	try {
		let res = await ApiService.get(`user/admin/${uid}`, localStorage.getItem('user_token'));
		// console.log(res.data.result);
		commit('SET_ADMINBY', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getBiodatabyUID = async ({ commit }, uid) => {
	try {
		let res = await ApiService.get(`user/biodata/${uid}`, localStorage.getItem('user_token'));
		// console.log(res.data.result);
		commit('SET_BIODATABY', res.data.result)
	} catch (error) {
		console.log(error);
	}
}