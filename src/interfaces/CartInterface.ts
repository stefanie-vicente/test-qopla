export interface CartProduct {
  id: string;
  flavour: string;
  price: number;
  quantity?: number;
  modifications?: CartProductModification[];
}
export interface CartProductModification {
  type: string;
  modification: string;
  price: number;
}
