Message = new Mongo.Collection("message");


if (Meteor.isClient){
  Meteor.startup(function(){
    Meteor.subscribe("pubMsgs",20);
  });

  Template.guestbook.helpers({
    Msgs: function(){
      return(Message.find({},{sort:{createdAt:-1}}))
    }
  })

  Template.guestbook.events({
    "change #inputMsg": function(e,t){
      msg = $(e.target).val();

      $("input").val("");
      msgData = {
        text:msg,
      };

      Meteor.call("createMessage",msgData)

    }
  })


}


if (Meteor.isServer){
  Meteor.publish("pubMsgs",function(limitN){
    return(Message.find({},{sort:{createdAt:-1},limit:limitN}))
  })

  Meteor.methods({
    createMessage: function(msgData){
      usr = Meteor.userId()
      if (usr){
        msgData.userId = usr;
        msgData.user = Meteor.user().profile.name;
        msgData.createdAt = new Date;
        Message.insert(msgData);

      }
    }
  })
}

