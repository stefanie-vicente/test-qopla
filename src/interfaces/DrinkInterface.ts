export interface IDrink {
  id: string;
  name: string;
  price: number;
  modifications?: IModification[];
}

interface IModification {
  sizes: ISize;
  flavours: IFlavour;
}

interface ISize {
  name: string;
  addonPrice: number;
}

interface IFlavour {
  name: string;
  addonPrice: number;
}
