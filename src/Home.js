import books from "./books.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from 'axios';
const Home = () => {

  //Movies api fetchig : 
  const [moives, setMovies] = useState();
  const [allMovies, setAllMovies] = useState();
  
  useEffect(() => {
    
    axios.get('https://ghibliapi.herokuapp.com/films').then((response) => {
      setAllMovies(response.data);
      setMovies(response.data);

    })
  },[])

  // if(moives){

  //   console.log(moives);
  // }


 
  // const [allBooks, setAllBooks] = useState(allBocks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  // Use effect for search input====================================
  useEffect(() => {
    let searchMovie = allMovies?.filter((movie) => {
      return movie.title.toLowerCase().includes(search.trim());
    });
    if (search == "") {
      setMovies(allMovies);
    }else{
      
      setMovies(searchMovie);
    }
  }, [search]);
  // End search input=========



  // Use effect for the filter input=================================
  useEffect(() => {
    let filterDate = allMovies?.filter((item) => {
        if(filter === "Before 1990"){
            return item.release_date < 1990 ;
        }
        else if(filter === "between 1990 & 1997"){
            return item.release_date >= 1990 && item.release_date <= 1997 ;
        }
        else if(filter === "After 1997"){
            return item.release_date > 1997 ;
        }
        else{
            return item ;
        }
    })
    setMovies(filterDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[filter])
  // End filter input================
  
  return (
    <>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-success disabled" type="submit">
          Search Here
        </button>
      </form>

      <form>
        <select onChange={(element) => setFilter(element.target.value)}>
          <option>All</option>
          <option>Before 1990</option>
          <option>between 1991 & 1997</option>
          <option> After 1997</option>
        </select>
      </form>

      <div className="d-flex flex-wrap justify-content-center mt-5 mb-5 gap-4">
        {moives?.map((movie) => {
          return (
            <div className="card w-25" key={movie.id}>
              <img
                src={movie.image}
                width={"200px"}
                height={"200px"}
                className="card-img-top"
                alt="Fissure in Sandstone"
              />
              <div className="card-body">
                <h2 className="card-title">{movie.title}</h2>
                <p className="card-text"></p> <strong>description :</strong>
                <p style={{ display: "inline" }}>{movie.description}</p>
                <br></br>
                Rate :<p style={{ display: "inline" }}>{movie.running_time}</p><br></br>
                Relase Date :<p style={{ display: "inline" }}>{movie.release_date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
