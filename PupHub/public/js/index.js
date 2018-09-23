$("#searchpets").on("click", function() {
  var zipCode = $("#zipcode").val();
  var animal = $("#animal").val();
  var size = $("#size").val();
  var sex = $("#sex").val();
  var age = $("#age").val();
  var url = "/getpets/" + zipCode + "/" + animal + "/" + size + "/" + sex+"/" + age;
  window.location = url;
});

