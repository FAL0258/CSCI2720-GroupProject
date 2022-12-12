/**
 * refs: https://stackoverflow.com/questions/71663356/how-to-set-the-value-of-input-from-state-react-app
 */
import React, { useEffect, useState } from "react";
import "./style2.css";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  }
  // Debugging
  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  return (
    <div className="main">
      <div className="form-group has-search">
        <span className="fa fa-search form-control-feedback"></span>
        <input type="text" className="form-control" placeholder="Search" onChange={handleInput} value={searchQuery} />
      </div>
    </div>
  );
};

export default React.memo(SearchBox);
