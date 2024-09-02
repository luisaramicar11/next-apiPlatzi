export interface Product {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    category:    Category;
    images:      string[];
}

export interface Category {
    id:    number;
    name:  string;
    image: string;
}

export interface TableRowProducts {
    product : Product,
    setDataToEdit: (product: Product | null) => void;
    deleteData: (id: number) => void;
}

export interface TableData {
    data : Product[],
    setDataToEdit: (product: Product | null) => void;
    deleteData: (id: number) => void;
}

export interface Products {
    products: Product[];
}

export interface EditedProductState {
    category: Category;
    product: Product;
  }

  
export interface CardProps{
    product: Product;
    }