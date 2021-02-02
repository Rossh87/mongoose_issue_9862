// Taken from https://github.com/Automattic/mongoose/pull/9761#issuecomment-754106983
import { Model, SchemaDefinition, Schema } from 'mongoose';

interface User {
    readonly email: string;
    readonly password: string;
    readonly someOptionalField?: string;
    readonly anotherProperty?: string;
}

// Type '{ type: StringConstructor; required: true; }' is not assignable to type 'SchemaDefinitionProperty<string>'.
//   Types of property 'type' are incompatible.
//   Type 'StringConstructor' is not assignable to type 'string'.
const userSchemaDefinition: SchemaDefinition<User> = {
    email: { type: String, required: true },
    password: { type: String, required: true },
    someOptionalField: String,

    nonExistingField: String, // 1. This causes an error

    // 2. anotherProperty is defined in the interface but not defined in the schema and triggers an error.
};

/*
 3. `SchemaDefinition` without any params results in `SchemaDefinition<undefined>` which disables these checks
  and is backward compatible
*/

const UserSchema = new Schema(userSchemaDefinition);
