import React, {useState, useEffect} from 'react';
import './App.scss';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

let fraseDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [frase, setFrase] = useState("Life is what we make it, always has been, always will be.");
  const [autor, setAutor] = useState("Grandma Moses");
  const [numeroAleatorio, setNumeroAleatorio] = useState(0);
  const [frasesArray, setFrasesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34');

  const fetchFrases = async (url) => {
      const response = await fetch(url)
      const parsedJSON = await response.json()
      setFrasesArray(parsedJSON.quotes)
      console.log(parsedJSON)
    }

  useEffect(() => {
    fetchFrases(fraseDBUrl)
  }, [fraseDBUrl])

  const getFraseAleatorio = () => {
    let aleIntero = Math.floor(frasesArray.length * Math.random())
    setNumeroAleatorio(aleIntero);
    setAccentColor(COLORS_ARRAY[aleIntero])
    setFrase(frasesArray[aleIntero].quote);
    setAutor(frasesArray[aleIntero].author);
  }
  
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color: accentColor}}>
          <h1>Número Aleatorio: {numeroAleatorio}</h1>
          <p id="text">
            "{frase}"
          </p>
          <p id="author">- {autor}</p>
          <div className="button">
          <a id="tweet-quote" style={{backgroundColor: accentColor}} href={encodeURI("http://www.twitter.com/intent/tweet?text=${quote} -${author}")}><FontAwesomeIcon icon={faTwitter} /></a>
          </div>

          <div>
            <button id="new-quote" onClick={() => getFraseAleatorio()} style={{ backgroundColor: accentColor }}>Nueva Frase</button>
          </div>  
        </div>
      </header>
    </div>
  );
}

export default App;
