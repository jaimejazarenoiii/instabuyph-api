import mongoose, { Document, Schema } from 'mongoose'

// Define an interface representing a Appointment document
interface IClient extends Document {
    name: string
    email?: string
    number?: string
    address?: string
    createdAt: Date
  }

  // Define the schema for an Appointment
  const clientSchema: Schema<IClient> = new Schema({
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
    createdAt: {
      type: Date,
      default: Date.now
    }
  })
  
  // Create a model based on the schema
  const Client = mongoose.model<IClient>('Client', clientSchema)
  
  export default Client