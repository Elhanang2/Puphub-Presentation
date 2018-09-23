//sends comments as well as first and last name to model
$("#commentSubmit").on("click", function(event){
    // event.preventDefault();
    console.log('does this work?')
    $.ajax({
       type: "POST",
       url: "/api/comments/",
       data: {
            firstName: $(".fname").val().trim(),
            lastName: $(".lname").val().trim(),
            comment: $(".subject").val().trim()
        },
        dataType: "json"
    }).then(function (data){
        console.log(data);
    }).catch(function(err){
        alert(err);
    })
})

//this button renders the next pet in the app
$("#next").on("click", function(){
   var currentoffset = $("#currentoffset").val();
   var newUrl = "/getpets/" + zipCode + "/" + (currentoffset +1) + "/" + animal + "/" + size + "/" + sex+"/" + age;
   window.location = newUrl;
    })
