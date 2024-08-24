import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

interface IOwner extends Document {
    name: string
    username: string
    password: string
    comparePassword(candidatePassword: string): Promise<boolean>
    email?: string
    number?: string
    address?: string
    createdAt: Date
}

// Define the schema for an Appointment
const ownerSchema: Schema<IOwner> = new Schema({
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

// Hash the password before saving
ownerSchema.pre<IOwner>('save', async function (next) {
    if (!this.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        if (error instanceof Error) {
            next(error as mongoose.CallbackError)
        } else {
            next(new Error('An unknown error occurred'))
        }
    }
})

// Method to compare passwords
ownerSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Create a model based on the schema
const Owner = mongoose.model<IOwner>('Owner', ownerSchema)

export default Owner