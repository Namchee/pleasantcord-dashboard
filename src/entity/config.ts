import { z } from 'zod';

import { Label } from './category';
import { Model } from './model';

export interface Configuration {
  accuracy: number;
  categories: Label[];
  delete: boolean;
  model: Model;
}

export interface FormConfiguration {
  accuracy: number;
  categories: Label[];
  delete: string;
  model: Model;
}

export const configSchema = z
  .object({
    accuracy: z
      .number({
        required_error: 'This field is required',
        invalid_type_error: 'This field must be filled with number',
      })
      .gt(0, 'Accuracy must be greater than zero')
      .max(100, 'Accuracy cannot exceed 100%'),
    categories: z
      .enum(['Drawing', 'Neutral', 'Hentai', 'Sexy', 'Porn'])
      .array()
      .min(1, 'Please select at least one of the categories')
      .max(5, 'You cannot select more than all provided categories'),
    delete: z.enum(['true', 'false']),
    model: z.enum(['MobileNet', 'Inception']),
  })
  .strict('Illegal fields');
