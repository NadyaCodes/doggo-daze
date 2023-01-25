import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        const allBreedNames = Object.keys(data.message);
        setBreeds(allBreedNames);
      });
  });

  const breedsDisplay = breeds.map((breed, index) => {
    return <div key={index}>{breed}</div>;
  });

  return (
    <div className="App">
      <div>{breedsDisplay}</div>
    </div>
  );
}

export default App;
