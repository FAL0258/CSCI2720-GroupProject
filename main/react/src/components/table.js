import React from "react";
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
      <td>
        <a href={url}>{data1[i].loc}</a>
      </td>
      <td>{data1[i].num}</td>
    </tr>
  );
};

const Tables = () => {
  return (
    <main>
      <SearchBox />
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
            {data1.map((d, index) => (
              <TableRow i={index} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default React.memo(Tables);
