import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig()
// const uri = `mongodb+srv://ekoemmanueljavl:${process.env.MONGODB_PASSWORD}@cluster0.n8o8vva.mongodb.net/?retryWrites=true&w=majority`;
mongoose 
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('mongodb connected.')
    const collection = mongoose.connection.collection('transactions');
    // Use deleteMany to remove all documents from the collection
    return collection.deleteMany({});
  })
  .then(result => {
    console.log(`${result.deletedCount} documents deleted from the collection.`);
  })
  .catch((err) => console.log(err.message))

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err) => {
  console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})
