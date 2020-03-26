import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie= {
  title: '',
  director: '',
  metascore: '',
  stars: '',
};

const UpdateMovie= props => {

  const { id } = useParams();
  const { push } = useHistory();

  const [movie, setMovie] = useState(initialMovie);
  
  const handleChange = e => {
    e.persist();
    let value = e.target.value;

    if (e.target.name === 'title') {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  useEffect(() => {
    const movieToUpdate = props.movie.find(e => {
        return `${e.id}` === id
    })
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movie, id]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        const newArr = props.movies.map(e => {
            if(`$e.id` === id) {
                return movie;
            } else {
                return e;
            }
        })
        props.setMovieList(newArr);
        push(`/movies/${id}`)
    })
    .catch(err => {
    });
}

return (
    <div className='edit'>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="title"
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="director"
          value={movie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          placeholder="metascore"
          value={movie.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={handleChange}
          placeholder="stars"
          value={movie.stars}
        />
        <button>update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;