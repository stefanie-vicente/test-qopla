export interface CartProduct {
  typeId: string;
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
