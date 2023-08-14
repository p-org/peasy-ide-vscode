
event eJoinRoom: (client: Client, room: Room);
event eLeaveRoom: (client: Client, room: Room);  
event eSendMessage: (client: Client, room: Room, message: string);
event eBroadcastMessage: (room: Room, message: string);

machine Client {
	
  var name: string;
  var room: Room;
  start state NotInRoom {
    entry {
      name = "Client " + (name); 
    }
    
    on eJoinRoom goto InRoom;
  }
  
  state InRoom {
	  
    on eLeaveRoom goto NotInRoom;
    
    on eSendMessage do (msg: (client: Client, room: Room, message: string)) {
      send room[server], eBroadcastMessage, (room = room, message = format("{0}: {1}", name, message)); 
    }
  }
  
}

machine Room {
	
  var clients: set[Client];
  var server: ChatServer;
  
  start state Active {
	  
    on eJoinRoom do (join: (client: Client, room: Room)) {
      clients += (join.client);
    }
    
    on eLeaveRoom do (leave: (client: Client, room: Room)) {
      clients -= leave.client;
    }
    
    on eBroadcastMessage do (msg: (room: Room, message: string)) {
      foreach (c in clients) {
        send c, eSendMessage, (client = c, room = this, message = msg.message);
      }
    }
  
  }
  
}

machine ChatServer {
	
  var rooms: map[string, Room];
  var room: Room;
  start state Running {
	  
    on eJoinRoom do (join: (client: Client, room: Room)) {
	    
      var room: Room;
      var clients: set[Client];
      if (roomName in rooms) {
        room = rooms[roomName];
      } else {
        room = new Room((clients = clients, server = this));
        rooms[roomName] = room;
      }
      
      send room, eJoinRoom, (client = join.client, room = room);
    }
    
    on eLeaveRoom do (leave: (client: Client, room: Room)) {
	    
      room = rooms[roomName];
      send room, eLeaveRoom, (client = leave.client, room = room);
      
    }
    
  }
  
}