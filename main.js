console.log("this is both sides");
Message = new Mongo.Collection("message");

sampleMesssages = [
  {text:"Hi!Meteor! (m1)"},
  {text:"Agilearning.IO is awesome! (m2)"},
  {text:"Agilearning.IO is so nice! (m3)"}
]



if (Meteor.isClient){
  console.log("this is client");


  Template.body.helpers({
    Msgs: sampleMesssages
    // Msgs:[
    //   {n:1,text:"Hi!Meteor! (m1)"},
    //   {n:2,text:"Agilearning.IO is awesome! (m2)"},
    //   {n:3,text:"Agilearning.IO is so nice! (m3)"}
    // ]
  })

}

if (Meteor.isServer){
  console.log("this is server");
}