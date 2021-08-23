import { Query, Field } from '@tilework/opus';

export const GET_ALL_CATEGORIES = new Query('categories', true)
    .addFieldList(['name'])

export const GET_PRODUCTS_BY_CATEGORY = category => new Query('category')
    .addArgument('input', 'CategoryInput', { 'title': category })
    .addField(new Field('products', true)
        .addFieldList(['id', 'name', 'inStock', 'gallery', 'category'])
        .addField(new Field('prices', true)
            .addFieldList(['currency', 'amount'])
        )
    )

export const GET_PRODUCT_BY_ID = productId => new Query('product')
    .addArgument('id', 'String!', productId)
    .addFieldList(['id', 'name', 'inStock', 'gallery', 'description', 'category', 'brand'])
    .addField(new Field('attributes', true)
        .addFieldList(['id', 'name', 'type'])
        .addField(new Field('items', true)
            .addFieldList(['displayValue', 'value', 'id'])))
    .addField(new Field('prices', true)
        .addFieldList(['currency', 'amount'])
    )