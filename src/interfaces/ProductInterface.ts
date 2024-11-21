export interface Product {
  id: string;
  name: string;
  price: number;
  modifications?: Modifications;
}
export interface Modifications {
  size: ModificationOption[];
  flavours: ModificationOption[];
}
export interface ModificationOption {
  name: string;
  addonPrice: number;
}
export interface Modification {
  sizes: ProductSize;
  flavours: ProductFlavour;
}
export interface ProductSize {
  name: string;
  addonPrice: number;
}
export interface ProductFlavour {
  name: string;
  addonPrice: number;
}
