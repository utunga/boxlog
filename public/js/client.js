/* global io */

// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();

client.configure(feathers.socketio(socket));

// Use localStorage to store our login token
client.configure(feathers.authentication({
  storage: window.localStorage
}));

document.addEventListener('click', async ev => {
    if (ev.target.id == 'open') {
        ev.preventDefault();
        // Create a new message and then clear the input field
        await client.service('boxstatus').create({
          status: "opened"
        });
    }
    if (ev.target.id == 'close') {
        ev.preventDefault();
        // Create a new message and then clear the input field
        await client.service('boxstatus').create({
          status: "closed"
        });
    }
});

const setup = async () => {

  // Find the latest 25 messages. They will come with the newest first
  // which is why we have to reverse before adding them
  const statuses = await client.service('boxstatus').find({
    query: {
      $sort: { createdAt: -1 },
      $limit: 30
    }
  });

  // We want to show the newest message last
  statuses.data.forEach(addMessage);

};

// Renders a new message and finds the user that belongs to the message
const addMessage = message => {
    const message_div = document.querySelector('.status_messages');

    const status = message.status;

    if(message_div) {
        message_div.insertAdjacentHTML( 'afterbegin', 
        `<div class="message flex flex-row">
          <div class="message-wrapper">
            <p class="message-content font-300">
                <span class="sent-date font-300">${moment(message.createdAt).format('MMM Do, hh:mm:ss')}</span>
              <br><b> ${status}</b></p>
        
          </div>
        </div>`);
    }

    message_div.scrollTop = 0;
    //message_div.scrollTop = message_div.scrollHeight - message_div.clientHeight;
};

// Listen to created events and add the new message in real-time
client.service('boxstatus').on('created', addMessage);
setup();
