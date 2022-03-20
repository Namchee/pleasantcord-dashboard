import { Label } from './category';
import { Model } from './model';

export interface Configuration {
  accuracy: number;
  categories: Label[];
  delete: boolean;
  model: Model;
}
