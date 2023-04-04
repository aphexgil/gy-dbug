const db = require('../config/connection');
const { User, Ticket, Project } = require('../models');
const { faker } = require('@faker-js/faker');

const statuses = ['Archived', 'Resolved', 'Testing', 'Development', 'Unassigned', 'New'];
const priorities = ['Urgent','High','Medium','Low'];
const types = ['Front End','API','Back End'];

const randomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

db.on('error', (err) => err);

db.once('open', async () => {
  await User.deleteMany({});
  await Ticket.deleteMany({});
  await Project.deleteMany({});

  const users = [];

  for(var i=0; i<20; i++){
    let user = {
        "username": faker.internet.userName(),
        "email": faker.internet.email(),
        "password": faker.internet.password(10),
        "tickets": []
    }
    
    for(var j=0; j<5; j++){
      let ticket = {
        "ticketTitle": faker.lorem.sentence(2),
        "ticketDescription": faker.lorem.sentence(),
        "ticketAuthor": user.username,
        "ticketStatus": randomElement(statuses),
        "ticketPriority": randomElement(priorities),
        "ticketType": randomElement(types)
      }

      const insertedTicket = await Ticket.collection.insertOne(ticket);

      user.tickets.push(insertedTicket.insertedId);
    }

    users.push(user);
  }

  await User.collection.insertMany(users);
  

  console.log('Database seeded!');
  process.exit(0);
});