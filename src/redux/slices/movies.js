import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { database } from "../../firebase/firebaseConfig";

const initialState = {
  peliculas: []
};

export const moviesReducer = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addSync: (state, action) => {
      console.log(action)
    },
    listSync: (state, action) => {
      console.log('listando')
      state.peliculas = action.payload
    }
  }
})

export const { addSync, listSync } = moviesReducer.actions;
export default moviesReducer.reducer


// ------------------------------------------------------------------------------------------------

// Action creators

//Agregar
export const addAsync = (value) => {
  try {
    const response = addDoc(collection(database, "peliculas"), value);
    if (response) {
      console.log(response)
      return response
    }
  } catch (error) {
    console.warn("==========> HUbo un error" + error)
  }
}

//Listar

export const listAsync = async (filtro, dispatch, listSync) => {
  const datos = []
  try {
    if (!filtro) {
      const peliculas = await getDocs(collection(database, "peliculas"))
      peliculas.forEach(obj => {
        datos.push(
          {
            ...obj.data()
          }
        )
      })
      dispatch(listSync(datos))
    } else {
      const peliculas = collection(database, "peliculas")
      const q = query(peliculas, where("Type", "==", filtro))
      const queried = await getDocs(q)
      console.log(queried)
      queried.forEach(obj => {
        datos.push(
          {
            ...obj.data()
          }
        )
      })
      return datos
    }
  } catch (error) {
    console.error(error)
  }
}

//Eliminar
export const deleteAsync = async (id) => {
  try {
    const peliculas = collection(database, "peliculas")
    const q = query(peliculas, where("id", "==", id))
    const datos = await getDocs(q)
    console.log("DOC encontrado")
    console.log(datos)
    datos.forEach(obj => {
      deleteDoc(doc(database, "peliculas", obj.id))
    })
  } catch (error) {
    console.error(error)
  }
}
//Editar
export const editAsync = async (nueva) => {
  try {
    const collectionCitas = collection(database, "peliculas")
    const q = query(collectionCitas, where("id", "==", nueva.id))

    const datosQ = await getDocs(q)
    let id

    datosQ.forEach(async (obj) => {
      id = obj.id
    })

    const docRef = doc(database, "peliculas", id)

    const response = await updateDoc(docRef, nueva)
    if (response) {
      console.log(response)
      return response
    }
  } catch (error) {
    console.error(error)
  }
}