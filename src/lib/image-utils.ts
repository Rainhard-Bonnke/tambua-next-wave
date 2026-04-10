// Image optimization utilities

export interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
}

// Generate responsive image srcset
export const generateSrcSet = (baseUrl: string, options: ImageOptions = {}): string => {
  const { width, height, quality = 75 } = options;
  
  if (!baseUrl.includes('unsplash.com') && !baseUrl.includes('cloudinary')) {
    return baseUrl;
  }

  const sizes = [320, 640, 768, 1024, 1280, 1536];
  const srcSet = sizes.map(size => {
    const optimizedUrl = getOptimizedUrl(baseUrl, { 
      width: size, 
      height: height ? Math.round((height * size) / (width || 800)) : undefined,
      quality 
    });
    return `${optimizedUrl} ${size}w`;
  });

  return srcSet.join(', ');
};

// Get optimized image URL
export const getOptimizedUrl = (url: string, options: ImageOptions = {}): string => {
  const { width = 800, height = 600, quality = 75, format = 'auto' } = options;

  if (url.includes('unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}auto=format&fit=crop&w=${width}&h=${height}&q=${quality}&fm=${format}`;
  }

  if (url.includes('cloudinary')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}q=${quality}&w=${width}&h=${height}&f_auto`;
  }

  // For other sources, return original URL
  return url;
};

// Preload critical images
export const preloadImage = (url: string, options: ImageOptions = {}): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const optimizedUrl = getOptimizedUrl(url, options);
    
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = optimizedUrl;
  });
};

// Blur placeholder generator
export const generateBlurPlaceholder = (width: number = 40, height: number = 30): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a subtle gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(0.5, '#e0e0e0');
    gradient.addColorStop(1, '#f0f0f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL();
};

// Check if image format is supported
export const supportsFormat = (format: 'webp' | 'avif'): Promise<boolean> => {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(false);
      return;
    }

    canvas.width = 1;
    canvas.height = 1;
    
    const dataUrl = canvas.toDataURL(`image/${format}`);
    resolve(dataUrl.indexOf(`data:image/${format}`) === 0);
  });
};

// Get optimal image format for browser
export const getOptimalFormat = async (): Promise<'webp' | 'avif' | 'png' | 'jpg'> => {
  if (await supportsFormat('avif')) return 'avif';
  if (await supportsFormat('webp')) return 'webp';
  
  // Fallback to original format detection
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return 'jpg';
  
  // Test PNG support
  try {
    canvas.toDataURL('image/png');
    return 'png';
  } catch {
    return 'jpg';
  }
};
