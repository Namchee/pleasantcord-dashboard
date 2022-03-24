import * as React from 'react';

import { UseFormRegister } from 'react-hook-form';

import { Radio } from '@/components/Radio';
import { Checkbox } from '@/components/Checkbox';

import type { FormConfiguration } from '@/entity/config';
import type { Model } from '@/entity/model';
import type { ContentType } from '@/entity/content';

import { ConfigFormErrors } from './ConfigForm';

type AdvancedFormProps = {
  register: UseFormRegister<FormConfiguration>;
  models: Record<Model, string>;
  contents: Record<ContentType, string>;
  errors: ConfigFormErrors;
};

function AdvancedForm({
  register,
  models,
  contents,
  errors,
}: React.PropsWithoutRef<AdvancedFormProps>): JSX.Element {
  return (
    <section className="space-y-8">
      <div
        className="grid
        lg:grid-cols-2
        space-y-4
        lg:space-y-0"
      >
        <div>
          <label className="text-xl font-medium">
            <span>Content Types</span>
            <span className="text-danger ml-1">*</span>
          </label>
          <p className="mt-2 opacity-50 text-sm lg:pr-8">
            Content types to be moderated for possible NSFW contents
          </p>
        </div>

        <div>
          <div className="space-y-6">
            {Object.entries(contents).map(([name, desc], i) => {
              return (
                <Checkbox
                  key={`content-type-${i}`}
                  value={name}
                  name={name}
                  props="contents"
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
              (errors.contents as any)?.message
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
            <span>Classifier</span>
            <span className="text-danger ml-1">*</span>
          </label>
          <p className="mt-2 opacity-50 text-sm lg:pr-8">
            Classifier name to be used when classifying
            contents
          </p>
        </div>

        <div>
          <div className="space-y-6">
            {Object.entries(models).map(([name, desc], i) => {
              return (
                <Radio
                  key={`model-${i}`}
                  value={name}
                  name={name}
                  props="model"
                  theme="primary"
                  register={register}
                  // eslint-disable-next-line max-len
                  help={desc}
                />
              );
            })}
          </div>

          <p className="text-danger text-sm h-5 mt-2">
            {errors.model?.message}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AdvancedForm;
