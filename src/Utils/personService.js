import axios from 'axios'

const API_URL = 'https://localhost:7281/api/RepositorioPersona/'

export const personService = {
  fetchPersons() {
    return axios.get(`${API_URL}ObtengaLaListaPersonas`)
  },
  
  addPerson(person) {
    return axios.post(`${API_URL}RegistrePersona`, person)
  },
  
  editPerson(person) {
    return axios.put(`${API_URL}EditePersona`, person)
  },
  
  deletePerson(cedula) {
    return axios.delete(`${API_URL}EliminePersona?cedula=${cedula}`)
  },
  viewPerson(cedula) {
    return axios.get(`${API_URL}ObtengaPersonaPorCedula?id=${cedula}`)
  }
}
