/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1571142587")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file1542800728",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "image/webp"
    ],
    "name": "photo",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1571142587")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file1542800728",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "image/webp"
    ],
    "name": "field",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
