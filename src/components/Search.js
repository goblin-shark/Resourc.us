import React from 'react'
import SearchField from "react-search-field";
import FilteredResults from "../components/FilteredResults";
import { Link, Route } from 'react-router-dom';
const Search = ({setShowResults, setSearchData}) => {

  const resultArr = [];

  const onClick = (data) => {
    setShowResults(true);
  }
  function searchDatabase(e, val) {
    let textInput = e;
    let data = fetch(`http://localhost:3000/search?query=${e}`)
    .then(response => response.json())
    .then(data => {
      if(!data.length || !data){
        return;
      }
      setSearchData(el => [data])
      onClick();
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <SearchField
          placeholder="Search..."
          onSearchClick={(e)=> searchDatabase(e)}
          classNames="test-class"
          onEnter={(e, val) => searchDatabase(e)}
      />
    </div>
  )

}


export default Search;