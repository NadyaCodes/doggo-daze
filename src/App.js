import "./App.css";
import { useEffect, useState, useRef } from "react";
import dogBoneBackground from "./images/dog-bone-background.jpeg";

function App() {
  const [breeds, setBreeds] = useState([]);
  const tempBreeds = useRef([]);
  const [displayBreeds, setDisplayBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shuffledBreeds, setShuffledBreeds] = useState([]);
  // const [selectedBreed, setSelectedBreed] = useState("");
  // const [dog, setDog] = useState([]);

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

  function shuffle(array) {
    let range = array.length;

    const newArray = [];

    while (range >= 0) {
      let randomIndex = Math.floor(Math.random() * range);
      newArray.push(array[randomIndex]);
      range--;
    }

    return newArray;
  }

  // const removeDoubles = (arr) => {
  //   const tempArr = [...arr];
  //   const cleanArray = [];
  //   while (tempArr.length > 0) {
  //     let i = tempArr.length - 1;
  //     if (!cleanArray.includes(tempArr[i])) {
  //       cleanArray.push(tempArr[i]);
  //     }
  //     tempArr.pop();
  //   }
  //   console.log(cleanArray);
  //   return cleanArray;
  // };

  useEffect(() => {
    if (breeds.length >= 12) {
      // let cleanedBreeds = removeDoubles(breeds);
      let shuffled = shuffle(breeds);
      setShuffledBreeds(shuffled);
      // setLoading(false);
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
