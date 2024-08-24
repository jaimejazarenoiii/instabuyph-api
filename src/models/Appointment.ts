import mongoose, { Document, Schema } from 'mongoose'

// Define an interface representing a Appointment document
interface IAppointment extends Document {
  name: string
  email: string
  store: mongoose.Types.ObjectId
  client: mongoose.Types.ObjectId
  createdAt: Date
}

// Define the schema for an Appointment
const appointmentSchema: Schema<IAppointment> = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true 
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Create a model based on the schema
const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema)

export default Appointment