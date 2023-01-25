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
        const selectedBreeds = [];

        for (let i = 0; i < 10; i++) {
          let index = Math.floor(Math.random() * allBreedNames.length);
          let selectedBreed = allBreedNames[index];
          fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
            .then((response) => response.json())
            .then((data) => {
              selectedBreeds.push({ name: selectedBreed, image: data.message });
              setBreeds(selectedBreeds);
            });
        }
      });
  }, []);

  const breedsDisplay = breeds.map((breed, index) => {
    return (
      <div key={index} className="breed-container">
        {breed.name}{" "}
        <img
          src={breed.image}
          alt={`${breed.name}`}
          style={{ width: "10rem", height: "10rem" }}
        />
      </div>
    );
  });

  return (
    <div className="App">
      <div>{breedsDisplay}</div>
    </div>
  );
}

export default App;
