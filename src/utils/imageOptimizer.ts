/**
 * Image optimization utility for frame animations and general image loading
 */

/**
 * Global image cache to store loaded images across components
 */
export const imageCache: Record<string, HTMLImageElement> = {};

/**
 * Initialize the global image cache on the window object
 */
export function initImageCache(): void {
  if (typeof window !== 'undefined') {
    // @ts-ignore - Creating a custom property on window
    window.__PRELOADED_IMAGES = window.__PRELOADED_IMAGES || {};
    
    // Expose the image cache for debugging if needed
    // @ts-ignore
    window.__IMAGE_CACHE_DEBUG = {
      getStats: () => ({
        totalImages: Object.keys(imageCache).length,
        totalPreloaded: window.__PRELOADED_IMAGES ? Object.keys(window.__PRELOADED_IMAGES).length : 0,
        memoryEstimate: estimateCacheMemory()
      })
    };
  }
}

/**
 * Format a frame number to the required file format (e.g., 0 → "0000")
 */
export function formatFrameNumber(num: number): string {
  return num.toString().padStart(4, '0');
}

/**
 * Generate frame URLs for a sequence of frames
 */
export function generateFrameUrls(prefix: string, totalFrames: number, startIndex: number = 0): string[] {
  const urls: string[] = [];
  for (let i = startIndex; i < totalFrames + startIndex; i++) {
    urls.push(`/${prefix}/${formatFrameNumber(i)}.jpg`);
  }
  return urls;
}

/**
 * Preload a single image and add it to the cache
 */
export async function preloadImage(url: string, addTimestamp: boolean = false): Promise<HTMLImageElement> {
  // Check if already in cache
  if (imageCache[url]) {
    return imageCache[url];
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Set attributes to optimize loading
    img.crossOrigin = "anonymous";
    // @ts-ignore - This is a non-standard but useful attribute
    img.decoding = "sync";
    
    // Add cache-busting parameter if needed
    const finalUrl = addTimestamp ? `${url}?t=${Date.now()}` : url;
    
    // Set up event handlers
    img.onload = () => {
      imageCache[url] = img;
      
      // Also store in window cache for global access
      if (typeof window !== 'undefined' && window.__PRELOADED_IMAGES) {
        // @ts-ignore - Custom property
        window.__PRELOADED_IMAGES[url] = img;
      }
      
      resolve(img);
    };
    
    img.onerror = (e) => {
      console.error(`Failed to load image: ${url}`, e);
      reject(new Error(`Failed to load image: ${url}`));
    };
    
    // Start loading
    img.src = finalUrl;
  });
}

/**
 * Preload a batch of images with progress tracking
 */
export async function preloadImageBatch(
  urls: string[], 
  progressCallback?: (progress: number) => void,
  batchSize: number = 5
): Promise<HTMLImageElement[]> {
  const images: HTMLImageElement[] = [];
  let completed = 0;
  
  // Process in batches
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    
    // Load this batch in parallel
    const batchPromises = batch.map(url => 
      preloadImage(url)
        .then(img => {
          completed++;
          if (progressCallback) {
            progressCallback((completed / urls.length) * 100);
          }
          return img;
        })
        .catch(() => {
          // Count failed loads in progress
          completed++;
          if (progressCallback) {
            progressCallback((completed / urls.length) * 100);
          }
          return null;
        })
    );
    
    // Wait for current batch to complete
    const batchResults = await Promise.all(batchPromises);
    images.push(...batchResults.filter(Boolean) as HTMLImageElement[]);
  }
  
  return images;
}

/**
 * Get an image from cache or load it if not available
 */
export function getImageFromCache(url: string): HTMLImageElement | null {
  // Try the imageCache first
  if (imageCache[url]) {
    return imageCache[url];
  }
  
  // Then try the window.__PRELOADED_IMAGES
  if (typeof window !== 'undefined' && window.__PRELOADED_IMAGES && window.__PRELOADED_IMAGES[url]) {
    // @ts-ignore - Custom property
    return window.__PRELOADED_IMAGES[url];
  }
  
  // Not in cache
  return null;
}

/**
 * Clear specific URLs from the cache to free memory
 */
export function clearFromCache(urls: string[]): void {
  urls.forEach(url => {
    delete imageCache[url];
    if (typeof window !== 'undefined' && window.__PRELOADED_IMAGES) {
      // @ts-ignore - Custom property
      delete window.__PRELOADED_IMAGES[url];
    }
  });
}

/**
 * Estimate the memory used by the image cache (rough calculation)
 */
function estimateCacheMemory(): string {
  if (typeof window === 'undefined') return '0 MB';
  
  let totalBytes = 0;
  
  // Calculate from our cache
  Object.values(imageCache).forEach(img => {
    // Rough estimate: width * height * 4 bytes per pixel (RGBA)
    totalBytes += (img.width * img.height * 4) || 0;
  });
  
  // Add window cache if different
  if (window.__PRELOADED_IMAGES) {
    Object.values(window.__PRELOADED_IMAGES).forEach(img => {
      if (!imageCache[img.src]) {
        totalBytes += (img.width * img.height * 4) || 0;
      }
    });
  }
  
  // Convert to MB
  const mbSize = totalBytes / (1024 * 1024);
  return `${mbSize.toFixed(2)} MB`;
} 