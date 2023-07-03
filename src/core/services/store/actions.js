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

export const getAdmin = async ({ commit }, data) => {
	try {
		commit('SET_LOADINGTABLE', true)
		let res = await ApiService.get(`user/admin?page=${data.page}&limit=${data.limit}${data.keyword ? `&keyword=${data.keyword}` : ''}`, localStorage.getItem('user_token'));
		// console.log(res.data.result);
		setTimeout(() => {
			commit('SET_ADMIN', res.data.result)
			commit('SET_LOADINGTABLE', false)
		}, 2000);
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

export const getBiodata = async ({ commit }, data) => {
	try {
		commit('SET_LOADINGTABLE', true)
		let res = await ApiService.get(`user/biodata?page=${data.page}&limit=${data.limit}${data.keyword ? `&keyword=${data.keyword}` : ''}`, localStorage.getItem('user_token'));
		// console.log(res.data.result);
		setTimeout(() => {
			commit('SET_BIODATA', res.data.result)
			commit('SET_LOADINGTABLE', false)
		}, 2000);
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

export const getUID = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/getUID`, localStorage.getItem('user_token'));
		// console.log(res.data.result);
		commit('SET_UID', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getProfile = async ({ commit }) => {
	try {
		let res = await ApiService.put(`auth/profile`, localStorage.getItem('user_token'));
		// console.log(res.data.result);
		commit('SET_PROFILE', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getDashboard = (context) => {
	return new Promise((resolve, reject) => {
		ApiService.get(`user/dashboard`, localStorage.getItem('user_token'))
			.then((response) => {
				// console.log(response.data.result);
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			})
	});
}

export const getAuthToken = (context) => {
	return new Promise((resolve, reject) => {
		ApiService.get(`auth/authToken`, localStorage.getItem('user_token'))
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			})
	});
}