// taken from https://stackoverflow.com/questions/65635637/mongoose-5-11-11-schemadefinition-typing,
// referenced in https://github.com/Automattic/mongoose/pull/9761#issuecomment-757101408
import mongoose, { SchemaDefinition } from 'mongoose';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVerified?: boolean;
}

const UserSchemaDefinition: SchemaDefinition<User> = {
    // For some reason, if the property 'trim' is present in SchemaTypeOptions, the compiler
    // passes the error on to 'trim' with a cryptic error message rather than rejecting the parent property.
    // Might be a TS bug(?)
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        private: true,
        default: 'cats',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
};

const UserSchema = new mongoose.Schema(UserSchemaDefinition);
