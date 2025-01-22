
import { defineType } from "sanity";

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required()
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            validation: (rule) => rule.required()
        },
      
        {
            name: "productImage",
            type: "image",
            validation: (rule) => rule.required(),
            title: "Product Image"
        },
        {
            name: "price",
            title: "Price",
            type: "number",
            validation: (rule) => rule.required()
        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }]
        },
        {
            name:"dicountPercentage",
            type:"number",
            title:"Discount Percentage",
        },
        {
            name: "isNew",
            title: "New Badge",
            type: "boolean"
        },
   
    ]
});
