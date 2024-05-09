import { DishFilterCategory } from './diesh-category';
import { Dish } from './dish';

export interface DishStore {
  dishes: Dish[];
  loading: boolean;
  error: Error | null;
  filterType?: DishFilterCategory;
  searchQuery?: string;
}
