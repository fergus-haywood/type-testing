// prettier-ignore
const commonWords =  ["the", "of", "to", "and", "a", "in", "is", "it", "you", "that", "he", "was", "for", "on", "are", "with", "as", "I", "his", "they", "be", "at", "one", "have", "this", "from", "or", "had", "by", "not", "word", "but", "what", "some", "we", "can", "out", "other", "were", "all", "there", "when", "up", "use", "your", "how", "said", "an", "each", "she", "which", "do", "their", "time", "if", "will", "way", "about", "many", "then", "them", "write", "would", "like", "so", "these", "her", "long", "make", "thing", "see", "him", "two", "has", "look", "more", "day", "could", "go", "come", "did", "number", "sound", "no", "most", "people", "my", "over", "know", "water", "than", "call", "first", "who", "may", "down", "side", "been", "now", "find", "any", "new", "work", "part", "take", "get", "place", "made", "live", "where", "after", "back", "little", "only", "round", "man", "year", "came", "show", "every", "good", "me", "give", "our", "under", "name", "very", "through", "just", "form", "sentence", "great", "think", "say", "help", "low", "line", "differ", "turn", "cause", "much", "mean", "before", "move", "right", "boy", "old", "too", "same", "tell", "does", "set", "three", "want", "air", "well", "also", "play", "small", "end", "put", "home", "read", "hand", "port", "large", "spell", "add", "even", "land", "here", "must", "big", "high", "such", "follow", "act", "why", "ask", "men", "change", "went", "light", "kind", "off", "need", "house", "picture", "try", "us", "again", "animal", "point", "mother", "world", "near", "build", "self", "earth", "father", "head", "stand", "own", "page", "should", "country", "found", "answer", "school", "grow", "study", "still", "learn", "plant", "cover", "food", "sun", "four", "between", "state", "keep", "eye", "never", "last", "let", "thought", "city", "tree", "cross", "farm", "hard", "start", "might", "story", "saw", "far", "sea", "draw", "left", "late", "run", "don't", "while", "press", "close", "night", "real", "life", "few", "north", "open", "seem", "together", "next", "white", "children", "begin", "got", "walk", "example", "ease", "paper", "group", "always", "music", "those", "both", "mark", "often", "letter", "until", "mile", "river", "car", "feet", "care", "second", "book", "carry", "took", "science", "eat", "room", "friend", "began", "idea", "fish", "mountain", "stop", "once", "base", "hear", "horse", "cut", "sure", "watch", "color", "face", "wood", "main"]

// els variables

const wordsArea = document.querySelector('#words-area')
const inputArea = document.querySelector('#test-input')
const startBtn = document.querySelector('#start-test-btn')
const restartBtn = document.querySelector('#restart-test-btn')
const introEl = document.querySelector('#intro-text')

//stats variables

const currentWpmEl = document.querySelector('#current_wpm')
const currentErrorsEl = document.querySelector('#current_errors')
const currentTimeEl = document.querySelector('#current_time')
const currentAccuracyEl = document.querySelector('#current_accuracy')
const finalWpmEl = document.querySelector('#display__wpm')
const finalErrorsEl = document.querySelector('#display__errors')

// test variables

let testWordSize = 300
let testTimeLimit = 0
let testTimeLeft = 0
let testTimeElapsed = 0
let testErrors = 0
let testCpm = 0
let testWpm = testCpm / 5
let charactersTyped = 0
let testAccuracy = 0
let currentWord = ''
let timer = null

// init mapping

currentErrorsEl.innerHTML = testErrors
currentTimeEl.innerHTML = testTimeLeft
introEl.innerHTML = 'Click start to begin the test'

// game functions

let testList = []
inputArea.disabled = true

function startTest() {
  inputArea.disabled = false
  resetValues()
  testList = []

  for (let i = 0; i < testWordSize; i++) {
    let index = Math.floor(Math.random() * testWordSize)
    testList.push(commonWords[index])
  }

  clearInterval(timer)

  wordsArea.innerHTML = ''
  currentTimeEl.innerHTML = testTimeLeft

  testList
    .join(' ')
    .split('')
    .forEach((x) => {
      const span = document.createElement('span')
      span.innerHTML = x
      wordsArea.appendChild(span)
    })
  startBtn.style.display = 'none'
  restartBtn.style.display = 'block'
  introEl.innerHTML = 'Click to Restart Test'
}

function restartTest() {
  startTest()
}

function processText() {
  let currentInput = inputArea.value
  let currentInputArray = currentInput.split('')
  let wordsArray = testList.join(' ').split('')
  let currentInputIndex = currentInputArray.length - 1
  let currentInputChar = currentInputArray[currentInputIndex]
  let currentTestChar = wordsArray[currentInputIndex]

  testAccuracy = testErrors / charactersTyped

  if (isNaN(testAccuracy)) {
    testAccuracy = 1
  }

  if (charactersTyped === 0) {
    timer = setInterval(updateTimer, 1000)
  }
  //scroll up when getting low

  if (charactersTyped % 80 === 0 && charactersTyped != 0) {
    wordsArea.style.bottom = `${charactersTyped - 30}px`
    inputArea.style.bottom = `${charactersTyped - 30}px`
  }

  let wordsSpanArr = document.querySelectorAll('span')

  // need to make backspaces remove characters and if theres an error, remove the error
  if (charactersTyped > currentInputIndex) {
    charactersTyped -= 2
    if (wordsSpanArr[currentInputIndex + 1].classList.contains('error')) {
      wordsSpanArr[currentInputIndex + 1].classList.remove('error')
      testErrors--
      console.log(`current index is ${currentInputIndex + 1}`)
      console.log(testErrors)
      console.log('removed error')
    }
  } else if (currentInputChar === currentTestChar) {
    wordsSpanArr[currentInputIndex].classList.remove('error')
    wordsSpanArr[currentInputIndex].classList.add('correct')
  } else {
    testErrors++
    console.log(testErrors)
    wordsSpanArr[currentInputIndex].classList.remove('correct')
    wordsSpanArr[currentInputIndex].classList.add('error')
  }

  charactersTyped++
  currentErrorsEl.innerHTML = testErrors
  currentAccuracyEl.innerHTML = `${Math.floor(100 - testAccuracy * 100)}%`
}

function resetValues() {
  testErrors = 0
  charactersTyped = 0
  testTimeLeft = 60
  testTimeElapsed = 0
  testAccuracy = 0
  wordsArea.style.bottom = '0px'
  inputArea.style.bottom = '0px'
  inputArea.value = ''
  inputArea.disabled = false
  currentErrorsEl.innerHTML = testErrors
  currentAccuracyEl.innerHTML = ''
  currentWpmEl.innerHTML = ''
}

function updateTimer() {
  if (testTimeLeft > 0) {
    testTimeElapsed++
    testTimeLeft--
    testCpm = Math.floor(
      ((charactersTyped * (1 - testAccuracy)) / testTimeElapsed) * 60
    )
    testWpm = testCpm / 5
    currentWpmEl.innerHTML = testWpm
    currentTimeEl.innerHTML = testTimeLeft
  } else {
    introEl.innerHTML = 'Test Finished <br>Click restart to play again'
    finishGame()
  }
}

function finishGame() {
  inputArea.disabled = true
  finalWpmEl.innerHTML = `Your Words Per Minute: ${testWpm}`
}

startBtn.addEventListener('click', startTest)
restartBtn.addEventListener('click', restartTest)
