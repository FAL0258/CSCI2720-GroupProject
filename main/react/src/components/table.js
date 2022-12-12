import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SearchBox from "./searchbox.js"


let data1 = [
  { loc: "Tai Po Public Library", num: "4" },
  { loc: "Sha Tin Town Hall", num: "6" },
  { loc: "Fa Yuen Street Public Library", num: "9" },
  { loc: "Fanling Public Library", num: "5" },
  { loc: "Lek Yuen Public Library", num: "10" },
  { loc: "Lung Hing Public Library", num: "7" },
  { loc: "Ngau Chi Wan Public Library", num: "8" },
  { loc: "Hong Kong Film Archive", num: "3" },
  { loc: "North Lamma Public Library", num: "4" },
  { loc: "Emperor Cinemas iSQUARE", num: "8" },
];

const TableRow = (props) => {
  let i = props.i;
  let url = "/locationpage/" + i;
  return (
    <tr>
      <td><Link to={url}> {data1[i].loc}</Link></td>
      
      <td>{data1[i].num}</td>
    </tr>
  );
};

const Tables = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  }
  
  const filterData = (data) => {
    return data.loc.toLowerCase().includes(searchQuery.toLowerCase());
  }

  // Debugging
  useEffect(() => {
    setFiltered(data1.filter(filterData));
  }, [searchQuery]);

  return (
    <main>
      <div className="main">
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <input type="text" className="form-control" placeholder="Search" onChange={handleInput} value={searchQuery} />
        </div>
      </div>
      <br />
      <div>
        <table
          id="example"
          className="table table-striped table-dark table-hover"
        >
          <thead>
            <tr>
              <th scope="col">Location</th>
              <th scope="col">Number of events</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, index) => {
              let url = "/locationpage/" + index;
              return(
                <tr>
                  <td><Link to={url}> {filtered[index].loc}</Link></td>
                  
                  <td>{filtered[index].num}</td>
                </tr>
            )})}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default React.memo(Tables);
