# Color Pallet Picker

## Overview

It assumes the order of operations below as standard use.

Explanation on how the clear functionality works is provided below.

Standard use is:

1. New User loads the page.
2. Clicks random until they find a color they like.
3. Hits save.

### Order of Operations

    1.
        [line: 25] CreateHexText
            We run this function first to update the background color & text with #fffff
    2. 
        [line: 35] window.onload
            This checks to make sure our local storage key is created.
            Also changes the state of the hex list to the left to make sure
            its in the appropiate state.
            Finally we run MoveHexToList() to update the list with what 
            the program found in local storage.
    3.
        [line: 60] RandomButton.addEventLisener
            Listens for a click, if we get one we then run
            CreateHexArray() 6 times to get a new hex code
            Finally we change the background color with ChangeBackgroundColor()
    4. 
        [line: 72] SaveButton.addEventListener
            Listens for a click.
            Uses MoveHexToList() to move the current Hex to the side list
            Then Saves the color with SaveColorToLocalStorage()
            Finally changes the state of the list to open with ListStateChange(1)

## Functionality Breakdown

## Clearing the list

    List clears within the Event Listener for the 'Clear list' button

``` JavaScript
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
```

## Saving Colors

    All saves go through SaveColorToLocalStorage()

``` JavaScript
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
```
