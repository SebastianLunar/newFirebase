import { createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth, facebook, google } from "../../firebase/firebaseConfig";

const initialState = {
  name: "",
  email: "",
  profilePhoto: "",
  isAuthenticated: false
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerSync: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profilePhoto = action.payload.profilePhoto;
      state.isAuthenticated = true;
    },
    logoutSync: (state, action) => {
      state.name = "";
      state.email = "";
      state.profilePhoto = "";
      state.isAuthenticated = false;
    }
  }
})

export const { registerSync, logoutSync } = userReducer.actions;
export default userReducer.reducer


// ------------------------------------------------------------------------------------------------

// Action creators

export const emailLogin = async () => {
  try {
    const response = await signInWithEmailAndPassword(auth, "sebastian@yopmail.com", "geek123")
    if (response) {
      console.log(response)
      // return {
      //   name: response.user.displayName,
      //   email: response.user.email,
      //   profilePhoto: response.user.photoURL
      // }

      // const user = userCredential.user;
    
      // // Actualizar el perfil del usuario
      // await updateProfile(user, {
      //   displayName: displayName,
      //   photoURL: photoURL,
      // });
  
      // console.log("Usuario registrado y perfil actualizado");
    }
  } catch (error) {
    console.warn(error, 'Usuario NO Autorizado')
  }
}

export const loginGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, google)
    if (response) {
      console.log(response)
      return {
        name: response.user.displayName,
        email: response.user.email,
        profilePhoto: response.user.photoURL
      }
    }
  } catch (error) {
    console.warn(error, 'Usuario NO Autorizado')
  }
}

export const loginFacebook = async () => {
  try {
    const response = await signInWithPopup(auth, facebook)
    if (response) {
      console.log(response)
      return {
        name: response.user.displayName,
        email: response.user.email,
        profilePhoto: response.user.photoURL
      }
    }
  } catch (error) {
    console.warn(error, 'Usuario NO Autorizado')
  }
}

export const logout = async () => {
  try {
    const response = await signOut(auth)
    if (response) {
      console.log(response)
      return response
    }
  } catch (error) {
    console.warn(error, 'Usuario NO Autorizado')
  }
}