import React from 'react'
import SearchField from "react-search-field";

const Search = ({ setShowResults, setSearchData }) => {

  const onClick = () => {
    setShowResults(true);
  }

  const searchDatabase = (e) => {
    fetch(`http://localhost:3000/search?query=${e}`)
      .then(response => response.json())
      .then(data => {
        setSearchData({
          team: [],
          resourceSearch: [],
        })
        setSearchData(data)
        onClick();
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <SearchField
        placeholder="Search..."
        onSearchClick={(e) => searchDatabase(e)}
        classNames="test-class"
        onEnter={(e, val) => searchDatabase(e)}
      />
    </div>
  )
}

export default Search;
