import * as React from 'react';

import { UseFormRegister } from 'react-hook-form';

import { Checkbox } from '@/components/Checkbox';
import { Radio } from '@/components/Radio';

import type { FormConfiguration } from '@/entity/config';
import type { Label } from '@/entity/category';

import { ConfigFormErrors } from './ConfigForm';

type GeneralFormProps = {
  register: UseFormRegister<FormConfiguration>;
  categories: Record<Label, string>;
  errors: ConfigFormErrors;
}

function GeneralForm(
  {
    register,
    categories,
    errors,
  }: React.PropsWithoutRef<GeneralFormProps>,
): JSX.Element {
  return (
    <>
      <div
        className="grid
            lg:grid-cols-2
            space-y-4
            lg:space-y-0"
      >
        <div>
          <label htmlFor="accuracy" className="text-xl font-medium">
            <span>Accuracy Threshold</span>
            <span className="text-danger ml-1">*</span>
          </label>
          <p className="mt-2 text-sm opacity-50 lg:pr-8">
            Minimum probability value for contents to be classified as NSFW
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
            bg-background-dark
            rounded-md
            border border-background-deep
            transition-shadow
            focus:(outline-none ring ring-3 ring-primary ring-opacity-50)"
              type="number"
              placeholder="Threshold"
              required={true}
              {...register('accuracy', { valueAsNumber: true })}
              step="any"
            />
            <span
              aria-hidden="true"
              className="absolute opacity-50 font-bold right-0 mr-4"
            >
              %
            </span>
          </div>

          <p className="text-danger text-sm h-5 mt-2">
            {errors.accuracy?.message}
          </p>
        </div>
      </div>

      <div
        className="grid
        lg:grid-cols-2
        space-y-4
        lg:space-y-0"
      >
        <div>
          <label className="text-xl font-medium">
            <span>NSFW Categories</span>
            <span className="text-danger ml-1">*</span>
          </label>
          <p className="mt-2 opacity-50 text-sm lg:pr-8">
            Content categories that should be classified as NSFW
          </p>
        </div>

        <div>
          <div className="space-y-6">
            {Object.entries(categories).map(([name, desc], i) => {
              return (
                <Checkbox
                  key={`category-${i}`}
                  value={name}
                  name={name}
                  props="categories"
                  theme="primary"
                  register={register}
                  help={desc}
                />
              );
            })}
          </div>
          <p className="text-danger text-sm h-5 mt-2">
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (errors.categories as any)?.message
            }
          </p>
        </div>
      </div>

      <div
        className="grid
        lg:grid-cols-2
        space-y-4
        lg:space-y-0"
      >
        <div>
          <label className="text-xl font-medium">
            <span>Action</span>
            <span className="text-danger ml-1">*</span>
          </label>
          <p className="mt-2 opacity-50 text-sm lg:pr-8">
            Action to be taken when NSFW contents are detected
          </p>
        </div>

        <div>
          <div className="space-y-6">
            <Radio
              key="delete-true"
              value="true"
              name="Delete Content"
              props="delete"
              theme="primary"
              register={register}
              help="NSFW contents will be deleted"
            />

            <Radio
              key="delete-false"
              value="false"
              name="Blur Content"
              props="delete"
              theme="primary"
              register={register}
              // eslint-disable-next-line max-len
              help={
                <>
                  NSFW contents will be deleted <b>AND</b> re-posted with{' '}
                  <code
                    className="bg-background-deep
                      py-1 px-2
                      rounded"
                  >
                    SPOILER
                  </code>{' '}
                  tag
                </>
              }
            />
          </div>

          <p className="text-danger text-sm h-5 mt-2">
            {errors.delete?.message}
          </p>
        </div>
      </div>
    </>
  );
}

export default GeneralForm;
