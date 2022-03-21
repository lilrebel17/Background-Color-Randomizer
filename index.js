let HexParameters = [1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
let HexArray = []
let BackgroundColor = '#FFFFFF'
let RandomButton = document.querySelector('.randomizer-button')

CreateHexText();

RandomButton.addEventListener('click', function (){
    for(let i=0; i < 6; i++) {
        CreateHexArray();
    }
    console.log("Your New Color is " + HexArray)
    ChangeBackgroundColor();
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