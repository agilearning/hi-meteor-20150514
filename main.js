
console.log("this is both sides");

if (Meteor.isClient){
  console.log("this is client");

  Template.message.helpers({
    test:"test"
  })

  Template.body.helpers({
    testArray: _.range(0,10),
    Msgs:[
      "Hi!Meteor! (m1)",
      "Agilearning.IO is awesome! (m2)",
      "Agilearning.IO is so nice! (m3)"
    ]
  })

}

if (Meteor.isServer){
  console.log("this is server");
}