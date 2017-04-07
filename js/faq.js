// Script to show the first dd element  
$("dd").filter(":nth-child(n+12)").addClass("hide");

// On "mouseenter" slide down current dd, slideup all other dd "siblings" 
$("dl").on("mouseenter", "dt", function(){
  $(this).next().slideDown(200).siblings("dd").slideUp(200);
});