import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    _id: string;
    title: string;
    price?: string;
    mainImage: any;
    slug: string;
    category: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: any) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setOpen: (open: boolean) => void;
    getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item._id === product._id);

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item._id === product._id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true,
                    });
                } else {
                    set({
                        items: [
                            ...currentItems,
                            {
                                _id: product._id,
                                title: product.title,
                                price: product.price,
                                mainImage: product.mainImage,
                                slug: product.slug?.current || product.slug,
                                category: product.category,
                                quantity: 1,
                            },
                        ],
                        isOpen: true,
                    });
                }
            },
            removeItem: (productId) => {
                set({
                    items: get().items.filter((item) => item._id !== productId),
                });
            },
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }
                set({
                    items: get().items.map((item) =>
                        item._id === productId ? { ...item, quantity } : item
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            toggleCart: () => set({ isOpen: !get().isOpen }),
            setOpen: (open) => set({ isOpen: open }),
            getItemCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
        }),
        {
            name: 'biosag-cart-storage',
        }
    )
);
