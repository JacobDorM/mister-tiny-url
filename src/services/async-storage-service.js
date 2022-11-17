import { utilService } from './utilService'

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  postMany,
}

// gets all the items
async function query(entityType) {
  let entities = (await JSON.parse(localStorage.getItem(entityType))) || []
  return entities
}

//get an item by id
async function get(entityType, entityId) {
  const entities = await query(entityType)
  return entities.find((entity) => entity._id === entityId)
}

//create new item
async function post(entityType, newEntity) {
  newEntity._id = utilService.makeId()
  const entities = await query(entityType)
  entities.push(newEntity)
  _save(entityType, entities)
  return newEntity
}

//create new items
async function postMany(entityType, newEntities) {
  const entities = await query(entityType)
  await newEntities.map((entity) => (entity._id = utilService.makeId()))
  entities.push(...newEntities)
  _save(entityType, entities)
  return entities
}

//update an item
async function put(entityType, updatedEntity) {
  const entities = await query(entityType)
  const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
  entities.splice(idx, 1, updatedEntity)
  _save(entityType, entities)
  return updatedEntity
}
//remove an item
async function remove(entityType, entityId) {
  const entities = await query(entityType)
  const idx = entities.findIndex((entity) => entity._id === entityId)
  entities.splice(idx, 1)
  _save(entityType, entities)
}

//save to local storage
function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}
