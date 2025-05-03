/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1868868837")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1868868837",
    "hidden": false,
    "id": "relation284052718",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "parentId",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1868868837")

  // remove field
  collection.fields.removeById("relation284052718")

  return app.save(collection)
})
