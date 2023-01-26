import "./App.css";
import { useEffect, useState, useRef } from "react";
import dogBoneBackground from "./images/dog-bone-background.jpeg";

function App() {
  const [breeds, setBreeds] = useState([]);
  const tempBreeds = useRef([]);
  const [displayBreeds, setDisplayBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shuffledBreeds, setShuffledBreeds] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        const allBreedNames = Object.keys(data.message);
        tempBreeds.current = allBreedNames;
      })
      .then(() => {
        const selectedBreeds = [];
        for (let i = 0; i < 12; i++) {
          let index = Math.floor(Math.random() * tempBreeds.current.length);
          let selectedBreed = tempBreeds.current[index];

          fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
            .then((response) => response.json())
            .then((data) => {
              selectedBreeds.push({ name: selectedBreed, image: data.message });
            })
            .then(() => setBreeds(selectedBreeds));
        }
      });
  }, []);

  useEffect(() => {
    if (breeds.length >= 12) {
      setDisplayBreeds(breeds);
      setLoading(false);
    }
  }, [breeds, displayBreeds]);

  const breedsDisplay = breeds.map((breed, index) => {
    return (
      <div key={index} className="breed-container">
        {breed.name}{" "}
        <div className="breed-image-conainer">
          <img
            src={dogBoneBackground}
            alt="dog bone background"
            className="dog-bone-background"
          ></img>
          <div>
            <img src={breed.image} alt={`${breed.name}`} className="dog-box" />
          </div>
        </div>
      </div>
    );
  });

  const breedNames = breeds.map((breed, index) => {
    return (
      <div key={index} className="breed-name-text">
        {breed.name}
      </div>
    );
  });

  return (
    <div className="App">
      {loading === true ? (
        <div>Loading...</div>
      ) : (
        <div className="game-display-container">
          <div className="breed-display-container">{breedsDisplay}</div>
          <div className="breed-name-display-container">{breedNames}</div>
        </div>
      )}
    </div>
  );
}

export default App;
