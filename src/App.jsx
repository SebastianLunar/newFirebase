import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  emailLogin,
  loginFacebook,
  loginGoogle,
  logout,
  logoutSync,
  registerSync
} from './redux/slices/user'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebaseConfig'
import { addAsync, deleteAsync, editAsync, listAsync, listSync } from './redux/slices/movies'
import Movies from './components/Movies'

function App () {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  async function handleLoginGoogle () {
    await loginGoogle().then(response => dispatch(registerSync(response)))
  }

  async function handleLoginFacebook () {
    await loginFacebook().then(response => dispatch(registerSync(response)))
  }

  async function handleLoginMail () {
    await emailLogin().then(
      response => console.log(response)
      // dispatch(registerSync(response))
    )
  }

  async function handleLogout () {
    await logout().then(() => dispatch(logoutSync()))
  }

  async function handleData () {
    await listAsync(null, dispatch, listSync)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // Usuario autenticado
        dispatch(
          registerSync({
            name: user.displayName,
            email: user.email,
            profilePhoto: user.photoURL
          })
        )
      } else {
        console.log('No se ha iniciado sesión')
        //
        // dispatch(logoutSync());
      }
    })

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe()
  }, [dispatch])

  useEffect(() => {
    handleData()
  }, [])

  async function sendData () {
    const nuevoDato = {
      id: '3',
      Title: 'Star Wars: The Force Awakens',
      Year: '2015',
      Value: 7.8,
      Carrusel:
        'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/6bf4fe463fc97e53495f870e5ddcfca864c129d69e4b60e7d0b5793ac92f2ac5._V_SX450_.jpg',
      Description:
        'A music-loving kinkajou named Vivo embarks on the journey of a lifetime to fulfill his destiny and deliver a love song for an old friend.',
      Type: 'movie',
      Trailer: 'https://www.youtube.com/embed/sGbxmsDFVnE',
      Poster:
        'https://www.themoviedb.org/t/p/original/eRLlrhbdYE7XN6VtcZKy6o2BsOw.jpg'
    }
    await addAsync(nuevoDato).then(handleData())
  }

  async function deleteDoc () {
    await deleteAsync("3").then(handleData())
  }
  async function updatingDoc () {
    const nuevoDato = {
      id: '3',
      Title: 'Star Wars: The Force ReAwakens Again and Again',
    }
    await editAsync(nuevoDato).then(handleData())
  }

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <div>
        <button onClick={handleLoginGoogle}>Login Google</button>
        <button onClick={handleLoginFacebook}>Login FB</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleLoginMail}>Login mail</button>
        <button onClick={sendData}>Enviar datos</button>
        <button onClick={deleteDoc}>Eliminar</button>
        <button onClick={updatingDoc}>Actualizar</button>
      </div>
      <h1>Vite + React</h1>
      <h1>Bienvenido {user.name}</h1>
      <img src={user.profilePhoto} referrerPolicy='no-referrer' />
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
      <section>
        <Movies />
      </section>
    </>
  )
}

export default App
