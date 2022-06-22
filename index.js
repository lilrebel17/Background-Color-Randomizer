let HexParameters = [1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
let HexArray = ['F','F','F','F','F','F']
let BackgroundColor = '#FFFFFF'

const SaveList = document.querySelector('#saved-colors')
const RandomButton = document.querySelector('#randomizer-button')
const SaveButton = document.querySelector('#save-button')
const ClearButton = document.querySelector('#clear-button')
const DrawerButton = document.querySelector('#drawer-button')

const storagekey = 'colors'

CreateHexText();

window.onload = () => {
    if(localStorage.getItem(storagekey) == null) {
        console.log('No local storage found..')
        ListStateChange(0)
        return
    }
    else {
        let array = JSON.parse(localStorage.getItem(storagekey))
        ListStateChange(1)
        for(let i=0; i < array.length; i++) {
            MoveHexToList(array[i])
        }
    }
}

RandomButton.addEventListener('click', function (){
    for(let i=0; i < 6; i++) {
        CreateHexArray();
    }
    console.log("Your New Color is " + HexArray)
    ChangeBackgroundColor();
})

SaveButton.addEventListener('click', () => {
    MoveHexToList()
    SaveColorToLocalStorage(BackgroundColor)
    ListStateChange(1)
})

ClearButton.addEventListener('click', () => {
    for(let i=SaveList.childElementCount; i > 0; i--) {
        let color = SaveList.childNodes[i]
        SaveList.removeChild(color)
        localStorage.clear()
    }
    ListStateChange(0)
})

DrawerButton.addEventListener('click', () => {
    if(SaveList.childNodes.length == 1) {
        console.log("Nothing in list")
        return
    }
    else if(SaveList.classList.contains('open')) {
        console.log("Closing List")
        ListStateChange(0)
    }
    else if(SaveList.classList.contains('closed')) {
        console.log("Opening List")
        ListStateChange(1)
    }
})



function CreateHexArray() {
        let RandNum = Math.floor(Math.random() * HexParameters.length)
        let NewVar = HexParameters[RandNum]
        HexArray.push(NewVar)
        RemovePreviousColor();
}

function RemovePreviousColor() {
    if(HexArray.length > 6) {
        HexArray.splice(0,6)
    }
}

function ChangeBackgroundColor() {
    BackgroundColor = '#' + HexArray.join('');
    BackgroundColor = BackgroundColor.toUpperCase()
    document.body.style.backgroundColor = BackgroundColor
    console.log(BackgroundColor)
    CreateHexText();
}

function CreateHexText() {
    let HexText = document.querySelector('.hex')
    HexText.innerHTML = BackgroundColor
}


function MoveHexToList(loadedcolor) {
    let SaveList = document.querySelector('#saved-colors')
    let color = BackgroundColor 

    const newDiv = document.createElement('div')
    const newP = document.createElement('p')

    if(loadedcolor == null) {
        newP.innerHTML = color
        newP.backgroundColor = color
        newDiv.style.backgroundColor = color;
    }
    else {
        newP.innerHTML = loadedcolor
        newP.backgroundColor = loadedcolor
        newDiv.style.backgroundColor = loadedcolor;
    }

    newDiv.append(newP)
    newDiv.classList.add('color')

    newP.style.margin = '0px'
    newP.style.fontSize = '4vw'

    SaveList.append(newDiv)
}

//Send 0 as variable to close 
//Send 1 as variable to open
function ListStateChange(state) {
    if(state == 0) {
        console.log("Closed..")
        SaveList.classList.add('closed')
        SaveList.classList.remove('open')
        SaveList.style.overflow = 'hidden'
        SaveList.style.width = '0px'
    }
    else if(state == 1) {
        console.log("Open..")
        SaveList.classList.add('open')
        SaveList.classList.remove('closed')
        SaveList.style.overflow = 'scroll'
        SaveList.style.width = 'auto'
    }
}

function SaveColorToLocalStorage(color) {
    if(localStorage.getItem('colors') == null) {
        let array = []
        array.push(color)
        localStorage.setItem(storagekey, JSON.stringify(array))
    }
    else {
        let array = JSON.parse(localStorage.getItem(storagekey))
        array.push(color)
        localStorage.setItem(storagekey,JSON.stringify(array))
    }
}
