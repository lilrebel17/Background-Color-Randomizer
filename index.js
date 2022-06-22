let HexParameters = [1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
let HexArray = ['F','F','F','F','F','F']
let BackgroundColor = '#FFFFFF'

const SaveList = document.querySelector('#saved-colors')
const RandomButton = document.querySelector('#randomizer-button')
const SaveButton = document.querySelector('#save-button')
const ClearButton = document.querySelector('#clear-button')
const DrawerButton = document.querySelector('#drawer-button')

//The key all colors are saved in
const storagekey = 'colors'

//Must create hextext first so the page shows something.
CreateHexText();

window.onload = () => {
    //Checks for the storagekey, & closes the menu if its not found
    if(localStorage.getItem(storagekey) == null) {
        console.log('No local storage found..')
        ListStateChange(0)
        return
    }
    //Just use else here, as your localstorage item is either going to be found. or not found.
    else {
        //retreives the key, parses it to be used as a regular array
        //Opens the menu
        //Loops through the length of the array, and moves all array elements to the hexlist
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
    //Use Math.random() to return a floating number between 0 & 1 
    //Multiply that number by HexParameters.lenght(the global variable on line 1)
    //Wrap it in Math.floor so it rounds to the largest inerger. and it wont be a float anymore.
    let RandNum = Math.floor(Math.random() * HexParameters.length)
    //Take the random number we got above, and using it to tell the program what element of 
    //HexParameters it needs to grab.
    //We then update HexArray(A global )
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
