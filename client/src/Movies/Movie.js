import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouteMatch, useHistory} from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const routeToEdit = e => {
    e.preventDefault();
    history.push(`update/${match.params.id}`);
  }

  const deleteMovie = e => {
    e.preventDefault();
    
    axios.delete(`http://localhost:5000/api/movies/${match.params.id}`)
    .then(res => {
      console.log("Delete response ", res);
      const filteredArr = props.movies.filter(e => {
        return e.id !== res.data; 
      })
      props.setMovieList(filteredArr);
      history.push('/');
    })
    .catch(err => {
      console.log("Delete error ", err);
    })
  }


  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading Movie Info</div>;
  }

  return (
    <div className='save'>
      <MovieCard movie={movie} />

      <button className='save' onClick={saveMovie}>
        Save
      </button>

      <button className='edit' onClick={routeToEdit}>
        Edit
      </button>

      <button className='delete' onClick={deleteMovie}>
        Delete
      </button>

    </div>
  );
}

export default Movie;