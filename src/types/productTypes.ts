export interface productsTypes {
    id: string;
    name: string;
    category: string;
    code: string;
    quantity: string;
    unit: string;
    price: string;
    description: string;
    image_url: string;
  }
  
  export interface productsState {
    products: productsTypes[];
    product: productsTypes | null;
    logProduct: productsTypes[];
  }
  
  export interface editProductsPropsTypes {
    onClose: () => void;
    productProps: productsTypes;
  }

  export interface updatePhotProductsPropsTypes{
    onClose: () => void;
    image_url : string;
  }