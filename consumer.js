const amqp = require("amqplib/callback_api");

// Create connection
amqp.connect(`amqp://localhost`, (err, connection) => {
  if (err) {
    throw err;
  }
  // Create channel
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }

    // Assert Queue
    let queueName = "technical";
    channel.assertQueue(queueName, {
      durable: false,
    });
    channel.consume(queueName, (msg) => {
      console.log(`Message received: ${msg.content.toString()}`);
      channel.ack(msg);
    });
  });
});
