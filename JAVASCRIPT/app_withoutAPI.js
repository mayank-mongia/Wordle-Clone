document.addEventListener("DOMContentLoaded", () =>{
    createSquares();
    const wordArr = ["there","their","about","would","these","other","words","could","write","first","water","after","where","right","think","three","years","place","sound","great","again","still","every","small","found","those","never","under","might","while","house","world","below","asked","going","large","until","along","shall","being","often","earth","began","since","study","night","light","above","paper","parts","young","story","point","times","heard","whole","white","given","means","music","miles","thing","today","later","using","money","lines","order","group","among","learn","known","space","table","early","trees","short","hands","state","black","shown","stood","front","voice","kinds","makes","comes","close","power","lived","vowel","taken","built","heart","ready","quite","class","bring","round","horse","shows","piece","green","stand","birds","start","river","tried","least","field","whose","girls","leave","added","color","third","hours","moved","plant","doing","names","forms","heavy","ideas","cried","check","floor","begin","woman","alone","plane","spell","watch","carry","wrote","clear","named","books","child","glass","human","takes","party","build","seems","blood","sides","seven","mouth","solve","north","value","death","maybe","happy","tells","gives","looks","shape","lives","steps","areas","sense","speak","force","ocean","speed","women","metal","south","grass","scale","cells","lower","sleep","wrong","pages","ships","needs","rocks","eight","major","level","total","ahead","reach","stars","store","sight","terms","catch","works","board","cover","songs","equal","stone","waves","guess","dance","spoke","break","cause","radio","weeks","lands","basic","liked","trade","fresh","final","fight","meant","drive","spent","local","waxes","knows","train","bread","homes","teeth","coast","thick","brown","clean","quiet","sugar","facts","steel","forth","rules","notes","units","peace","month","verbs","seeds","helps","sharp","visit","woods","chief","walls","cross","wings","grown","cases","foods","crops","fruit","stick","wants","stage","sheep","nouns","plain","drink","bones","apart","turns","moves","touch","angle","based","range","marks","tired","older","farms","spend","shoes","goods","chair","twice","cents","empty","alike","style","broke","pairs","count","enjoy","score","shore","roots","paint","heads","shook","serve","angry","crowd","wheel","quick","dress","share","alive","noise","solid","cloth","signs","hills","types","drawn","worth","truck","piano","upper","loved"];
    const word = getNewWord();
    console.log(word);


    let guessedWords = [[]];
    let availableSpace = 1;
    
    
    let guessWordCount = 0;
    let keys = document.querySelectorAll(".keyboard-row button");



//FUNCTION TO GENERATE A NEW WORD
    function getNewWord() {
        let randomWordIdx = Math.floor(Math.random() * wordArr.length);
        return wordArr[randomWordIdx];
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
        else{
            const currentWord = currentWordArr.join('');


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
            for(let i=0; i<keys.length; i++){
                keys[i].setAttribute("disabled", '');
            }

            setTimeout(() => {
                let wonCard = document.getElementById("won-card");
                wonCard.style.visibility = "visible";
            }, 2000);
        }

        if(guessedWords.length === 6){
            window.alert(`No more guesses.
            The word is ${word}`);
        }

        guessedWords.push([]); 
        }
              
    }



//FUNCITON TO DELETE LETTER ON KEY PRESS
    function handleDeleteLetter() {
        let currentWordArr = getCurrentWordArr();
        currentWordArr.pop();

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