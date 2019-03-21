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

    if (ev.target.id == 'lock') {
        ev.preventDefault();
        
        var num_needed_input = document.getElementById('num_needed');
        var hashtag_input = document.getElementById('hashtag');
        num_needed_input.value = parseInt("" + num_needed_input.value);
        
        client.service('box-control').create({
            box_id: 1,
            action: "lock",
            num_needed: parseInt(num_needed_input.value),
            hashtag: hashtag_input.value
        });

        //reload the page
        window.location.reload(false); 
    }


    if (ev.target.id == 'tweet') {
      ev.preventDefault();
      
      var tweet_body_input = document.getElementById('tweet_body');
      if (tweet_body_input.value) {
        var hashtag_input = document.getElementById('hashtag');
        // Create a new message and then clear the input field
        client.service('contract-event').create({
            hashtag: hashtag_input.value,
            message: tweet_body_input.value
        });
      }
    }
});

const setup = async () => {

  // Find the latest 25 messages. They will come with the newest first
  // which is why we have to reverse before adding them
  const statuses = await client.service('box-status').find({
    query: {
      $sort: { createdAt: -1 },
      $limit: 30
    }
  });


  const box_control = await client.service('box-control').find();
  var num_needed_input = document.getElementById('num_needed');
  var hashtag_input = document.getElementById('hashtag');
  num_needed_input.value = box_control.num_needed;
  hashtag_input.value = box_control.hashtag;


  // We want to show the newest message last
  statuses.data.reverse().forEach(addBoxStatus);

  console.log(statuses);
  const contractEvents = await client.service('contract-event').find({
    query: {
      $sort: { createdAt: -1 },
      $limit: 30
    }
  });

  // We want to show the newest message last
  contractEvents.data.reverse().forEach(addContractEvent);

};

// Renders a new message and finds the user that belongs to the message
const addBoxStatus = message => {
    const message_div = document.querySelector('.box_messages');

    const status = message.status;
    const box_id = message.box_id;

    if(message_div) {
        message_div.insertAdjacentHTML( 'afterbegin', 
        `<div class="message flex flex-row">
          <div class="message-wrapper">
            <p class="message-content font-300">
                <span class="sent-date font-300">${moment(message.createdAt).format('MMM Do, hh:mm:ss')}</span>
               <br><b>box_id:</b> ${box_id}
               <br><b>message:</b> ${status}</b></p>
        
          </div>
        </div>`);
    }

    message_div.scrollTop = 0;
    //message_div.scrollTop = message_div.scrollHeight - message_div.clientHeight;
};

const addContractEvent = contractEvent => {
    const message_div = document.querySelector('.event_messages');

    const message = contractEvent.message;
    const hashtag = contractEvent.hashtag;
    const contract_id = contractEvent.contract_id;

    if(message_div) {
        message_div.insertAdjacentHTML( 'afterbegin', 
        `<div class="message flex flex-row">
          <div class="message-wrapper">
            <p class="message-content font-300">
              <span class="sent-date font-300">${moment(message.createdAt).format('MMM Do, hh:mm:ss')}</span>
              <br><b>contract_id:</b> ${contract_id}
              <br><b>hashtag:</b> ${hashtag}
              <br><b>message:</b> ${message}</p>
          </div>
        </div>`);
    }

    message_div.scrollTop = 0;
    //message_div.scrollTop = message_div.scrollHeight - message_div.clientHeight;
};


const addContractStatus = message => {
    const message_div = document.querySelector('#contract_status');

    const status = message.status;

    if(message_div) {
        message_div.insertAdjacentHTML( 'afterbegin', 
        `<p><span>${moment(message.createdAt).format('MMM Do, hh:mm:ss')}</span>
         ${status}
         </p>`);
    }

    message_div.scrollTop = 0;
    //message_div.scrollTop = message_div.scrollHeight - message_div.clientHeight;
};
// Listen to created events and add the new message in real-time
client.service('box-status').on('created', addBoxStatus);
client.service('contract-status').on('created', addContractStatus);
client.service('contract-event').on('created', addContractEvent);

setup();
