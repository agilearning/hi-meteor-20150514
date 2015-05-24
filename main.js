console.log("this is both sides");
Message = new Mongo.Collection("message");

sampleMesssages = [
  {text:"Hi!Meteor! (m1)", from:"db"},
  {text:"Agilearning.IO is awesome! (m2)", from:"db"},
  {text:"Agilearning.IO is so nice! (m3)", from:"db"}
]



if (Meteor.isClient){
  console.log("this is client");


  Template.body.helpers({
    Msgs: function(){
      return(Message.find())
    }
    // Msgs: sampleMesssages
    // Msgs:[
    //   {n:1,text:"Hi!Meteor! (m1)"},
    //   {n:2,text:"Agilearning.IO is awesome! (m2)"},
    //   {n:3,text:"Agilearning.IO is so nice! (m3)"}
    // ]
  })

  Template.body.events({
    "change #inputMsg": function(e,t){

      console.log("change #inputMsg");
      console.log($(e.target).val());
      msg = $(e.target).val();
      $(e.target).val("");
      msgData = {
        text:msg,
        createdAt: new Date,
      };
      console.log(msgData);
      Message.insert(msgData);


    }
  })


}

if (Meteor.isServer){
  console.log("this is server");
  if (Message.find().count() === 0){
    for (i in sampleMesssages){
      Message.insert(sampleMesssages[i]);
    }
  }

}