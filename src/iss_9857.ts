// Taken from 'Behavior B' of https://github.com/Automattic/mongoose/issues/9857#issue-792808335
import mongoose, { Document, SchemaDefinition, Model } from 'mongoose';

interface User {
    name: string;
    active: boolean;
    points: number;
}

type UserDocument = mongoose.Document<User>;
type UserSchemaDefinition = mongoose.SchemaDefinition<User>;
type UserModel = mongoose.Model<UserDocument>;

const schemaDefinition: UserSchemaDefinition = {
    name: {
        type: String,
    },
    active: {
        type: Boolean,
    },
    points: {
        type: Number,
    },
};

// I've added the third type parameter to mongoose.Schema to be consistent with the updated type API
const schema = new mongoose.Schema<
    UserDocument,
    UserModel,
    UserSchemaDefinition
>(schemaDefinition);
