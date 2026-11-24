// const STORAGE_URL =
//   process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';

// // Laravel image path ko full URL mein convert karta hai
// export function getImageUrl(image?: string | null): string {
//   if (!image) return '';

//   if (image.startsWith('http://') || image.startsWith('https://')) {
//     return image;
//   }

//   return `${STORAGE_URL}/${image.replace(/^\/+/, '')}`;
// }

// // Local (127.0.0.1 / localhost) URLs ko next/image optimizer block karta hai
// export function isLocalImage(url: string): boolean {
//   return /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?\//.test(url);
// }






const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';

export function getImageUrl(image?: string | null): string {
  if (!image) return '';

  // Agar image full URL hai (http se shuru hoti hai)
  if (image.startsWith('http://') || image.startsWith('https://')) {
    // localhost ko 127.0.0.1 se replace karein taaki Next.js image load kar sake
    return image.replace('http://localhost', 'http://127.0.0.1');
  }

  // Agar sirf path hai
  return `${STORAGE_URL}/${image.replace(/^\/+/, '')}`;
}

export function isLocalImage(url: string): boolean {
  return /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?\//.test(url);
}


