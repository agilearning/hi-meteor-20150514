
console.log("this is both sides");

if (Meteor.isClient){
  console.log("this is client");

  Template.message.helpers({
    test:"test"
  })

  Template.body.helpers({
    testArray: _.range(0,10),
    testObject:{
      test:"test123"
    },
    testDate: new Date,
    Msgs:[
      {n:1,text:"Hi!Meteor! (m1)"},
      {n:2,text:"Agilearning.IO is awesome! (m2)"},
      {n:3,text:"Agilearning.IO is so nice! (m3)"}
    ]
  })

}

if (Meteor.isServer){
  console.log("this is server");
}