'use strict'


//here we are storing our data in an array of objects, this way we can manipulate it easily
//and not have to store our data in the DOM
const STORE = [
    {name: "sample", checked: false},
  ];

//here we are created an html element that formats our data from STORE into a
//nice looking item in the DOM with buttons etc. also we are assigning an 
//index to the item 
function generateItemElement(item, itemIndex, template){
    return `
        <li class="js-item-index-element" data-item-index="${itemIndex}">
            <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}"><span contenteditable="true">${item.name}</span></span>
            <div class="shopping-item-controls">
                <button class="shopping-item-toggle js-item-toggle">
                    <span class="button-label">check</span>
                </button>
                <button class="shopping-item-delete js-item-delete">
                    <span class="button-label">delete</span>
                </button>
            </div>
        </li>`;
}
//the input is STORE i think, we have a quick log
//then we are mapping an array of html elements using
//the info from STORE then joining them into a string
function generateShoppingListItemsString(shoppingList){
    console.log("generating shopping list element");

    const items = shoppingList.map((item, index) =>
    generateItemElement(item, index));
    return items.join('');
}

//we are taking the string of html code from above and then
//inserting the html code into the dom under the ul
//if the view button toggle is false, it will render all of
//STORE, but if the toggle is true, will only render the objs
//with a false unchecked value.
function renderShoppingList() {
    console.log('`renderShoppingList` ran');
    if(viewButtonToggle === true && displaySearchResults === false){
        const shoppingListItemString = generateShoppingListItemsString(STORE.filter(item => {
            return item.checked === false;
        }));
        $('.js-shopping-list').html(shoppingListItemString);
    }
    else if(viewButtonToggle === false && displaySearchResults === false){
        const shoppingListItemString = generateShoppingListItemsString(STORE);
        $('.js-shopping-list').html(shoppingListItemString);
    }
    else if(viewButtonToggle === false && displaySearchResults === true){
        const shoppingListItemString = generateShoppingListItemsString(searchResults);
        $('.js-shopping-list').html(shoppingListItemString);
        displaySearchResults != displaySearchResults;
    }
    else if(viewButtonToggle === true && displaySearchResults === true){
        const shoppingListItemString = generateShoppingListItemsString(searchResults.filter(item => {
            return item.checked === false;
        }));
        $('.js-shopping-list').html(shoppingListItemString);
        displaySearchResults != displaySearchResults;
    }
}

//here we are taking the name of a submitted item and pushing
//that as an object into our array of objects STORE
function addItemtoData(itemName){
    STORE.push({name: itemName, checked: false});
    console.log(`adding "${itemName}" to shopping list`);
}

//we are listening for the submit, when it happends we stop
//the button from submitting it, if box empty will prompt an error
//message, then we set the value of the 
//input entry to a const, then resetting the value of the input 
//to nothing-clearing the input box
//we then feed that value into the function above to push it to 
//STORE, then we render our updated item list
function newItemSubmit() {
    $(".add-item").on('click', function(event){
        event.preventDefault();
        console.log('`newItemSubmit` ran');
        if($(".js-shopping-list-entry").val() === ''){
            alert("must enter shopping item");
        }
        else{
            const enteredItem = $(".js-shopping-list-entry").val();
            console.log(enteredItem);
            $('.js-shopping-list-entry').val('');
            addItemtoData(enteredItem);
            console.log(STORE);
            renderShoppingList();
        }
    });
}

//given an item index, we are changing the the key checked
//to unchecked, or unchecked to check by using ! boolean style
function toggleCheckedListItem(itemIndex){
    STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

//given an item, we are finding its index, which is a string,
//then parsing that string in base 10 to get an integer value
function getItemIndex(item){
    const itemIndexStr = $(item).closest('.js-item-index-element').attr('data-item-index');
    return parseInt(itemIndexStr, 10);
}

//we are listening for when the check button is being clicked,
//then we are getting its index using the function above,
//we are then toggling is checked value in STORE, using the 
//func 2 up, that toggles the value, and then we render the
//shopping list again with the updated store
function itemCheckClicked() {
    $(".shopping-list").on('click', '.shopping-item-toggle', function(event){
        const itemIndex = getItemIndex(event.currentTarget);
        toggleCheckedListItem(itemIndex);
        renderShoppingList();
    })
    console.log('`itemCheckCLicked` ran');
}

//we first listen for when the delete button is pressed,
//we then get the item index of the item that has been clicked
//and delete that object from the array STORE, and render the
//shopping list again which no longer has that item
function deleteItemClicked() {
    $(".shopping-list").on('click', '.shopping-item-delete', function(event){
        const itemIndex = getItemIndex(event.currentTarget);
        delete STORE[itemIndex];
        renderShoppingList();
        console.log('`deleteItemClicked` ran');
    });
}

let viewButtonToggle = false;

//when the view button is clicked, we stop the default action,
//then create a const that is the filtered array that contains
//only values tha are unchecked and runs the rendered list with 
//the filtered array
function displayUnchecked(){
    $('.view-button').on('click', function(event){
        event.preventDefault();
        viewButtonToggle = !viewButtonToggle;
        const uncheckedItems = STORE.filter(item => {
            return item.checked === false;
        })
        console.log(uncheckedItems);
        renderShoppingList();
    })
}

let displaySearchResults = false;

function handleSearch(){
    $(".search").on('click', function(event){
        event.preventDefault();
        if($(".js-shopping-list-entry").val() === ''){
            alert("must enter shopping item");
        }
        else{
            displaySearchResults =!displaySearchResults;
            const searchItem = $(".js-shopping-list-entry").val();
            console.log(searchItem);
            $('.js-shopping-list-entry').val('');
            const searchResults = STORE.filter(item => {
            return item.name === searchItem;
        });
        console.log(searchResults);
        console.log(displaySearchResults);
        }        
    })
}


//this is the final callback function that renders the page
//and then handles add, delete and checking items
function shoppingListMain() {
    renderShoppingList();
    newItemSubmit();
    itemCheckClicked();
    deleteItemClicked();
    displayUnchecked();
    handleSearch();
    console.log(STORE);
}

$(shoppingListMain);