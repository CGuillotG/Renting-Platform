import axios from 'axios'

let url = `${process.env.BACKURL}/auth`
//primer funcion 


//login
export const logIn = (auth) => {
  axios.post(url, auth, { withCredentials: true })
  .then(res => res.data)
}

// // get all
// export const getBooks = () => axios.get(url).then(res => res.data)

// //subir un libro
// export function postBook(book) {
//     return axios.post(url, book)
//         .then(res => res.data)
// }
