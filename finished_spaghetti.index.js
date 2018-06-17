function main(){
    //this is storing the value that is entered in the form
    $("#js-shopping-list-form").submit(function(event){
        event.preventDefault();
        const enteredItem = $(".js-shopping-list-entry").val();
        console.log(enteredItem);

    //prompts error message if input empty
    if(enteredItem === ''){
        alert("you can't add nothing to your shopping list, dummy!");
    }
    //next we are going to add the stored value to our list in html form

    $(".shopping-list").append(`
    <li>
        <span class="shopping-item">${enteredItem}</span>
        <div class="shopping-item-controls">
            <button class="shopping-item-toggle">
                <span class="button-label">check</span>
            </button>
            <button class="shopping-item-delete">
                <span class="button-label">delete</span>
            </button>
        </div>
    </li>`);
    });

    //here, since we cant set listeners on dynamic things, we put it on the closest static
    //element and then work our way down to the <li> below it then the shopping item class,
    //and switch its span class to shopping item checked

    $(".shopping-list").on('click', '.shopping-item-toggle', function(event){
        $(this).closest('li').find(".shopping-item").toggleClass("shopping-item__checked");
    })

    //here we do the same thing, since we cant target dynamic elements, we target the
    //static <ul>, find the closest <li> beneath it, and remove everything in that element

    $(".shopping-list").on("click", '.shopping-item-delete', function(event){
        $(this).closest('li').remove();
    })



}

$(main);