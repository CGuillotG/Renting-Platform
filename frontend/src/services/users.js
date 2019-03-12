import axios from 'axios'

let url = `${process.env.BACKURL}/auth`

//login
export const logIn = auth => {
  return axios.post(`${url}/login`, auth, { withCredentials: true })
  .then(res => res.data)
}

//logout
export const logOut = () => {
  return axios.post(`${url}/logout`, { withCredentials: true })
  .then(res => res.data)
}

//logged
export const logged = () => {
  return axios.post(`${url}/logged`, { withCredentials: true })
  .then(res => res.data)
}

//signup
export const signup = newUser => {
  return axios.post(`${url}/signup`, newUser)
  .then(res => res.data)
}

//edit
export const edit = updateUser => {
  axios.post(url, {...updateUser}, { withCredentials: true })
  .then(res => res.data)
}
export const imageUpload = file => {  
  let imageurl = `${url}/edit`
  let formData = new FormData()
  formData.append("profilePic", file)
  const serviceUpload = axios.create({ imageurl, withCredentials: true })
  serviceUpload.post(url, formData, {headers: { enctype: "multipart/form-data" }})
  .then(res => res.data)
  .catch(e => e)
}