import * as React from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Category } from '@/entity/category';
import { Configuration } from '@/entity/config';

import Skeleton from './Skeleton';

export type ConfigFormProps = {
  // config: Configuration;
  // selectedCategories: Category[];
};

const configSchema = z.object({
  accuracy: z
    .number({
      required_error: 'This field is required',
      invalid_type_error: 'Accuracy must be a number',
    })
    .gt(0, 'Accuracy should be greater than zero')
    .max(100, 'Accuracy cannot exceed 100%'),
  categories: z
    .enum(['Drawing', 'Neutral', 'Hentai', 'Sexy', 'Porn'])
    .array()
    .min(1, 'Please select one of the categories')
    .max(5, 'You cannot select more than all provided categories'),
  delete: z.boolean({
    required_error: 'This field is required',
    invalid_type_error: 'Action must be a boolean',
  }),
});

function ConfigForm({}: // config,
// selectedCategories,
React.PropsWithoutRef<ConfigFormProps>): JSX.Element {
  /*
  const { register, handleSubmit } = useForm({
    defaultValues: {
      accuracy: config.accuracy,
      categories: selectedCategories,
      delete: config.delete,
    },
    resolver: zodResolver(configSchema),
  });
  */

  const onSubmit = (data: Configuration) => console.log(data);

  return (
    <form className="space-y-6">
      <div
        className="grid
        grid-cols-2"
      >
        <div>
          <label htmlFor="accuracy" className="text-xl font-medium">
            <span>Accuracy Threshold</span>
            <span className="text-danger ml-1">*</span>
          </label>
          <p className="mt-2 text-sm opacity-50 max-w-sm">
            Minimum accuracy for NSFW classification
          </p>
        </div>

        <div className="max-w-sm">
          <div className="relative flex items-center">
            <input
              id="accuracy"
              className="self-start
            text-lg
            py-3 px-4
            w-full
            bg-depth
            rounded-md
            border border-dark
            transition-shadow
            focus:(outline-none ring ring-3 ring-accent ring-opacity-50)"
              type="number"
            />
            <span
              aria-hidden="true"
              className="absolute opacity-50 font-bold right-0 mr-4"
            >
              %
            </span>
          </div>

          <p className="text-danger text-sm h-5 mt-3">This value is required</p>
        </div>
      </div>

      <div
        className="grid
        grid-cols-2"
      >
        <div>
          <label htmlFor="" className="text-xl font-medium">
            <span>NSFW Categories</span>
            <span className="text-danger ml-1">*</span>
          </label>
          <p className="mt-2 opacity-50 text-sm">
            Categories that should be classified as NSFW
          </p>
        </div>

        <div>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 max-w-sm">
              <input
                type="checkbox"
                className="w-6 h-6
              bg-depth
              transition-shadow
              border border-dark
              focus:(outline-none ring ring-3 ring-accent ring-opacity-50)
              text-accent
              rounded-md"
              />
              <label>
                <p className="text-lg">Drawing</p>
                <p className="text-sm leading-loose opacity-50">
                  Mostly harmless contents
                </p>
              </label>
            </div>
          </div>

          <p className="text-danger text-sm h-5 mt-2">This value is required</p>
        </div>
      </div>

      <div
        className="grid
        grid-cols-2"
      >
        <div>
          <label htmlFor="" className="text-xl font-medium">
            <span>Action</span>
            <span className="text-danger ml-1">*</span>
          </label>
          <p className="mt-2 opacity-50 text-sm max-w-sm">
            Response to NSFW contents
          </p>
        </div>

        <div>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <input
                name="delete"
                value="true"
                type="radio"
                className="w-6 h-6
              bg-depth
              transition-shadow
              border border-dark
              focus:(outline-none ring ring-3 ring-accent ring-opacity-50)
              text-accent
              rounded-full"
              />
              <label>
                <p className="text-lg">Drawing</p>
                <p className="text-sm leading-loose opacity-50">
                  Mostly harmless contents
                </p>
              </label>
            </div>
            <div className="flex items-start space-x-4">
              <input
                name="delete"
                value="false"
                type="radio"
                className="w-6 h-6
              bg-depth
              transition-shadow
              border border-dark
              focus:(outline-none ring ring-3 ring-accent ring-opacity-50)
              text-accent
              rounded-full"
              />
              <label>
                <p className="text-lg">Drawing</p>
                <p className="text-sm leading-loose opacity-50">
                  Mostly harmless contents
                </p>
              </label>
            </div>
          </div>

          <p className="text-danger text-sm h-5 mt-2">This value is required</p>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="col-start-2 mt-8">
          <button
            type="submit"
            className="bg-accent
            text-white
            rounded-md
            px-8 py-2
            text-lg
            font-medium
            transition-shadow
            focus:(outline-none ring ring-4 ring-accent ring-opacity-50)"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

ConfigForm.Skeleton = Skeleton;

export default ConfigForm;
