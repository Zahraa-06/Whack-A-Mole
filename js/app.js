// Pseudocode

// 1. Initialize DOM elements and game states

// 2. Randomly make the mole appear and disappear while playing

// 3. Handle the whacks and scoring

// 4. Include reset, timer, start game controls and loop the game

// 5. Add the necessary event listeners like the start button

//Queryselector for the gameboard
//3 part if statements for easy medium and hard
//if easy append 4 divs to gameboard with class of hole
//set inner html of each hole div to contain rock and mole image


const mainPage = document.querySelector('.mainPage')
//
const easyButton = document.querySelector('#easyButton')
const mediumButton = document.querySelector('#mediumButton')
const hardButton = document.querySelector('#hardButton')
//
const rulesPage = document.querySelector('.rulesPage')
//
const chosenMode = document.querySelector('#chosenMode')
//
const backButton = document.querySelector('#backButton')
const continueButton = document.querySelector('#continueButton')
//
const gamePage = document.querySelector('.gamePage')
//
const titleMode = document.querySelector('#titleMode')
//
const startButton = document.querySelector('#startButton')
const resetButton = document.querySelector('#resetButton')
//
const gameboard = document.querySelector('.gameboard')
//
const timer = document.querySelector('#timer')
const score = document.querySelector('.score')
//

let currentDifficulty = ''

mainPage.style.display = 'block'
rulesPage.style.display = 'none'
gamePage.style.display = 'none'

function chooseDifficulty (difficulty) {
    currentDifficulty = difficulty
    chosenMode.textContent = difficulty
    mainPage.style.display = 'none'
    rulesPage.style.display = 'block'
}

easyButton.addEventListener('click', () => {
    chooseDifficulty('Easy Mode')
})

mediumButton.addEventListener('click', () => {
    chooseDifficulty('Medium Mode')
})

hardButton.addEventListener('click', () => {
    chooseDifficulty('Hard Mode')
})

backButton.addEventListener('click', () => {
    rulesPage.style.display = 'none'
    mainPage.style.display = 'block'
})

function setupGameboard () {

    // gameboard.innerHTML = ''
    // let holesCount;
    // if (currentDifficulty === 'Easy Mode') {
    //     holesCount = 4
    // } else if (currentDifficulty === 'Medium Mode') {
    //     holesCount = 6
    // } else {
    //     holesCount = 9
    // }

    // for (let i=0; i<holesCount;i++) {
    //     let hole = document.createElement('div')
    //     hole.className = 'hole'
    //     hole.innerHTML = `<img src="./assets/mole.png" alt= "Mole" class="moleImg"> <img src="./assets/rock.png" alt="Rock" class="rockImg">`
    //     gameboard.appendChild(hole)
    // }

    // let hole = document.createElement('div')
    // hole.className = 'hole'
    // hole.innerHTML=`<img src="./assets/mole.png" alt= "Mole" class="moleImg"> <img src="./assets/rock.png" alt="Rock" class="rockImg">`
    
    console.log('setup running') //
    if (currentDifficulty === 'Easy Mode') {
        for (i=0;i<4;i++){
            
            let hole = document.createElement('div')
            hole.className = 'hole'
            hole.innerHTML=`<img src="./assets/mole.png" alt= "Mole" class="moleImg"> <img src="./assets/rock.png" alt="Rock" class="rockImg">`
            console.log(hole) //
            gameboard.appendChild(hole)
        }
    } else if (currentDifficulty === 'Medium Mode') {
        for (i=0;i<6;i++){
            gameboard.appendChild(hole)
        }
    } else {
            for (i=0;i<9;i++){
            gameboard.appendChild(hole)
        }
    }
}


continueButton.addEventListener('click', () => {
    rulesPage.style.display = 'none'
    gamePage.style.display = 'block'
    titleMode.textContent = `Whack-A-Mole: ${currentDifficulty}`
    setupGameboard()
})

resetButton.addEventListener('click', () => {
    gamePage.style.display = 'none'
    mainPage.style.display = 'block'
    currentDifficulty = ''
    timer.textContent = ' 00:00'
    score.textContent = 'Score: 0'
    gameboard.innerHTML = ''
})


