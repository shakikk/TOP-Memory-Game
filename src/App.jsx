import { useEffect, useState } from 'react'
import './App.css'

const initialPokemonList = ["Pikachu", "Charizard", "Bulbasaur", "Squirtle",
                            "Eevee", "Gengar", "Lucario", "Snorlax",
                            "Mewtwo", "Jigglypuff", "Dragonite", "Arcanine"
                           ];

function DisplayCard({pokemon, handleChoice}){
  const [image, setImage] = useState('');

  const fetchImage = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    const pokeData = await response.json();
    const imageUrl = pokeData.sprites.front_default;
    setImage(imageUrl);
  }

  useEffect(() => {
    fetchImage();
  }, []);

  return(
    <div className='pokemon-card' onClick={() => handleChoice(pokemon)}>
      {image != '' ? (
        <img 
          src={image} 
          alt="pokemon image" 
          className='pokemon-image'
        /> 
        ) : (
        <p> Loading... </p>
      )}
      <p className="pokemon-name"> {pokemon} </p>
    </div>
  )
}

function App() {
  const [pokemonList, setPokemonList] = useState(initialPokemonList);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };


  const handleChoice = (pokemon) => {
    if(choices.includes(pokemon)){
      setChoices([]);
      setScore(0);
    }
    else{
      setChoices([...choices, pokemon])
      setScore(score + 1);

      if(score+1>highScore){
        setHighScore(highScore + 1);
      }
    }
    console.log(choices);
    
    setPokemonList(shuffleArray(pokemonList));
  }

  return(
    <>
      <div className="banner">
        {score === 12 ? <h1 className='win-banner'> You Win! 🎊 </h1> : (
          <>
            <div>
              <h2> Memory Game </h2>
            </div>
            <div>
              <h3> Score: {score}</h3>
              <h3> High Score: {highScore} </h3>
            </div>
          </>
        )}
      </div>
      { pokemonList.map(pokemon => {
          return (
            <DisplayCard 
              key={pokemon} 
              pokemon={pokemon} 
              handleChoice={() => handleChoice(pokemon)}
            />
          )
        })
      }
    </>
  )
}

export default App
