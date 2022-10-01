document.addEventListener("DOMContentLoaded", () =>{
    createSquares();
    getNewWord();

    let guessedWords = [[]];
    let availableSpace = 1;
    
    let word = "";
    
    let guessWordCount = 0;
    let keys = document.querySelectorAll(".keyboard-row button");


    function getNewWord() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '035e89a3e5mshf26611e82fd40b8p1281bejsnfec8333840b7',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };
        
        fetch('https://wordsapiv1.p.rapidapi.com/words/?lettersmin=5&lettersMax=5', options)
            .then(response => response.json())
            .then(response => word = response)
            .catch(err => console.error(err));
    } 
    


//FUNCTION TO CREATE SQUARES IN THE GRID 
function createSquares() {
    let gameBoard = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("animate__animated")
        square.setAttribute("id", index + 1);
        gameBoard.appendChild(square);
    }
}



// FUNCTION TO GET THE CURRENT WORD BEING TYPED FROM THE GUESSED WORDS ARRAY 
    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }



//FUNCTION TO UPDATE LETTERS IN THE SQUARES AND THE CURRENT ONGOING WORD ARRAY 
    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if(currentWordArr && currentWordArr.length < 5){
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
    }



//FUNCTION TO GET TILE COLOR ACCORDING TO THE ENTERED WORD
    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if(!isCorrectLetter){
            return "#3a3a3c";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if(isCorrectPosition){
            return "#538d4e";
        }

        return "#b59f3b";
    }




//FUNCTION TO CHECK FOR WORD WHEN PRESSED ENTER
    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if(currentWordArr.length !== 5){
            window.alert("Word must be 5 letters");
        }

        const currentWord = currentWordArr.join('');

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '035e89a3e5mshf26611e82fd40b8p1281bejsnfec8333840b7',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };
        
        fetch(`https://wordsapiv1.p.rapidapi.com/words/${currentWord}`, options)
            .then((res) =>{
                if(!res.ok){
                    throw Error();
                }

                const firstLetterId = guessWordCount * 5 + 1;
                let interval = 300;
                currentWordArr.forEach((letter, index) => {
                    setTimeout(() => {
                        let tileColor = getTileColor(letter, index);

                        const letterId = firstLetterId + index;
                        const letterEl = document.getElementById(letterId);
                        letterEl.classList.add("animate__flipInX");
                        letterEl.style = `background-color: ${tileColor};
                        border-color: ${tileColor}`;
                    }, interval * index);
                });

                guessWordCount += 1;


                if(currentWord === word){
                    window.alert("Correct Word");
                }

                if(guessedWords.length === 6){
                    window.alert(`No more guesses. 
                    The word is ${word}`);
                }

                guessedWords.push([]);

            }).catch(() =>{
                window.alert("Word not recognized");
            });        
    }


    function handleDeleteLetter() {
        let currentWordArr = getCurrentWordArr();
        let removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length - 1] = currentWordArr;
        
        let lastLetterEl = document.getElementById(String(availableSpace - 1));

        lastLetterEl.textContent = '';
        availableSpace = availableSpace - 1;
    }




    for(let i=0; i<keys.length; i++){
        keys[i].onclick = ({target}) => {
            const letter = target.getAttribute("data-key");

            if(letter === "enter"){
                handleSubmitWord();
                return;
            }

            if(letter === "del"){
                handleDeleteLetter();
                return;
            }
            
            updateGuessedWords(letter);
        };
    }
});