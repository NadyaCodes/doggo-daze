import "./App.css";
import { useEffect, useState } from "react";
import dogBoneBackground from "./images/dog-bone-background.jpeg";
import singleBone from "./images/single-bone.jpeg";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [displayBreeds, setDisplayBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shuffledBreeds, setShuffledBreeds] = useState([]);
  const [selectedBreedNames, setSelectedBreedNames] = useState([]);
  const [highlight, setHighlight] = useState({ boxBreed: "", listBreed: "" });
  const [matches, setMatches] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        const allBreedNames = Object.keys(data.message);
        const selectedBreeds = [];
        let numOfDogs = 1;
        while (numOfDogs <= 12) {
          let index = Math.floor(Math.random() * allBreedNames.length);
          let selectedBreed = allBreedNames[index];
          if (!selectedBreeds.includes(selectedBreed)) {
            selectedBreeds.push(selectedBreed);
            numOfDogs++;
          }
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

  function highlightBreed(elementType, name) {
    setHighlight((prev) => ({ ...prev, [elementType]: name }));
  }

  useEffect(() => {
    const { boxBreed, listBreed } = highlight;
    if (boxBreed === listBreed && !matches.includes(boxBreed)) {
      setMatches([...matches, boxBreed]);
    }
  }, [highlight, matches]);

  const breedsDisplay = displayBreeds.map((breed, index) => {
    let isHighlighted = false;
    if (highlight.boxBreed === breed.name) {
      isHighlighted = true;
    }
    let itemClass = `breed-container`;
    let breedClass = `dog-bone-background  ${
      isHighlighted === true && "featured"
    }`;
    return (
      <div
        key={index}
        className={itemClass}
        onClick={() => highlightBreed("boxBreed", breed.name)}
      >
        <div className="breed-image-conainer">
          <img
            src={dogBoneBackground}
            alt="dog bone background"
            className={breedClass}
          ></img>
          <div>
            <img src={breed.image} alt={`${breed.name}`} className="dog-box" />
          </div>
        </div>
      </div>
    );
  });

  const breedNames = shuffledBreeds.map((breed, index) => {
    let isHighlighted = false;
    if (highlight.listBreed === breed.name) {
      isHighlighted = true;
    }

    let breedClass = `breed-name-text ${isHighlighted === true && "featured"}`;
    return (
      <div
        key={index}
        className={breedClass}
        onClick={() => highlightBreed("listBreed", breed.name)}
      >
        {breed.name}
      </div>
    );
  });

  useEffect(() => {
    if (matches.length > 1) {
      function checkName(breed) {
        return breed.name === matches[matches.length - 1];
      }
      const breedIndex = displayBreeds.findIndex(checkName);
      displayBreeds[breedIndex].image = singleBone;
      setDisplayBreeds(displayBreeds);
      const shuffledBreedIndex = shuffledBreeds.findIndex(checkName);
      shuffledBreeds.splice(shuffledBreedIndex, 1);
      setShuffledBreeds(shuffledBreeds);
      setHighlight({ boxBreed: "", listBreed: "" });
    }
  }, [matches, displayBreeds, shuffledBreeds]);

  useEffect(() => {
    if (loading === false) {
      let allMatched = false;
      if (breedNames.length < 1) {
        allMatched = true;
      }
      if (allMatched === true) {
        setDone(true);
      } else {
        setDone(false);
      }
    }
  }, [breedNames, loading]);

  function refreshGame() {
    window.location.reload(false);
  }

  return (
    <div className="App">
      <div className="title">
        <h1>🐶 DOGGO DAYZE 🐶</h1>
        <div onClick={() => refreshGame()} className="refresh">
          Refresh
        </div>
      </div>

      {loading === true ? (
        <div>Loading...</div>
      ) : (
        <div>
          {done === true ? (
            <div className="winning-cube">
              <h2>DONE!</h2>

              <div onClick={() => refreshGame()} className="refresh">
                &#8594; &nbsp; Refresh &nbsp; &#8592;
              </div>
            </div>
          ) : (
            <div>
              <div className="game-display-container">
                <div className="breed-display-container">{breedsDisplay}</div>
                <div className="breed-name-display-container">{breedNames}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
