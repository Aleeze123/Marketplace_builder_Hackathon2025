interface Field {
    name: string;
    title: string;
    type: string;
    validation?: (Rule: any) => any;
    options?: {
        list?: { title: string; value: string }[]; 
        layout?: string;
        initialValue?: string;
    };
    of?: { type: string; to: { type: string } }[];
}

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
            validation: Rule => Rule.required(),
        },
        {
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'companyName',
            title: 'Company Name',
            type: 'string',
            validation: Rule => Rule.optional(),
        },
        {
            name: 'streetAddress',
            title: 'Street Address',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'country',
            title: 'Country',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'city',
            title: 'City',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'province',
            title: 'Province',
            type: 'string',
            validation: Rule => Rule.optional(),
        },
        {
            name: 'zip',
            title: 'ZIP Code',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'email',
            title: 'Email Address',
            type: 'string',
            validation: Rule => Rule.required().email(),
        },
        {
            name: 'additionalInfo',
            title: 'Additional Information',
            type: 'text',
            validation: Rule => Rule.optional(),
        },
        {
            name: 'paymentMethod',
            title: 'Payment Method',
            type: 'string',
            validation: Rule => Rule.required(),
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
            of: [{ type: 'reference', to: { type: 'product' } }],
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
