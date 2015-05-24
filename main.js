// Router.route('/', function () {
//   this.render('home');
// });

// Router.route('/hello', function () {
//   this.render('guestbook');
// });



Router.map(function(){
  this.route("index",{
    path:'/',
    template: "home"
  });

  this.route("hello",{
    path:'/hello',
    template: "guestbook"
  });

  this.route("chatroom",{
    path:'/chatroom/:cid',
    template: "chatroomPage",
    data:function(){

      res = {
        chatroomData:function(){
          // return(this.params.cid)
          return(Chatroom.findOne({_id:this.params.cid}))
        }.bind(this)
      }
      return(res)
    }


  });



})



Message = new Mongo.Collection("message");
Chatroom = new Mongo.Collection("chatroom");


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

  Template.home.helpers({
    Chatrooms: function(){
      return(Chatroom.find({},{sort:{createdAt:-1}}))
    }
  })


  Template.home.events({
    "change #createChatroom": function(e,t){
      chaatroomName = $(e.target).val();

      $("input").val("");
      chatroomData = {
        name:chaatroomName,
      };

      Meteor.call("createChatroom",chatroomData)

    }
  })


}


if (Meteor.isServer){
  Meteor.publish("pubMsgs",function(limitN){
    // console.log(Meteor.userId()); // NOT WORK
    // console.log(this.userId);
    return(Message.find({},{sort:{createdAt:-1},limit:limitN}))
  })

  Meteor.publish(null,function(){
    // console.log(Meteor.userId()); // NOT WORK
    // console.log(this.userId);
    return(Chatroom.find({}))
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
    },

    createChatroom: function(chatroomData){
      usr = Meteor.userId()
      if (usr){
        chatroomData.userId = usr;
        chatroomData.user = Meteor.user().profile.name;
        chatroomData.createdAt = new Date;
        Chatroom.insert(chatroomData);

      }
    },
  })
}

