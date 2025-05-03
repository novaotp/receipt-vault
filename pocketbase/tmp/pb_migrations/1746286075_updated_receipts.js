/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1571142587")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file1542800728",
    "maxSelect": 1,
    "maxSize": 100000000,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "image/webp"
    ],
    "name": "image",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [
      "40x40"
    ],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1571142587")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file1542800728",
    "maxSelect": 1,
    "maxSize": 100000000,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "image/webp"
    ],
    "name": "image",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
