import { ObjectSchema } from 'realm';

export const ChecklistSchema: ObjectSchema = {
  name: 'Checklist',
  properties: {
    _id: { type: 'string', indexed: true },
    type: { type: 'string' },
    amount_of_milk_produced: { type: 'int' },
    number_of_cows_head: { type: 'int' },
    had_supervision: { type: 'bool' },
    created_at: { type: 'date' },
    updated_at: { type: 'date', optional: true },
    farmer: { type: 'object', objectType: 'farmer_schema_data' },
    from: { type: 'object', objectType: 'name_farmer_schema_data' },
    to: { type: 'object', objectType: 'name_schema_data' },
    location: { type: 'object', objectType: 'location_schema_data' },
  },
  primaryKey: '_id',
};

export const FarmerSchema: ObjectSchema = {
  name: 'farmer_schema_data',
  properties: {
    name: 'string',
    city: 'string',
  },
};

export const NameSchema: ObjectSchema = {
  name: 'name_schema_data',
  properties: {
    name: 'string',
  },
};

export const NameFarmerSchema: ObjectSchema = {
  name: 'name_farmer_schema_data',
  properties: {
    name: 'string',
  },
};

export const LocationSchema: ObjectSchema = {
  name: 'location_schema_data',
  properties: {
    latitude: 'double',
    longitude: 'double',
  },
};
