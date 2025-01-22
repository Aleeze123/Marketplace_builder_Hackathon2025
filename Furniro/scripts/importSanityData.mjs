import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31',
});
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${imageUrl}`);
    }
    const buffer = await response.arrayBuffer();
    const bufferImage = Buffer.from(buffer);
    const asset = await client.assets.upload('image', bufferImage, {
      filename: imageUrl.split('/').pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}
async function importData() {
  try {
    const response = await axios.get('https://template6-six.vercel.app/api/products');
    if (response.status === 200) {
      const products = response.data;
      console.log(`Fetched ${products.length} products`);
      if (products.length > 0) {
        for (const product of products) {
          console.log(`Processing product: ${product.title}`);
          let imageRef = null;
          if (product.image) {
            imageRef = await uploadImageToSanity(product.image);
          }
          const imageId = await uploadImageToSanity(product.imageUrl);
          if (imageId) {
            const sanityProduct = {
              _type: 'product',
              title: product.title,
              description: product.description,
              productImage: {
                _type: 'image',
                asset: {
                  _ref: imageId,
                },
              },
              tags: product.tags,
              dicountPercentage: product.dicountPercentage,
              price: product.price,
              isNew: product.isNew || false,
              slug: {
                _type: 'slug',
                current: product.title.toLowerCase().replace(/ /g, '-'),
              },
            };
            console.log('Uploading product to Sanity:', sanityProduct.title);
            const result = await client.create(sanityProduct);
            console.log(`Product uploaded successfully: ${result._id}`);
          }
        }
      } else {
        console.warn('No products fetched.');
      }
    } else {
      console.error(`Failed to fetch products. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error importing data:', error);
  }
}
importData();
