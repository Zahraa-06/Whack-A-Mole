// Pseudocode

// 1. Initialize DOM elements and game states

// 2. Randomly make the mole appear and disappear while playing

// 3. Handle the whacks and scoring

// 4. Include reset, timer, start game controls and loop the game

// 5. Add the necessary event listeners like the start button



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


let holesNum = 0
let scoreCount = 0
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
    gameboard.innerHTML = ''
    gameboard.classList.remove('easyMode', 'mediumMode', 'hardMode')

    let gridClass

    if (currentDifficulty === 'Easy Mode') {
        holesNum = 4
        gridClass = 'easyMode'
    } else if (currentDifficulty === 'Medium Mode') {
        holesNum = 6
        gridClass = 'mediumMode'
    } else {
        holesNum = 9
        gridClass = 'hardMode'
    }

     gameboard.classList.add(gridClass)

    for (let i=0; i<holesNum;i++) {
        let hole = document.createElement('div')
        hole.className = 'hole'
        hole.id = `hole-${i}`
        hole.innerHTML = `<img src="./assets/mole.png" alt= "Mole" class="moleImg"> <img src="./assets/rock.png" alt="Rock" class="rockImg">`
        gameboard.appendChild(hole)

        const mole = hole.querySelector('.moleImg')
        const rock = hole.querySelector('.rockImg')

        hole.addEventListener('click', () => {
            if (mole.style.display === 'block') {
                scoreCount++
                score.textContent = `Score: ${scoreCount}`
                mole.style.display = 'none'
                rock.style.display = 'block'
            }
            appearRandomMole()
        })
    }    

}

function appearRandomMole() {
    const holes = document.querySelectorAll ('.hole')
    const holeDivs = [...holes]
    const num = Math.floor(Math.random() * (holesNum)) + 1 //
    const randomHole = holeDivs [num-1]
    console.log(randomHole)
    randomHole.firstChild.style.display = 'block'
    randomHole.lastChild.style.display = 'none'

}


continueButton.addEventListener('click', () => {
    rulesPage.style.display = 'none'
    gamePage.style.display = 'block'
    titleMode.textContent = `Whack-A-Mole: ${currentDifficulty}`
    setupGameboard()
    appearRandomMole()
})

resetButton.addEventListener('click', () => {
    gamePage.style.display = 'none'
    mainPage.style.display = 'block'
    currentDifficulty = ''
    timer.textContent = ' 00:00'
    score.textContent = 'Score: 0'
    scoreCount = 0
    gameboard.innerHTML = ''
})


