var db = require("../models");
var fetch = require("node-fetch");
module.exports = function(app) {
  // /getpets/zip/animal... >>>> this way renders html via `res.render`
  // /api/getpets/zip/animal...  >>>> this way sends data back as json
  app.get("(/api)?/getpets/:zipCode/:animal/:size/:sex/:age", function(req, res) {
    
    var offset = req.query.offset || '0';
    var basedOnZip = `http://api.petfinder.com/pet.find?key=4c8bee94df59e3db37d639739e2681c0&location=${req.params.zipCode}&output=full&format=json&offset=${offset}&count=1&sex=${req.params.sex}&animal=${req.params.animal}&size=${req.params.size}&age=${req.params.age}`;
    fetch(basedOnZip)
    .then(function(data) {
      return data.json();
    }).then(function(data){

      if (!data.petfinder.hasOwnProperty('pets')) {
        console.log(data.petfinder);
        throw 'no pets property'
      }

      var rawPet = data.petfinder.pets.pet;
      if (req.url.startsWith('/api')) {
        return res.json(rawPet);
      }

      if (!rawPet.hasOwnProperty('forEach')) {
        
        rawPet = [rawPet];
      }

      var petResult = [];
      rawPet.forEach(petData => {
       
        var pet = {
          photo: petData.media.photos.photo.find(function (p) { return p['@size'] === 'x' })['$t'],
          name: petData.name,
          age: petData.age,
          sex: petData.sex,
          breed: petData.breeds.breed,
          location: petData.contact.address1,
          city: petData.contact.city,
          state: petData.contact.state,
          zip: petData.contact.zip,
          phone: petData.contact.phone,
          email: petData.contact.email,
          description: petData.description
  
        };
        petResult.push(pet);
        
      })

      db.comments.findAll({})
      .then(function(commentsFound) {

        return res.render('searchResults', {
          pets: petResult, 
          currentOffset: offset,
          nextOffset: parseInt(offset) + 1,
          previousOffset: parseInt(offset) - 1,
          zipCode: req.params.zipCode,
          animal: req.params.animal,
          size: req.params.size,
          sex: req.params.sex,
          age: req.params.age,
          comments: commentsFound
        });
      });

    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
      
    })
  });

  app.post("/api/comments/", function(req, res) {
    db.comments.create(req.body).then((newComment) => {
      // Table created
     res.json(newComment);
      });
  });

  // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbExample) {
//       res.json(dbExample);
//     });
  // });
};
