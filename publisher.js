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
    let message = "This is Aditya Raj";
    channel.assertQueue(queueName, {
      durable: false,
    });
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Message: ${message}`);
    setTimeout(() => {
      connection.close();
    }, 1000);
  });
});
