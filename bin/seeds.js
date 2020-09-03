require('../configs/db.config');

const User = require('../models/user.model')
const Event = require('../models/event.model')
const faker = require('faker')
const mongoose = require('mongoose');

const userIds = []

Promise.all([
    User.deleteMany({}),
    Event.deleteMany({})
  ])
  .then(() => {
    console.log('empty database');

    for (let i = 0; i < 50; i++) {
        const user = new User({
          name: faker.name.findName(),
          avatar: faker.image.avatar(),
          number: faker.phone.phoneNumber('6########'),
          createdAt: faker.date.past(),
        });

        user.save()
            .then(user => {
                userIds.push(user._id);
                //console.log(userIds);

                for(let j = 0; j < 10; j++) {
                    const event = new Event({
                      user: user._id,
                      date: faker.date.between(faker.date.past(), faker.date.future()),
                      duration: numberDurationRandom (5),
                      title: faker.name.title(),
                      asisstants: assistantsRandom(userIds),
                      description: faker.lorem.paragraph(),
                      createdAt: faker.date.past(),
                    });

                    event.location.coordinates = [faker.address.latitude(), faker.address.longitude()]

                    event.save()
                        .then(event => {
                            console.log("event created");
                        })
                        .catch(e => console.log('event error', e))

                }
            })
            .catch(e => console.log('user error', e))
    }
  })

const numberDurationRandom = (number = 5) => {
    return Math.floor(Math.random()* (number - 1) + 1)
}

const assistantsRandom = (users) => {
    const assistantsIds = []
    for (let i = 0; i < numberDurationRandom(users.length); i++) {
        assistantsIds.push(users[i])
    }
    return assistantsIds
}