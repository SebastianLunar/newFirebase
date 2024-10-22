import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Movies = () => {
  const API_URL = 'https://api.themoviedb.org/3'
  const API_KEY = 'fc9e3b9f91ba0e72e0cb933fbd5edcdc'
  const imgPath = 'https://image.tmdb.org/t/p/w500'
  const imgPathLarge = 'https://image.tmdb.org/t/p/original'

  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState('')

  const fetchFavorites = async () => {
    axios
      .get('https://api.themoviedb.org/3/account/21504145/favorite/movies', {
        params: { language: 'es-CO', page: '1', sort_by: 'created_at.asc' },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzllM2I5ZjkxYmEwZTcyZTBjYjkzM2ZiZDVlZGNkYyIsIm5iZiI6MTcyNjA5MjcwMy41NzQyODksInN1YiI6IjY2ZGIxM2NkNmFlNDcwOTQ1NzcwNDI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m50L_w9-3ZLV7EwgmIBgiSeSuSqypIs_5TiXlqwtw6E'
        }
      })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const fetchMovies = async searchKey => {
    // const type = searchKey ? 'search' : 'disconver'
    // const data = await axios.get(`${API_URL}/${type}/movie`, {
    //   params: {
    //     api_key: API_KEY,
    //     query: searchKey
    //   }
    // })
    // console.log(data)

    const url =
      'https://api.themoviedb.org/3/movie/popular?language=es-CO&page=1'

    try {
      const { data } = await axios.get(url, {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzllM2I5ZjkxYmEwZTcyZTBjYjkzM2ZiZDVlZGNkYyIsIm5iZiI6MTcyNjA5MzYzNy43MDM3MTUsInN1YiI6IjY2ZGIxM2NkNmFlNDcwOTQ1NzcwNDI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cE0u6v4n7FyFU1V85VtV-sjFAjwfsKx1HZh9zfRt6xI'
        }
      })
      console.log(data.results)
      setMovies(data.results)
    } catch (error) {
      console.error('error:', error)
    }
  }

  const postFavorite = async movie => {
    console.log('enviando...')
    const url = 'https://api.themoviedb.org/3/account/21504145/favorite'

    try {
      const response = await axios.post(
        url,
        { media_type: 'movie', media_id: movie.id, favorite: true },
        {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzllM2I5ZjkxYmEwZTcyZTBjYjkzM2ZiZDVlZGNkYyIsIm5iZiI6MTcyNjA5MzYzNy43MDM3MTUsInN1YiI6IjY2ZGIxM2NkNmFlNDcwOTQ1NzcwNDI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cE0u6v4n7FyFU1V85VtV-sjFAjwfsKx1HZh9zfRt6xI'
          }
        }
      )
      console.log(response)
      fetchFavorites()
    } catch (error) {
      console.error('error:', error)
    }
  }

  const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name too short').max(20).required("This field is required"),
    email: Yup.string().email('Should be example@mail.com').required("This field is required"),
    phone: Yup.string().min(10, 'Phone should be at least 10 digits long').max(20).required("This field is required"),
    password: Yup.string().min(6, 'Password too short').max(20).required("This field is required"),
    age: Yup.number().lessThan(10, 'Age should be greater than 10')
})

  // useEffect(() => {
  //   fetchMovies()
  // }, [])

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          password: '',
          image:
            'https://res.cloudinary.com/dd5yolnde/image/upload/v1656300664/buffalo-sprint3/user_fa0maw.png'
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, errors, touched) => {
          console.log(values);
          console.log(errors);
          console.log(touched)
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              type='text'
              placeholder='Full name'
              name='name'
              style={{ marginBottom: '10px' }}
            />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <ErrorMessage name="name" component="div" className="error" />

            <Field
              type='email'
              placeholder='Email'
              name='email'
              style={{ marginBottom: '10px' }}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <Field
              type='tel'
              placeholder='Phone number'
              name='phone'
              style={{ marginBottom: '10px' }}
            />
            {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
            <div
              id='recaptcha-container'
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '10px'
              }}
            ></div>
            <Field
              type='password'
              placeholder='Password'
              name='password'
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type='submit'>Sign Up</button>
          </Form>
        )}
      </Formik>

      {movies.map(movie => {
        return (
          <div
            key={movie.id}
            onClick={() => {
              postFavorite(movie)
            }}
          >
            <img src={`${imgPath}${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        )
      })}
    </>
  )
}

export default Movies
