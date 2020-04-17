/* global Product, Cart */

'use strict';


// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //DONE: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) { // lazy dev way of saying for(var i = 0; i < Product.allProducts.length; i++)
    // we would add an option for each product
    // render to a page : target () content (option element, text of the product), append it
    var optionEl = document.createElement('option');
    optionEl.textContent = Product.allProducts[i].name;
    selectElement.appendChild(optionEl);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // DONE: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // DONE: suss out the item picked from the select list
  // I am in another function, I don't have access to `event`
  var itemPicked = document.getElementById('items').value;

  // DONE: get the quantity
  var quantity = document.getElementById('quantity').value; //value is a property of html tags that can have values
  console.log(quantity);

  // TODO: using those, add one item to the Cart (`cart`)
  // Cart.prototype.addItem
  cart.addItem(itemPicked, quantity);
}

// Done: Update the cart count in the header nav with the number of items in the Cart

function updateCounter() {
  var getTarget = document.getElementById('itemCount');
  getTarget.textContent = (' total item quantity: ' + cart.items[0].quantity);
  //We need to retrieve the input data stored in an array cart.items
  // getTarget.push(cart.items[0].quantity);
  console.log(updateCounter);
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  var getOrder = document.getElementById('cartContents');
  var newUlEl = document.createElement('ul');

//TODO: our own :)  need to delete old items from page before putting new ones on
  for (var i = 0; i < cart.items.length; i++) {
    var newLiItem = document.createElement('li');
    newLiItem.textContent = ('You have ordered: ' + cart.items[i].product + ', in the quantity of: ' + cart.items[i].quantity);
    newUlEl.appendChild(newLiItem);
    getOrder.appendChild(newUlEl);
  }

  //done: get the item and quantity from the form
  // Done: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
