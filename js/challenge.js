//Script tag is at the end of index.html so all code will run 
//after DOM content is loaded

//Global variables for DOM Nodes
const counter = document.getElementById('counter');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const heart = document.getElementById('heart');
const pauseButton = document.getElementById('pause');
const submitButton = document.getElementById('submit')
const form = document.getElementById('comment-form')

//Functions to start and stop timer, to be used in later functions or as a callback
let intervalId //global variable that represents return value of currently running setInterval
function startCounter() {
    return intervalId = setInterval(() => {
        let counterValue = parseInt(counter.textContent, 10)
        counterValue += 1
        counter.textContent = counterValue
    }, 1000)
}
function stopCounter() {
    clearInterval(intervalId)
    return intervalId = null
}

//Functions to handle likes
function newLike() {
    const li = document.createElement('li')
    li.textContent = `${counter.textContent} has been liked 1 time`
    li.id = `likes${counter.textContent}`
    li.className = '1' //Probably wouldn't need this if I was communicating with a server
    document.querySelector('.likes').appendChild(li)
}
function repeatLike(currentNum) {
    const currentLi = document.getElementById(`likes${currentNum}`)
    currentLi.textContent = `${currentNum} has been liked ${parseInt(currentLi.className, 10) + 1} times`
    currentLi.className = parseInt(currentLi.className, 10) + 1 // Ditto about the server
}

//Functions for pause/resume
function disableCounter() {
    stopCounter();
    minus.disabled = true
    plus.disabled = true
    heart.disabled = true
    pauseButton.textContent = ' resume '
}
function enableCounter() {
    startCounter()
    minus.disabled = false
    plus.disabled = false
    heart.disabled = false
    pauseButton.textContent = ' pause '
}

//Function to handle comments
function handleComments(comment) {
    const p = document.createElement('p')
    p.textContent = comment
    document.getElementById('list').appendChild(p)
}

//Event listeners
window.addEventListener('load', startCounter);

minus.addEventListener('click', () => {
    let counterValue = parseInt(counter.textContent, 10)
    counterValue -= 1
    counter.textContent = counterValue
})

plus.addEventListener('click', () => {
    let counterValue = parseInt(counter.textContent, 10)
    counterValue += 1
    counter.textContent = counterValue
})

heart.addEventListener('click', () => {
    document.getElementById(`likes${counter.textContent}`) === null ? newLike() : repeatLike(counter.textContent)
})

pauseButton.addEventListener('click', () => {
    pauseButton.textContent === ' pause ' ? disableCounter() : enableCounter()
})

form.addEventListener('submit', e => {
    e.preventDefault()
    handleComments(e.target.comment.value)
    e.target.comment.value = ''
})