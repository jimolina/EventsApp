db = db.getSiblingDB('events_db');

db.createCollection('events_entries');

db.events_entries.createIndex({ lat: 1 });
db.events_entries.createIndex({ lng: 1 });

db.events_entries.insertOne({
  id: 1,
  title: "First Event",
  description: "This is the first event in the database.",
  lat: 40.7128,
  lng: -74.0060,
  created_at: new Date(),
  updated_at: new Date()
});
