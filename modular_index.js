'use strict'

const STORE = [
    {name: "sample", checked: false},
  ];

function generateItemElement(item, itemIndex, template){
    return `
        <li class="js-item-index-element" data-item-index="${itemIndex}">
            <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
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

function generateShoppingListItemsString(shoppingList){
    console.log("generating shopping list element");

    const items = shoppingList.map((item, index) =>
    generateItemElement(item, index));
    return items.join('');
}

function renderShoppingList() {
//this function will render the shopping list in the DOM
    console.log('`renderShoppingList` ran');
    const shoppingListItemString = generateShoppingListItemsString(STORE);

    $('.js-shopping-list').html(shoppingListItemString);
}

function addItemtoData(itemName){
    STORE.push({name: itemName, checked: false});
    console.log(`adding "${itemName}" to shopping list`);
}

function newItemSubmit() {
//this func will handle when users add a new item to shopping list
    $("#js-shopping-list-form").submit(function(event){
        event.preventDefault();
        console.log('`newItemSubmit` ran');
        const enteredItem = $(".js-shopping-list-entry").val();
        console.log(enteredItem);
        $('.js-shopping-list-entry').val('');
        addItemtoData(enteredItem);
        console.log(STORE);
        renderShoppingList();
    });
}

function toggleCheckedListItem(itemIndex){
    STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

function getItemIndex(item){
    const itemIndexStr = $(item).closest('.js-item-index-element').attr('data-item-index');
    return parseInt(itemIndexStr, 10);
}

function itemCheckClicked() {
//this will handle when a user clicks the check button
    $(".shopping-list").on('click', '.shopping-item-toggle', function(event){
        const itemIndex = getItemIndex(event.currentTarget);
        toggleCheckedListItem(itemIndex);
        renderShoppingList();
    })
    console.log('`itemCheckCLicked` ran');
}

function deleteItemClicked() {
//this will handle when a user wants to delete an item from list
    $(".shopping-list").on('click', '.shopping-item-delete', function(event){
        const itemIndex = getItemIndex(event.currentTarget);
        delete STORE[itemIndex];
        renderShoppingList();
        console.log('`deleteItemClicked` ran');
    });
}


//this is the final callback function that renders the page
//and then handles add, delete and checking items
function shoppingListMain() {
    renderShoppingList();
    newItemSubmit();
    itemCheckClicked();
    deleteItemClicked();
    console.log(STORE);
}

$(shoppingListMain);