// Pseudocode

// 1. Initialize DOM elements and game states

// 2. Randomly make the mole appear and disappear while playing

// 3. Handle the whacks and scoring

// 4. Include reset, timer, start game controls and loop the game

// 5. Add the necessary event listeners like the start button



const mainPage = document.querySelector('.mainPage')
const easyButton = document.querySelector('#easyButton')
const mediumButton = document.querySelector('#mediumButton')
const hardButton = document.querySelector('#hardButton')
const rulesPage = document.querySelector('.rulesPage')
const chosenMode = document.querySelector('#chosenMode')
const backButton = document.querySelector('#backButton')
const continueButton = document.querySelector('#continueButton')
const gamePage = document.querySelector('.gamePage')
const titleMode = document.querySelector('#titleMode')
const startButton = document.querySelector('#startButton')
const resetButton = document.querySelector('#resetButton')
const gameboard = document.querySelector('.gameboard')
const timer = document.querySelector('#timer')
const score = document.querySelector('.score') 
const resultDisplay = document.querySelector('#resultDisplay')
const difficultySettings = {
    'Easy Mode': {showTime: 2500, appearInterval: 2500, duration: 90},
    'Medium Mode': {showTime: 1200, appearInterval: 1200, duration: 90},
    'Hard Mode': {showTime: 800, appearInterval: 800, duration: 90}
}

let gameInterval
let holesNum = 0
let timeLeft = 0
let molesHit = 0
let totalMoles = 0
let scoreCount = 0
let timerInterval = null
let activeMole = null
let moleTimeout = null
let isGameActive = false
let currentDifficulty = ''

mainPage.style.display = 'block'
rulesPage.style.display = 'none'
gamePage.style.display = 'none'
resultDisplay.style.display = 'none'

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

    for (let i=0; i<holesNum ;i++) {
        let hole = document.createElement('div')
        hole.className = 'hole'
        hole.id = `hole-${i}`
        hole.innerHTML = `<img src="./assets/mole.png" alt= "Mole" class="moleImg"> <img src="./assets/rock.png" alt="Rock" class="rockImg">`
        gameboard.appendChild(hole)

        const mole = hole.querySelector('.moleImg')
        const rock = hole.querySelector('.rockImg')

        mole.style.display = 'none'
        rock.style.display = 'block'

        hole.addEventListener('click', () => {
            if (isGameActive && mole.style.display === 'block') {
                scoreCount++
                molesHit ++
                score.textContent = `Score: ${scoreCount}`
                mole.style.display = 'none'
                rock.style.display = 'block'
            }
        })
    }    
}

function appearRandomMole() {
    if (!isGameActive) return;

    totalMoles++

    const holes = document.querySelectorAll ('.hole')
    const holeDivs = [...holes]

    if (moleTimeout) {
        clearTimeout(moleTimeout)
        moleTimeout = null
    }

    if (activeMole) {
        activeMole.firstChild.style.display = 'none'
        activeMole.lastChild.style.display = 'block'
    }

    let randomHole
    do {
        num = Math.floor(Math.random() * holesNum) + 1
        randomHole = holeDivs [num-1]
    } while (randomHole === activeMole && holesNum > 1) 

    randomHole.firstChild.style.display = 'block'
    randomHole.lastChild.style.display = 'none'
    activeMole = randomHole

    const showTime = difficultySettings[currentDifficulty].showTime
    moleTimeout = setTimeout (() => {
        if (activeMole) {
            activeMole.firstChild.style.display = 'none'
            activeMole.lastChild.style.display = 'block'
            activeMole = null
        }
    }, showTime)
}

function updateTimer() {
    const minutes = Math.floor(timeLeft/60)
    const seconds = timeLeft % 60
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

function startGame () {
    isGameActive = true
    activeMole = null
    scoreCount = 0
    molesHit = 0
    totalMoles = 0
    score.textContent = `Score: ${scoreCount}`

    timeLeft = difficultySettings[currentDifficulty].duration
    updateTimer()

    resultDisplay.style.display = 'none'

    const appearInterval = difficultySettings[currentDifficulty].appearInterval

    gameInterval = setInterval(() => {
        appearRandomMole()
    }, appearInterval)

    timerInterval = setInterval(() => {
        timeLeft--
        updateTimer()

        if (timeLeft <= 0) {
            endGame()
        }
    }, 1000)
}

function endGame() {
    isGameActive = false
    clearInterval(gameInterval)
    clearInterval(timerInterval)

    if (activeMole) {
        activeMole.firstChild.style.display = 'none'
        activeMole.lastChild.style.display = 'block'
        activeMole = null
    }

    const molesHitPercentage = totalMoles > 0 ? (molesHit/totalMoles)*100 : 0 

    const win = molesHitPercentage > 70

    resultDisplay.innerHTML = `
    <div class= "resultStatus">Total Moles: ${totalMoles}</div>
    <div class= "resultStatus">Moles Hit: ${molesHit}</div>
    <div class= "resultStatus">Hit Percentage: ${molesHitPercentage.toFixed(1)}%</div>
    <div class= "${win ? 'resultWin' : 'resultLose'}">
        ${win ? 'You win!' : 'You lose!'}
    </div>
    `

    resultDisplay.style.display = 'block'
}

continueButton.addEventListener('click', () => {
    rulesPage.style.display = 'none'
    gamePage.style.display = 'block'
    titleMode.textContent = `Whack-A-Mole: ${currentDifficulty}`
    setupGameboard()
})

startButton.addEventListener('click', () => {
    startGame()
})

resetButton.addEventListener('click', () => {
    endGame()
    if (moleTimeout) {
        clearTimeout(moleTimeout)
    }

    gamePage.style.display = 'none'
    mainPage.style.display = 'block'
    currentDifficulty = ''
    timer.textContent = ' 1:30'
    score.textContent = 'Score: 0'
    scoreCount = 0
    gameboard.innerHTML = ''
    resultDisplay.style.display = 'none'
})


