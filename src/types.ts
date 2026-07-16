export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating?: number;
  reviewsCount?: number;
  isPopular?: boolean;
  isBestseller?: boolean;
  isSpicy?: boolean;
  isSatvik?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface DeliveryDetails {
  fullName: string;
  mobile: string;
  address: string;
  landmark?: string;
  instructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  packingCharges: number;
  deliveryFee: number;
  total: number;
  deliveryDetails: DeliveryDetails;
  paymentMethod: string;
  status: 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
  estimatedTime: string;
  createdAt: string;
}
