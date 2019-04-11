 // Initialize Firebase
 var config = {
   //*********************************************** */
  //place firebase api credentials here
  
};
firebase.initializeApp(config);



// Assign the reference to the database to a variable named 'database'
// var database = ...
var database = firebase.database();

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

  console.log("ROOT DATA: ", snapshot.val());
  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
    // highPrice = ...
    highPrice = snapshot.child("highPrice").val();
console.log("set it from firebase");

    // highBidder = ...
    highBidder = snapshot.child('highBidder').val();

    // Change the HTML to reflect the stored values
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);
    // Print the data to the console.
    console.log("Set the high values: ");
    console.log(highBidder, highPrice);

  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the initial values
    $("#highest-price").text(highPrice);
    $("#highest-bidder").val(highBidder);

    // Print the data to the console.
    console.log(bidderName + " bids " + bidderPrice);

  }


// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var bidderName = $("#bidder-name").val();
  var bidderPrice = $("#bidder-price").val();


  // Log the Bidder and Price (Even if not the highest)
  console.log(bidderName, parseInt(bidderPrice));
  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    var bidderObj = {
      highBidder : bidderName,
      highPrice : bidderPrice,
    };
    database.ref().set(bidderObj);

    // Log the new High Price
    console.log("new high bid of " + highBidder + " by " + highPrice);

    // Store the new high price and bidder name as a local variable
    highBidder = bidderName;
    highPrice = bidderPrice;

    // Change the HTML to reflect the new high price and bidder
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);
  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});
