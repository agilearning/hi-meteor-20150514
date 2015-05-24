Message = new Mongo.Collection("message");


if (Meteor.isClient){
  Template.body.helpers({
    Msgs: function(){
      return(Message.find({},{sort:{createdAt:-1}}))
    }
  })

  Template.body.events({
    "change #inputMsg": function(e,t){
      msg = $(e.target).val();
      usr = $("#inputUsr").val();

      if (!usr){
        usr = "Annonymous";
      }

      $("form > input").val("");
      msgData = {
        text:msg,
        user:usr,
        createdAt: new Date,
      };
      Message.insert(msgData);


    }
  })


}

