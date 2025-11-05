// const express=require('express');
// const app=express();
// app.use(express.json());
// const { MongoClient, ServerApiVersion } = require('mongodb');

// // Replace with your own MongoDB URI
// const uri = "mongodb+srv://varsha:varshak07@cluster0.raswubq.mongodb.net/?appName=Cluster0";

// // Create MongoClient with options
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// // ✅ Function to add a professor
// async function addProfessor() {
//   const database = client.db("college");
//   const profCollection = database.collection("professors");

//   const result = await profCollection.insertOne({
//     name: "Bob",
//     age: 20,
//     email: "varshak935308@gmail.com",
//     phone: "987654321",
//     salary: 40000,
//     dept: "ISE",
//   });

//   console.log("Professor added successfully with ID:", result.insertedId);
// }

// // ✅ Function to get professor list (with filter example)
// async function professorList() {
//   const database = client.db("college");
//   const profCollection = database.collection("professors");

//   // Example filter: salary > 25000 AND age < 30
//   const data = await profCollection.find({
//     $and: [
//       { salary: { $gt: 25000 } },
//       { age: { $lt: 30 } }
//     ]
//   }).toArray();

//   console.log(" Professor List (filtered):", data);
// }

// // ✅ Function to update a professor
// async function updateProfessor() {
//   const database = client.db("college");
//   const profCollection = database.collection("professors");

//   const result = await profCollection.updateOne(
//     { name: "Bob" },
//     { $set: { age: 45 } }
//   );

//   if (result.modifiedCount > 0) {
//     console.log("Professor updated successfully!");
//   } else {
//     console.log(" No professor found to update.");
//   }
// }

// async function deleteProfessor() {
//     const database=client.db("college");
//     const profCollection=database.collection("professors");
//     await profCollection.deleteOne({name:"varsha"});
// }

// // ✅ Main function — connects and runs all operations
// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected to MongoDB successfully!");

//     // Run any of the operations below:
//     await addProfessor();      // Adds a new professor
//     await professorList();     // Displays professor list
//     await updateProfessor(); 
//     await deleteProfessor();  // Updates professor info

//   } catch (error) {
//     console.error("Connection failed:", error);
//   } finally {
//     await client.close();
//     console.log(" Connection closed.");
//   }
// }

// // Run the main function
// run().catch(console.dir);

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json());

// MongoDB Connection URI
const uri = "mongodb+srv://varsha:varshak07@cluster0.raswubq.mongodb.net/?appName=Cluster0";

// Create MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Database and Collection
const dbName = "college";
const collectionName = "professors";

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}
connectDB();

// ➕ Add a new professor
app.post('/add-professor', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    res.json({ message: "Professor added successfully!", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add professor", details: error.message });
  }
});

// 📋 Get all professors
app.get('/professors', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const filter = req.query.dept ? { dept: req.query.dept } : {};
    const professors = await collection.find(filter).toArray();
    res.json({ total: professors.length, data: professors });
  } catch (error) {
    res.status(500).json({ error: "Failed to get professors", details: error.message });
  }
});

// ✏️ Update professor by name
app.put('/update-professor/:name', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(
      { name: req.params.name },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ message: "Professor not found" });
    } else {
      res.json({ message: "Professor updated successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update professor", details: error.message });
  }
});

// ❌ Delete professor by name
app.delete('/delete-professor/:name', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ name: req.params.name });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Professor not found" });
    } else {
      res.json({ message: "Professor deleted successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete professor", details: error.message });
  }
});

// 🏁 Default route
app.get('/', (req, res) => {
  res.send(" MongoDB Professor API is running...");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
