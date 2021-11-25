import { Label } from './category';

export interface Configuration {
  accuracy: number;
  categories: Label[];
  delete: boolean;
}
