/**
 * refs: https://stackoverflow.com/questions/36837958/how-to-access-one-components-state-from-another-component
 *       https://stackoverflow.com/questions/71663356/how-to-set-the-value-of-input-from-state-react-app
 *       https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
 *       https://stackoverflow.com/questions/71365134/how-can-i-use-the-state-to-filter-the-data-and-pass-it-to-different-components-i
 *       https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 *       https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
 *       https://stackoverflow.com/questions/8993773/contains-case-insensitive
 *       https://reactjs.org/docs/hooks-effect.html
 *       https://reactjs.org/docs/lists-and-keys.html
 *       
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Test data but with a few problems:
 *  - Number of events is string for some reason (and vaguely named)
 *  - "loc" also too vague for location name
 *  - Needs location ID, because when referring to /locationpage/, it needs to be ID in the URL like 
 *    "/locationpage/123" or something and not array index, will change implementation once the
 *    backend has been set up
 */
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

const fillerNumber = 999;

// Renders each row
const TableRow = (props) => {
  let i = props.index;
  let url = "/locationpage/" + props.locDataSet[i].locationId;
  return (
    <tr>
      <td>
        <Link to={url}> {props.locDataSet[i].name}</Link>
      </td>

      <td>{fillerNumber}</td>
    </tr>
  );
};

// Main component
const Tables = (props) => {
  /**
   * searchQuery is for string in search bar, re-renders when it updates (when typed into)
   * filtered is for the array that contains the location name and # of events
   * sortChoice is for whether the user wants to not sort the table, sort by name or by ascending/descending # of events
   */
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [sortChoice, setSortChoice] = useState("");

  // When search bar value changes, change the state of searchQuery to the value inside the search bar
  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  };

  // When the option for the sorting choice changes, change the state of sortChoice to the value chosen
  const handleSort = (e) => {
    setSortChoice(e.target.value);
  };

  // Filtering function, if the searchQuery is a substring of the location name, then that location stays in the array, else it ges filtered out. Case-insensitive (because of .toLowerCase())
  const filterData = (data) => {
    return data.name.toLowerCase().includes(searchQuery.toLowerCase());
  };

  /**
   * ref: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
   * Reference above is an explanation for what's going on below
   * Only one choice of sorting allowed at a time 
   */
  const sortByChoice = (item1, item2) => {

    // If sort by name
    if (sortChoice === "name") {
      if (item1.name < item2.name) {
        return -1;
      }
      if (item1.name > item2.name) {
        return 1;
      }
      return 0;
    }

    // If sort by number (ascending)
    else if (sortChoice === "number") {
      if (parseInt(item1.num) < parseInt(item2.num)) {
        return -1;
      }
      if (parseInt(item1.num) > parseInt(item2.num)) {
        return 1;
      }
      return 0;
    }

    // If sort by number (descending)
    else if (sortChoice === "descendingNumber") {
      if (parseInt(item1.num) < parseInt(item2.num)) {
        return 1;
      }
      if (parseInt(item1.num) > parseInt(item2.num)) {
        return -1;
      }
      return 0;
    }
    // If none
    return 0;
  }

  // After every render:
  useEffect(() => {

    // Filters out the information, stores it in a new array
    let results = props.locDataSet.filter(filterData);
    console.log(results);
    // Sort, depending on the selected radio option
    results.sort(sortByChoice);
    console.log(results);
    // Update the filtered state to the array of finalized data
    setFiltered(results);
  }, [searchQuery, sortChoice]);

  return (
    <main>
      <div className="main">
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={handleInput}
            value={searchQuery}
          />
        </div>
        <br />
        <p>Sort by: </p>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="sortChoice"
            id="noSort"
            value="none"
            onChange={handleSort}
          />
          <label className="form-check-label" htmlFor="noSort">
            None
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="sortChoice"
            id="nameSort"
            value="name"
            onChange={handleSort}
          />
          <label className="form-check-label" htmlFor="nameSort">
            Name
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="sortChoice"
            id="numberSort"
            value="number"
            onChange={handleSort}
          />
          <label className="form-check-label" htmlFor="numberSort">
           Ascending Number
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="sortChoice"
            id="descendingNumberSort"
            value="descendingNumber"
            onChange={handleSort}
          />
          <label className="form-check-label" htmlFor="descendingNumberSort">
            Descending Number
          </label>
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
            {/** Render each row, using data from the filtered and/or sorted array */}
            {filtered.map((data, index) => <TableRow key={index} index={index} locDataSet={filtered}/>)}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default React.memo(Tables);
