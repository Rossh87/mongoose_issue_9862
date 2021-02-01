// The below is based on https://github.com/Automattic/mongoose/issues/9862

import {
    Document,
    Schema,
    SchemaDefinition,
    SchemaDefinitionProperty,
    Model,
} from 'mongoose';

interface IProfile {
    // Capital N--Number in this position signifies any type that satisfies the built-in interface Number
    age: Number;
}

interface ProfileDoc extends Document, IProfile {}

interface IUser {
    // Lowercase s--string signifies the JavaScript PRIMITIVE type string.
    email: string;
    profile: ProfileDoc; // <-- changed
}

interface UserDoc extends Document, IUser {}

// Notice that the compiler expects the value of workingProfileSchemaDef.age to be of type SchemaDefinitionProperty<Number>...
const workingProfileSchemaDef: SchemaDefinition<IProfile> = {
    age: Schema.Types.Number,
};

// ...And it seems to work! So we should expect the following to compile:
var someSchemaProp: SchemaDefinitionProperty<Number>;
someSchemaProp = Schema.Types.Number;

// But why do these clearly inappropriate values ALSO compile?
someSchemaProp = () => 42;
someSchemaProp = 'stringyString';
someSchemaProp = Boolean;

// So it seems like SchemaDefinition<T> doesn't give us the type safety we expect, because SchemaDefinitionProperty<T> is overly permissive.
// But the following is arguably worse--obviously *correct* code won't compile because we've lead the compiler to expect
// age.type to be some type that satisfies the interface Number, when that was never actually our intention.
const brokenProfileSchemaDef: SchemaDefinition<IProfile> = {
    age: {
        //Type 'typeof Number' is missing the following properties from type 'Number': toFixed, toExponential, toPrecision
        type: Schema.Types.Number,
    },
};

const ProfileSchema = new Schema<ProfileDoc, Model<ProfileDoc>, ProfileDoc>(
    workingProfileSchemaDef
);

const UserSchemaDef: SchemaDefinition<IUser> = {
    email: String,
    profile: ProfileSchema,
};
