import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u9ap71p1',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
})

// Get image URL from Sanity image object or external URL
export const getSanityImageUrl = (image: unknown, options?: { width?: number; height?: number }) => {
  // If it's already a URL string, return it
  if (typeof image === 'string') {
    return image;
  }

  // If it's a Sanity image asset
  if (image && typeof image === 'object' && 'asset' in image && image.asset && typeof image.asset === 'object' && '_ref' in image.asset) {
    const asset = (image.asset as { _ref: string })._ref;
    const [id, filename] = asset.split('-').slice(1);
    const extension = filename?.split('.').pop() || 'jpg';

    let url = `https://cdn.sanity.io/images/${sanityClient.config().projectId}/${sanityClient.config().dataset}/${id}.${extension}`;

    if (options) {
      const params = new URLSearchParams();
      if (options.width) params.set('w', options.width.toString());
      if (options.height) params.set('h', options.height.toString());
      params.set('auto', 'format');
      url = `${url}?${params.toString()}`;
    }

    return url;
  }

  // Default placeholder
  return '/placeholder.jpg';
};

// Helper to get first image from product
export const getProductImage = (product: unknown, options?: { width?: number; height?: number }) => {
  // Check for public folder image path first
  if (product && typeof product === 'object' && 'publicImagePath' in product && product.publicImagePath) {
    return product.publicImagePath as string;
  }
  
  // Check for external imageUrl next
  if (product && typeof product === 'object' && 'imageUrl' in product && product.imageUrl) {
    return product.imageUrl as string;
  }

  // Then check images array
  if (product && typeof product === 'object' && 'images' in product && Array.isArray(product.images) && product.images.length > 0) {
    const firstImage = product.images[0];

    // If it's a URL string
    if (typeof firstImage === 'string') {
      return firstImage;
    }

    // If it's a Sanity image object
    return getSanityImageUrl(firstImage, options);
  }

  return '/placeholder.jpg';
};
