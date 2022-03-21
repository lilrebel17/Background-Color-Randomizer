let HexParameters = [1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
let BackgroundColor = []
let RandomButton = document.querySelector('.randomizer-button')

RandomButton.addEventListener('click', function (){
    for(let i=0; i < 6; i++) {
        HexRandomizer();
    }
    console.log(BackgroundColor)
})

function HexRandomizer() {
        let RandNum = Math.floor(Math.random() * HexParameters.length)
        let NewVar = HexParameters[RandNum]
        BackgroundColor.push(NewVar)
        SetBackgroundColor()
}

function SetBackgroundColor() {
    let NewColor = BackgroundColor.join()
    console.log(NewColor)
    let Background = document.body.style.backgroundColor
    Background = '#' + BackgroundColor 
}