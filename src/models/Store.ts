import mongoose, { Document, Schema } from 'mongoose'

// Define an interface representing a Appointment document
interface IStore extends Document {
    name: string
    email?: string
    number?: string
    address?: string
    owner: mongoose.Types.ObjectId,
    createdAt: Date
  }
  
  // Define the schema for an Appointment
  const storeSchema: Schema<IStore> = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: false,
      unique: true
    },
    number: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Owner',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  })
  
  // Create a model based on the schema
  const Store = mongoose.model<IStore>('Store', storeSchema)
  
  export default Store