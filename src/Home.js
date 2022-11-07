import books from "./books.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { useEffect, useState } from "react";

const Home = () => {
  //in this way the header will not be in all pages
  let allBocks = books.eBooks;

  const [allBooks, setAllBooks] = useState(allBocks);
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState('');

  // Use effect for search input
  useEffect(() => {
    let searchBook = allBocks.filter((item) => {
      return item.language.toLowerCase().includes(search.trim());
    });
    setAllBooks(searchBook);
    if (search == "") {
      setAllBooks(allBocks);
    }
  }, [search]);
  // End search input


  useEffect(() => {
    
    let filterPrice = allBocks.filter((item) => {

        if(filter === "under 20"){
            return item.price < 20 ;
        }
        else if(filter === "between 20 & 30"){
            return item.price >= 20 && item.price <= 30 ;
        }
        else if(filter === "above 30"){
            return item.price > 31 ;
        }
        else{
            return item ;
        }
    })
    console.log(filterPrice );
    setAllBooks(filterPrice);

  },[filter])






  return (
    <>
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button class="btn btn-outline-success disabled" type="submit">
          Search Here
        </button>
      </form>

      <form>
        <select onChange={(element) => setFilter(element.target.value)}>
          <option>All</option>
          <option>under 20</option>
          <option>between 20 & 30</option>
          <option> above 30</option>
        </select>
      </form>

      <div className="d-flex justify-content-center mt-5 mb-5 gap-4">
        {allBooks.map((book) => {
          return (
            <div className="card" key={book.id}>
              <img
                src={book.image}
                width={"200px"}
                height={"200px"}
                className="card-img-top"
                alt="Fissure in Sandstone"
              />
              <div className="card-body">
                <h2 className="card-title">{book.language}</h2>
                <p className="card-text"></p> Edition :
                <p style={{ display: "inline" }}>{book.edition}</p>
                <br></br>
                Price :<p style={{ display: "inline" }}>{book.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
