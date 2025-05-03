/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1571142587")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id = userId",
    "listRule": "@request.auth.id = userId",
    "updateRule": "@request.auth.id = userId",
    "viewRule": "@request.auth.id = userId"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1571142587")

  // update collection data
  unmarshal({
    "deleteRule": "",
    "listRule": "",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
