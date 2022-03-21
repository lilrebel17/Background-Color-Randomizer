let HexParameters = [1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
let BackgroundColor = []
let RandomButton = document.querySelector('.randomizer-button')

RandomButton.addEventListener('click', function (){
    for(let i=0; i < 6; i++) {
        HexRandomizer();
    }
    console.log("Your New Color is " + BackgroundColor)
})

function HexRandomizer() {
        let RandNum = Math.floor(Math.random() * HexParameters.length)
        let NewVar = HexParameters[RandNum]
        BackgroundColor.push(NewVar)
        BackgroundColor.join()
        console.log(BackgroundColor)
        // SetBackgroundColor()
}

// function SetBackgroundColor() {
//     let Background = document.body.style.backgroundColor
//     Background = '#' + BackgroundColor
//     RemovePreviousColor();
// }

// function RemovePreviousColor() {
//     if(BackgroundColor.length < 6) {

//     }
// }