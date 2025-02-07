
import { Rule } from '@sanity/types';

interface BaseField {
    name: string;
    title: string;
    type: string;
    validation?: (Rule: Rule) => any;
    options?: {
        list?: { title: string; value: string }[];
        layout?: string;
        initialValue?: string;
    };
}

interface ReferenceField extends BaseField {
    to: { type: string }[];
}

interface ObjectField extends BaseField {
    fields: Field[];
}

interface ArrayField extends BaseField {
    of: (BaseField | ReferenceField | ObjectField)[];
}

type Field = BaseField | ReferenceField | ObjectField | ArrayField;

interface Schema {
    name: string;
    type: string;
    title: string;
    fields: Field[];
}

const order: Schema = {
    name: 'order',
    type: 'document',
    title: 'Order',
    fields: [
        {
            name: 'firstName',
            title: 'First Name',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'companyName',
            title: 'Company Name',
            type: 'string',
            validation: (Rule: Rule) => Rule.optional(),
        },
        {
            name: 'streetAddress',
            title: 'Street Address',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'country',
            title: 'Country',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'city',
            title: 'City',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'province',
            title: 'Province',
            type: 'string',
            validation: (Rule: Rule) => Rule.optional(),
        },
        {
            name: 'zip',
            title: 'ZIP Code',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'email',
            title: 'Email Address',
            type: 'string',
            validation: (Rule: Rule) => Rule.required().email(),
        },
        {
            name: 'additionalInfo',
            title: 'Additional Information',
            type: 'text',
            validation: (Rule: Rule) => Rule.optional(),
        },
        {
            name: 'paymentMethod',
            title: 'Payment Method',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
            options: {
                list: [
                    { title: 'Direct Bank Transfer', value: 'bank' },
                    { title: 'Cash On Delivery', value: 'cash' },
                ],
                layout: 'radio',
            },
        },
        {
            name: 'cartItems',
            title: 'Cart Items',
            type: 'array',
            validation: (Rule: Rule) => Rule.required().min(1),
            of: [
                {
                    type: 'object',
                    name: 'cartItem',
                    title: 'Cart Item',
                    fields: [
                        {
                            name: 'product',
                            title: 'Product',
                            type: 'reference',
                            to: [{ type: 'product' }],
                            validation: (Rule: Rule) => Rule.required(),
                        },
                        {
                            name: 'quantity',
                            title: 'Quantity',
                            type: 'number',
                            validation: (Rule: Rule) => Rule.required().min(1),
                        },
                        {
                            name: 'price',
                            title: 'Price',
                            type: 'number',
                            validation: (Rule: Rule) => Rule.required().min(0),
                        },
                    ],
                },
            ],
        },
        {
            name: 'orderDate',
            title: 'Order Date',
            type: 'datetime',
        },
        {
            name: 'status',
            title: 'Order Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Success', value: 'success' },
                    { title: 'Dispatch', value: 'dispatch' },
                ],
                layout: 'radio', 
            },
        },
    ],
};

export default order;
