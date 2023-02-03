import "./App.css";
import { useEffect, useState } from "react";
import dogBoneBackground from "./images/dog-bone-background.jpeg";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [displayBreeds, setDisplayBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shuffledBreeds, setShuffledBreeds] = useState([]);
  const [selectedBreedNames, setSelectedBreedNames] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        const allBreedNames = Object.keys(data.message);
        const selectedBreeds = [];
        let numOfDogs = 1;
        while (numOfDogs <= 12) {
          numOfDogs++;
          let index = Math.floor(Math.random() * allBreedNames.length);
          let selectedBreed = allBreedNames[index];
          selectedBreeds.push(selectedBreed);
        }
        setSelectedBreedNames(selectedBreeds);
      });
  }, []);

  useEffect(() => {
    if (selectedBreedNames.length === 12) {
      selectedBreedNames.forEach((breedName) => {
        fetch(`https://dog.ceo/api/breed/${breedName}/images/random`)
          .then((response) => response.json())
          .then((data) => {
            let newBreed = { name: breedName, image: data.message };
            setBreeds((prev) => [...prev, newBreed]);
          });
      });
    }
  }, [selectedBreedNames]);

  useEffect(() => {
    if (breeds.length === 12) {
      setDisplayBreeds(breeds);
      setLoading(false);
    }
  }, [breeds]);

  function shuffle(array) {
    let arrCopy = [...array];

    const newArray = [];

    while (arrCopy.length > 0) {
      let randomIndex = Math.floor(Math.random() * arrCopy.length);
      newArray.push(arrCopy[randomIndex]);
      arrCopy.splice(randomIndex, 1);
    }

    return newArray;
  }

  useEffect(() => {
    if (displayBreeds.length > 1) {
      let shuffled = shuffle(displayBreeds);
      setShuffledBreeds(shuffled);
    }
  }, [displayBreeds]);

  const breedsDisplay = displayBreeds.map((breed, index) => {
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

  const breedNames = shuffledBreeds.map((breed, index) => {
    return (
      <div key={index} className="breed-name-text">
        {breed.name}
      </div>
    );
  });

  // useEffect(() => {
  //   if (selectedBreed.length > 0) {
  //     const pickedDog = breeds.filter((breed) => {
  //       if (breed.name.includes(selectedBreed)) {
  //         return breed;
  //       } else {
  //         return undefined;
  //       }
  //     });
  //     if (pickedDog && pickedDog.length === 1) {
  //       setDog(pickedDog);
  //       console.log(pickedDog);
  //     }
  //   }
  // }, [selectedBreed, breeds]);

  return (
    <div className="App">
      {loading === true ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="game-display-container">
            <div className="breed-display-container">{breedsDisplay}</div>
            <div className="breed-name-display-container">{breedNames}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
