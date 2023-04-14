import React , {useState} from 'react'


export default function TextForm(props) {
  const space = ' ';
  const timeSeconds = 0.008;

  // Define Morse code dictionary
  const morseCode = {
    "A": ".-",    "B": "-...",  "C": "-.-.",  "D": "-..",   "E": ".",     "F": "..-.",
    "G": "--.",   "H": "....",  "I": "..",    "J": ".---",  "K": "-.-",   "L": ".-..",
    "M": "--",    "N": "-.",    "O": "---",   "P": ".--.",  "Q": "--.-",  "R": ".-.",
    "S": "...",   "T": "-",     "U": "..-",   "V": "...-",  "W": ".--",   "X": "-..-",
    "Y": "-.--",  "Z": "--..",  "0": "-----", "1": ".----", "2": "..---", "3": "...--",
    "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
    ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--", "/": "-..-.",
    "(": "-.--.", ")": "-.--.-", "&": ".-...",  ":": "---...", ";": "-.-.-.", "=": "-...-",
    "+": ".-.-.", "-": "-....-", "_": "..--.-", "\"": ".-..-.", "$": "...-..-", "@": ".--.-."
  };


  // For English To Morse Code
  const textToMorse = (englisText) => {
    return englisText.toUpperCase().split('').map(char => {
      if (char === ' ') {
        return '/';
      }
      return morseCode[char] || '';
    }).join(' ');
  }
  const handleEnglishToMorseClick = () =>{
    const codeMorse = textToMorse(text);
    console.log(codeMorse)
    setText(codeMorse);
    props.showAlert("Converted to Morse Code", "success")


  }

  // For Morse Code to English 
  const morseToEnglish = (codeMorse) =>{
    return(
      codeMorse.split(" ").map((code)=>{
        if (code === '/') {
          return ' ';
        }
        return Object.keys(morseCode).find(key => morseCode[key] === code.toUpperCase()) || '';
      }).join('')
    );
  }
  const handleMorseToEnglishClick = () =>{
    const textEnglish = morseToEnglish(text);
    setText(textEnglish);
    props.showAlert("Converted to English", "success")


  }

  // For UpperCase Text 
  const handleUpClick = ()=>{
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Upper Case", "success")

  }

  // For LowerCase Text  
  const handleLoClick = ()=>{
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lower Case", "success")

  }

  // For Capital Text  
  const handleCapClick = ()=>{
    const textArray= text.split(' ');
    for (let i = 0; i < textArray.length; i++) {
        textArray[i] = textArray[i].charAt(0).toUpperCase() + textArray[i].slice(1);
    }
    const CapText = textArray.join(" ");
    setText(CapText)
    props.showAlert("Converted to Capital", "success")

    
  }

  // For Find Emails in Text 
  const extractEmail = (textEmail) => {
    const words = textEmail.split(' ');
    const emails = [];
    words.forEach((word) => {
      if (word.includes('@') && word.includes('.')) {
        emails.push(word);
      }
    });
    return emails;
  }
  function handleEmailClick() {
    const emails = extractEmail(text);
    const email = emails.join(' ');
    setText(email);
    props.showAlert("Emails!?", "success")

  }

    // For Remove Space
  const handleRemoveSpaceClick = ()=>{
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Converted to Extra Spaceses Removed", "success")

  }  

    // For Copy Text
  const handleCopyClick = ()=>{
    let copyText = document.getElementById("mybox");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    props.showAlert("Text Coped!", "success")

  }    

    // Clean TextArea
  const handleCleanTextClick = ()=>{
    let newText = '';
    setText(newText);
    props.showAlert("Clean!", "success")

  }    

    // For Text Output
  const handleOnChange = (event)=>{
    setText(event.target.value)

  }

  const [text, setText] = useState('');

  return (
    <> 
        <div className='container'>
          <h1>{props.heading}</h1>
            <div className="mb-3">
            <textarea className="form-control mt-3" value={text}  onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark'? 'black': 'white', color: props.mode === 'dark'? 'white': 'black'} } id="mybox" rows="12"></textarea>
            </div>

            {/* buttons for text */}
            <button className="btn btn-primary mx-1 my-1" onClick={handleEnglishToMorseClick} style={{color: props.mode === 'dark'? 'white': 'black'}}>Convert to Morse Code</button>
            <button className="btn btn-primary mx-1 my-1" onClick={handleMorseToEnglishClick} style={{color: props.mode === 'dark'? 'white': 'black'}}>Convert to English</button>
            <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick} style={{color: props.mode === 'dark'? 'white': 'black'}}>Convert to Uppercase</button>
            <button className="btn btn-primary mx-1 my-1" onClick={handleLoClick} style={{color: props.mode === 'dark'? 'white': 'black'}}>Convert to Lowercase</button> 
            <button className="btn btn-primary mx-1 my-1" onClick={handleCapClick} style={{color: props.mode === 'dark'? 'white': 'black'}}>Convert to Capitalize</button> 
            <button className="btn btn-primary mx-1 my-1" onClick={handleRemoveSpaceClick} style={{color: props.mode === 'dark'? 'white': 'black'}}>Remove Extra Spaces</button> 
            <button className="btn btn-primary mx-1 my-1" onClick={handleEmailClick} style={{color: props.mode === 'dark'? 'white': 'black'}}>Find Email</button> 
            <button className="btn btn-success mx-1 my-1" onClick={handleCopyClick} style={{color: props.mode === 'dark'? 'white': 'black'}}>Copy Text</button>
            <button className="btn btn-danger mx-1 my-1" onClick={handleCleanTextClick} style={{color: props.mode === 'dark'? 'white': 'black'}}>Clean</button> 
        </div>

        <div className="container my-5">
            <h2>Your Text Summary</h2>
            <strong>{text.split(space).length - 1} Word's</strong><br />
            <strong>{text.length} Characters</strong><br />
            <strong>{ (timeSeconds* text.split(" ").length) - timeSeconds} Minutes read</strong>
            <h2>Preview</h2>
            <p>{text}</p>
        </div>
    </>
  )
}
