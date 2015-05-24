Message = new Mongo.Collection("message");


if (Meteor.isClient){
  Template.guestbook.helpers({
    Msgs: function(){
      return(Message.find({},{sort:{createdAt:-1}}))
    }
  })

  Template.guestbook.events({
    "change #inputMsg": function(e,t){
      msg = $(e.target).val();
      // usr = $("#inputUsr").val();

      // if (!usr){
      //   usr = "Annonymous";
      // }


      $("input").val("");
      msgData = {
        text:msg,
        createdAt: new Date,
      };

      usr = Meteor.userId()
      if (usr){
        msgData.userId = usr;
        msgData.user = Meteor.user().profile.name;
        Message.insert(msgData);

      }

      // Message.insert(msgData);


    }
  })


}

