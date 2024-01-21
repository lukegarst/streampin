import { Modal, Button} from 'react-bootstrap';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addMovieToWatchlist } from '../features /movieSlice';

const MovieBox =({title, poster_path, vote_average, release_date, overview, id, type, provider_name, movies})=>{

  const dispatch = useDispatch()

  let initialState = 'Add to watchlist'
  const [buttonText, setButtonText] = useState(initialState)
  const [show, setShow]=useState();
  const [prov, setProv]=useState();

  const handleShow = async () => {
    const streamingUrl = `https://api.themoviedb.org/3/movie/${id}
    /watch/providers`;
      const streamingOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGI1ZTA1ODZmY2JlMmY2NDkzMmMwMGJjOTc5OWMzOSIsInN1YiI6IjY1NjU2OWMxMTU2Y2M3MDE0ZTY1Yjk3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LL63lMhpApZpPO4Ue8P_mPUpEhmWj15iOSFi4KFFs8g'
      }
      
    };
  
    try {
      await fetch(streamingUrl, streamingOptions)
      .then((res) => {
        return res.json();
      })
      .then(data => {
        console.log(data.results.US.flatrate);
        setProv(data.results.US.flatrate);
      })
    } catch (error) {
      console.error(error);
    };

    setShow(true);
  }

  const handleClose = ()=> {
    setShow(false);
  }
 


  return(
    <>
      <img onClick={handleShow} alt='movie' style={{width:'200px', height:'300px', marginLeft:'30px', marginTop:'30px', boxShadow:'10px 10px 5px black'}} src={"https://image.tmdb.org/t/p/w500/"+poster_path} />
      <Modal style={{margin: '25px 50px 75px'}} show={show} onHide={handleClose}>
      
      <img onClick={handleClose} alt='movie' style={{width:'200px', height:'300px', boxShadow:'10px 10px 5px black'}} src={"https://image.tmdb.org/t/p/w500/"+poster_path} />
      <br></br>
      <br></br>
      <Button onButton={setButtonText} onClick={() => dispatch(addMovieToWatchlist({title, poster_path, overview, id}))} id='add' variant="light">{buttonText}</Button>
      <br></br>
      <br></br>
      <div id='info'>
      <h1>{title}</h1>
      <h3>Streaming on: </h3>
      {prov && prov.map((prov)=>{return(
        <p key={prov.provider_id}>-{prov.provider_name}</p>
      )})}
      <br></br>
      <h3>Overview</h3>
      <p>{overview}</p>
      </div>
      </Modal>


      </>
    )
}

export default MovieBox;