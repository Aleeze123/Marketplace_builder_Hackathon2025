import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import order from "./order"
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, order],
}
