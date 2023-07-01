import ApiService from "@/core/services/api.service";

const state = {
}

const actions = {
  uploadFiles: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      let fData = new FormData();
      if(data.jenis === 'pdf' || data.jenis === 'image') {
        fData.append('UserID', data.UserID); //id
        fData.append('field', data.field); //field
        fData.append('nama_folder', data.nama_folder); //nama_folder
        fData.append('nama_file', data.nama_file); //nama_file
        fData.append('jenis', data.jenis); //jenis
        fData.append('bagian', data.bagian); //bagian
        fData.append('table', data.table); //bagian
        fData.append('file', data.files); //data files
      }else if(data.jenis === 'excel') {
        fData.append('jenis', data.jenis); //jenis
        fData.append('createupdateBy', data.createupdateBy); //createupdateBy
        fData.append('file', data.files); //data files
      }
      // fData.append('id_profile', idProfile ? idProfile : null); //id profile user
      // axios services
      let link = data.jenis === 'pdf' || data.jenis === 'image' ? 'settings/updateFile' : 'user/importexcel'
      ApiService.postFile(link, fData)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    });
  },
  uploadBerkas: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      let fData = new FormData();
      fData.append('proses', data.proses); //proses
      fData.append('id', data.id); //id
      if(data.bagian == 'barang_lelang'){
        fData.append('nama_barang_lelang', data.nama_barang_lelang); //nama
      }
      fData.append('nama_folder', data.nama_folder); //nama_folder
      fData.append('nama_file', data.nama_file); //nama_file
      fData.append('jenis', data.jenis); //jenis
      fData.append('bagian', data.bagian); //bagian
      fData.append('table', data.table); //bagian
      fData.append('file', data.files); //data files
      // fData.append('id_profile', idProfile ? idProfile : null); //id profile user
      // axios services
      ApiService.postFile('settings/updateBerkas', fData)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    });
  },
  uploadExcel: function ({commit},data) {
    return new Promise((resolve, reject) => {
      let idProfile = localStorage.getItem('profile_id');
      let fData = new FormData();
      fData.append('main_modul', data.nama_modul); //nama modul
      fData.append('strKey', data.strKey); //id permohonan
      fData.append('strSubkey', data.strSubKey); //id proyek
      fData.append('nama_file', data.nama_file); //nama file nya
      fData.append('id_profile', idProfile ? idProfile : null); //id profile user
      fData.append('file', data.files); //data files
      // axios services
      ApiService.postFile('file/uploadExcel', fData)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    });
  },
  uploadCSV: function ({commit},data) {
    return new Promise((resolve, reject) => {
      let fData = new FormData();
      let url = data.bagian == 'install' ? 'kmart/google/loader/UserInstall' : 'kmart/google/loader/UserAcquisition'
      fData.append('bagian', data.bagian); //data files
      fData.append('file', data.files); //data files
      // axios services
      ApiService.postFile(url, fData)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    });
  },
}

export default {
  namespaced: true,
  actions,
  state
}