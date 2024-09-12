import React, { useState } from "react";

function PlayersForm() {
  let [players, setPlayers] = useState([]);

  const getPlayersFromDB = async () => {
    try {
      const jsonData = await fetch("http://localhost:1234/getPlayers", {
        method: "GET",
      });

      const jsoData = await jsonData.json();
      console.log(jsoData);
      console.log("Successfully fetched the data");

      setPlayers(jsoData);
    } catch (error) {
      console.error("There is a problem in fetching the data", error);
    }
  };

  return (
    <div>
      <form>
        <div>
          <button type="button" onClick={getPlayersFromDB}>
            Get Players
          </button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Id</th>
            <th>First Name</th>
            <th>Second Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {players.map((ele,i) => {
            return (
              
                <tr>
                  <td>{i+1}</td>
                  <td>{ele._id}</td>
                  <td>{ele.firstName}</td>
                  <td>{ele.lastName}</td>
                  <td>{ele.age}</td>
                </tr>
              
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default PlayersForm;
