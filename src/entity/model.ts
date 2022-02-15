export type ModelType = 'MobileNet' | 'Inception';

export interface Model {
  name: ModelType;
  description: string;
}
