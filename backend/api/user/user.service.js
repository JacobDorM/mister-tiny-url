const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  query,
  getById,
  getByEmail,
  // remove,
  // update,
  add,
}

async function query() {
  try {
    const collection = await dbService.getCollection('user')
    var users = await collection.find({}).toArray()
    users = users.map((user) => {
      delete user.password
      return user
    })
    return users
  } catch (err) {
    logger.error('cannot find users', err)
    throw err
  }
}

async function getById(userId) {
  try {
    const collection = await dbService.getCollection('user')
    const user = await collection.findOne({ _id: ObjectId(userId) })
    delete user.password
    return user
  } catch (err) {
    logger.error(`while finding user by id: ${userId}`, err)
    throw err
  }
}
async function getByEmail(email) {
  try {
    const collection = await dbService.getCollection('user')
    const user = await collection.findOne({ email })
    return user
  } catch (err) {
    logger.error(`while finding user by email: ${email}`, err)
    throw err
  }
}

// async function remove(userId) {
//     try {
//         const collection = await dbService.getCollection('user')
//         await collection.deleteOne({ '_id': ObjectId(userId) })
//     } catch (err) {
//         logger.error(`cannot remove user ${userId}`, err)
//         throw err
//     }
// }

// async function update(user) {
//     try {
//         // peek only updatable properties
//         const userToSave = {
//             _id: ObjectId(user._id), // needed for the returnd obj
//             fullname: user.fullname,
//             score: user.score,
//         }
//         const collection = await dbService.getCollection('user')
//         await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
//         return userToSave
//     } catch (err) {
//         logger.error(`cannot update user ${user._id}`, err)
//         throw err
//     }
// }

async function add({ email, password, name, msgs }) {
  try {
    // peek only updatable fields!
    const userToAdd = {
      email,
      password,
      name,
      msgs,
    }
    const collection = await dbService.getCollection('user')
    await collection.insertOne(userToAdd)
    delete userToAdd.password
    return userToAdd
  } catch (err) {
    logger.error('cannot insert user', err)
    throw err
  }
}
