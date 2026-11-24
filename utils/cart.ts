import { ShopProduct, ShopProductVariant } from '@/types/shop';
import { CartItem, WishlistItem } from '@/types/cart';

const CART_KEY = 'petlux_cart';
const WISHLIST_KEY = 'petlux_wishlist';

/* ---------- CART ---------- */

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
}

export function addToCart(
  product: ShopProduct,
  quantity: number = 1,
  variant?: ShopProductVariant
): CartItem[] {
  const cart = getCart();

  const existingIndex = cart.findIndex(
    (item) =>
      item.product.id === product.id &&
      item.variant?.id === variant?.id
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity, variant });
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(
  productId: number,
  variantId?: number
): CartItem[] {
  const cart = getCart().filter(
    (item) =>
      !(
        item.product.id === productId &&
        item.variant?.id === variantId
      )
  );
  saveCart(cart);
  return cart;
}

export function updateCartQuantity(
  productId: number,
  quantity: number,
  variantId?: number
): CartItem[] {
  if (quantity < 1) {
    return removeFromCart(productId, variantId);
  }

  const cart = getCart().map((item) => {
    if (
      item.product.id === productId &&
      item.variant?.id === variantId
    ) {
      return { ...item, quantity };
    }
    return item;
  });

  saveCart(cart);
  return cart;
}

// FIX: Variant change karte waqt item ki position preserve karein
export function updateCartVariant(
  productId: number,
  oldVariantId: number | undefined,
  newVariant: ShopProductVariant
): CartItem[] {
  const cart = getCart();
  
  // Purana item ka index dhundhein
  const index = cart.findIndex(
    (item) =>
      item.product.id === productId &&
      item.variant?.id === oldVariantId
  );

  if (index === -1) return cart;

  // Check karein ki naya variant pehle se cart me hai ya nahi
  const existingNewIndex = cart.findIndex(
    (item) =>
      item.product.id === productId &&
      item.variant?.id === newVariant.id
  );

  if (existingNewIndex > -1) {
    // Agar naya variant already cart me hai, toh quantity merge karein aur purana remove karein
    cart[existingNewIndex].quantity += cart[index].quantity;
    cart.splice(index, 1);
  } else {
    // Nahi hai, toh same index par variant update karein (position preserve)
    cart[index] = { ...cart[index], variant: newVariant };
  }

  saveCart(cart);
  return cart;
}

/* ---------- WISHLIST ---------- */
// ... (same as before)
export function getWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveWishlist(items: WishlistItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: items }));
}

export function toggleWishlist(
  product: ShopProduct,
  variant?: ShopProductVariant
): WishlistItem[] {
  const current = getWishlist();
  const exists = current.some(
    (item) =>
      item.product.id === product.id &&
      item.variant?.id === variant?.id
  );

  let next: WishlistItem[];

  if (exists) {
    next = current.filter(
      (item) =>
        !(
          item.product.id === product.id &&
          item.variant?.id === variant?.id
        )
    );
  } else {
    next = [...current, { product, variant }];
  }

  saveWishlist(next);
  return next;
}

export function clearWishlist() {
  saveWishlist([]);
}











// FIX: Wishlist me variant change karte waqt position preserve karein
export function updateWishlistVariant(
  productId: number,
  oldVariantId: number | undefined,
  newVariant: ShopProductVariant
): WishlistItem[] {
  const wishlist = getWishlist();
  
  // Purana item ka index dhundhein
  const index = wishlist.findIndex(
    (item) =>
      item.product.id === productId &&
      item.variant?.id === oldVariantId
  );

  if (index === -1) return wishlist;

  // Check karein ki naya variant pehle se wishlist me hai ya nahi
  const existingNewIndex = wishlist.findIndex(
    (item) =>
      item.product.id === productId &&
      item.variant?.id === newVariant.id
  );

  if (existingNewIndex > -1) {
    // Agar naya variant already wishlist me hai, toh purana remove karein (duplicate se bachne ke liye)
    wishlist.splice(index, 1);
  } else {
    // Nahi hai, toh same index par variant update karein (position preserve)
    wishlist[index] = { ...wishlist[index], variant: newVariant };
  }

  saveWishlist(wishlist);
  return wishlist;
}


