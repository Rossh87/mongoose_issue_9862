// taken from https://github.com/Automattic/mongoose/issues/9863#issuecomment-771019738
import { Document, Schema, SchemaDefinition, Model } from 'mongoose';

interface IProfile {
    age: number;
}

interface ProfileDoc extends Document, IProfile {}

// Check out the type of the VALUE Number below by mousing over it...
// It's NOT type 'number'--its a function of type NumberConstructor
const ProfileSchemaDef: SchemaDefinition<IProfile> = { age: Number };

// So, just as for 9862, the below won't compile
const brokenSchemaDef: SchemaDefinition<IProfile> = {
    age: {
        type: Number,
    },
};

export const ProfileSchema = new Schema<
    ProfileDoc,
    Model<ProfileDoc>,
    ProfileDoc
>(ProfileSchemaDef);
