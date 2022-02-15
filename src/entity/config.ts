import { Label } from './category';
import { ModelType } from './model';

export interface Configuration {
  accuracy: number;
  categories: Label[];
  delete: boolean;
  model: ModelType;
}
