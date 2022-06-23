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
    //Starts at however many elements the list has
    //if its above 0 it increments down
    for(let i=SaveList.childElementCount; i > 0; i--) {
        //Set a variable for whatever node the program is currently on
        let color = SaveList.childNodes[i]
        //Then we just remove the child, and use the variable above
        SaveList.removeChild(color)
        //Clear local storage
        localStorage.clear()
    }
    //Finally change the list to closed.
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
    let NewVar = HexParameters[RandNum]
    //We then update HexArray(A global variable on line 2) with the element from HexArray
    HexArray.push(NewVar)
    RemovePreviousColor();
}

function RemovePreviousColor() {
    //Makes sure HexArray has more than 6 elements.
    if(HexArray.length > 6) {
        //If it does, we start at 0, which is the earliest stored element
        //And splice it all the way to 6, which will be the end of any hex color
        HexArray.splice(0,6)
    }
}

function ChangeBackgroundColor() {
    //Takes Background color which is a global variable,
    //Sets it as # + HexArray
    BackgroundColor = '#' + HexArray.join('');
    //Make it Uppercase for ease of use & it looks better on page
    BackgroundColor = BackgroundColor.toUpperCase()
    //Finally sets the color to BackgroundColor
    document.body.style.backgroundColor = BackgroundColor
    console.log(BackgroundColor)
    //We then create the hextext.
    CreateHexText();
}

function CreateHexText() {
    let HexText = document.querySelector('.hex')
    HexText.innerHTML = BackgroundColor
}


function MoveHexToList(loadedcolor) {
    let SaveList = document.querySelector('#saved-colors')
    let color = BackgroundColor 

    //This creates a p and a div element to be shown on the list
    const newDiv = document.createElement('div')
    const newP = document.createElement('p')

    //Checks if we passed a variable
    //If we did it uses that variable instead of the current
    //Background color.
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

    //After we decide what the background color & text is suppose to be
    //We append the p block we created and updated to the div
    newDiv.append(newP)
    //We add the color class just to make the HTML look nicer.
    //And to set the padding we use for it in CSS.
    newDiv.classList.add('color')

    //We then set the margin & font size of the p element.
    newP.style.margin = '0px'
    newP.style.fontSize = '4vw'

    //Finally we append the div to the save list to the right side.
    SaveList.append(newDiv)
}


//Send 0 as variable to close 
//Send 1 as variable to open
function ListStateChange(state) {
    /* 
                Simple state changer

    If you pass 0, the save list goes from open to closed state
    If you pass 1, the save list goes from closed to open state

    Adds & Removes the open or close class dependent on variable
    Shows overflow with scroll bar or hides overflow dependent on variable
    Sets width of the save list to hide it in closed state

    */
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
    //Checks for our storage key
    if(localStorage.getItem(storagekey) == null) {
        //Creates it with an array if its not there
        let array = []
        //pushes current color to it as its first element
        array.push(color)
        //We stringify the array so we can store it in 1 key as a JSON item
        localStorage.setItem(storagekey, JSON.stringify(array))
    }
    else {
        //If we find it, we parse the storage item
        let array = JSON.parse(localStorage.getItem(storagekey))
        //Push the color we pass to it the function into the array
        array.push(color)
        //Finally set the item, and re-stringify it so we can parse it for later use.
        localStorage.setItem(storagekey,JSON.stringify(array))
    }
}
