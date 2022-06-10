let HexParameters = [1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
let HexArray = ['F','F','F','F','F','F']
let SaveArray = []
let BackgroundColor = '#FFFFFF'

const SaveList = document.querySelector('#saved-colors')
const RandomButton = document.querySelector('#randomizer-button')
const SaveButton = document.querySelector('#save-button')
const ClearButton = document.querySelector('#clear-button')
const DrawerButton = document.querySelector('#drawer-button')

CreateHexText();

RandomButton.addEventListener('click', function (){
    for(let i=0; i < 6; i++) {
        CreateHexArray();
    }
    console.log("Your New Color is " + HexArray)
    ChangeBackgroundColor();
})

SaveButton.addEventListener('click', () => {
    SaveHex()
})

ClearButton.addEventListener('click', () => {
    console.log(SaveList.childNodes.length)
    for(let i=0; i > SaveList.childNodes.length - 1; i++) {
        let Child = SaveList.childNodes[i]
        console.log('I Deleted ' + Child)
        SaveList.removeChild(Child)
    }
})

DrawerButton.addEventListener('click', () => {
    if(SaveList.classList.contains('open')) {
        console.log("Open")
        SaveList.classList.add('closed')
        SaveList.classList.remove('open')
    }
    else if(SaveList.classList.contains('closed')) {
        console.log("Closed")
        SaveList.classList.add('open')
        SaveList.classList.remove('closed')
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


function SaveHex() {
    let SaveList = document.querySelector('#saved-colors')
    let color = BackgroundColor 

    const newDiv = document.createElement('div')
    const newP = document.createElement('p')

    newDiv.append(newP)
    newDiv.classList.add('color')
    newDiv.style.backgroundColor = color;
    newDiv.style.paddingTop = '15%';
    newDiv.style.paddingBottom = '15%';

    newP.style.margin = '0px'
    newP.innerHTML = BackgroundColor;
    newP.style.fontSize = '4vw'
    newP.backgroundColor = color;

    SaveList.append(newDiv)
}