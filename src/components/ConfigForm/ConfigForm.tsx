import * as React from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Button } from '@/components/Button';
import { Configuration } from '@/entity/config';
import { Category, Label } from '@/entity/category';

import Skeleton from './Skeleton';
import toast, { Toaster } from 'react-hot-toast';

export type ConfigFormProps = {
  config: Configuration;
  categoryList: Category[];
};

const configSchema = z
  .object({
    accuracy: z
      .number({
        required_error: 'This field is required',
        invalid_type_error: 'This field is required',
      })
      .gt(0, 'Accuracy must be greater than zero')
      .max(100, 'Accuracy cannot exceed 100%'),
    categories: z
      .enum(['Drawing', 'Neutral', 'Hentai', 'Sexy', 'Porn'])
      .array()
      .min(1, 'Please select one of the categories')
      .max(5, 'You cannot select more than all provided categories'),
    delete: z.enum(['true', 'false']),
  })
  .strict('Illegal fields');

const unsavedToast = () =>
  toast('Careful — You have unsaved changes!', {
    duration: Infinity,
    position: 'top-center',
    style: {
      background: '#232326',
      color: 'hsla(240, 100%, 100%, 0.931)',
    },
  });

function ConfigForm({
  config,
  categoryList,
}: React.PropsWithoutRef<ConfigFormProps>): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      accuracy: config.accuracy * 100,
      categories: config.categories,
      delete: String(config.delete),
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    resolver: zodResolver(configSchema),
  });

  const [loading, setLoading] = React.useState(false);
  const { query } = useRouter();
  const { id } = query;

  React.useEffect(() => {
    if (isDirty) {
      unsavedToast();
    } else {
      toast.dismiss();
    }

    return () => toast.dismiss();
  }, [isDirty]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const config = {
      server_id: id,
      accuracy: (data.accuracy as number) / 100,
      categories: data.categories,
      delete: data.delete === 'true',
    };

    setLoading(true);

    const result = await fetch('/api/configs', {
      method: 'PATCH',
      body: JSON.stringify(config),
    });

    if (result.ok) {
      toast.dismiss();
      reset({
        accuracy: data.accuracy as number,
        categories: data.categories as Label[],
        delete: data.delete as string,
      });
    }

    setLoading(false);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
            bg-background-dark
            rounded-md
            border border-background-deep
            transition-shadow
            focus:(outline-none ring ring-3 ring-primary ring-opacity-50)"
              type="number"
              placeholder="Threshold"
              required={true}
              {...register('accuracy', { valueAsNumber: true })}
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
        grid-cols-2"
      >
        <div>
          <label className="text-xl font-medium">
            <span>NSFW Categories</span>
            <span className="text-danger ml-1">*</span>
          </label>
          <p className="mt-2 opacity-50 text-sm">
            Categories that should be classified as NSFW
          </p>
        </div>

        <div>
          <div className="space-y-6">
            {categoryList.map((v, i) => {
              return (
                <label
                  className="flex items-start space-x-4 max-w-sm"
                  key={`category-${i}`}
                  htmlFor={`category-${v.name}`}
                >
                  <input
                    id={`category-${v.name}`}
                    value={v.name}
                    type="checkbox"
                    className="w-6 h-6
                  bg-background-dark
                  transition-shadow
                  border border-background-deep
                  focus:(outline-none ring ring-3 ring-primary ring-opacity-50)
                  text-primary
                  rounded-md"
                    {...register('categories')}
                  />

                  <div>
                    <p className="text-lg">{v.name}</p>
                    <p className="text-sm leading-relaxed opacity-50">
                      {v.description}
                    </p>
                  </div>
                </label>
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
        grid-cols-2"
      >
        <div>
          <label className="text-xl font-medium">
            <span>Action</span>
            <span className="text-danger ml-1">*</span>
          </label>
          <p className="mt-2 opacity-50 text-sm max-w-sm">
            Action be taken on NSFW contents
          </p>
        </div>

        <div>
          <div className="space-y-6">
            <label htmlFor="delete-true" className="flex items-start space-x-4">
              <input
                {...register('delete')}
                id="delete-true"
                value="true"
                type="radio"
                className="w-6 h-6
                  bg-background-dark
                    transition-shadow
                    border border-background-deep
                    focus:outline-none
                    focus:(ring ring-3 ring-primary ring-opacity-50)
                  text-primary
                  rounded-full"
              />

              <div>
                <p className="text-lg">Delete Content</p>
                <p className="text-sm leading-loose opacity-50">
                  NSFW contents will be deleted
                </p>
              </div>
            </label>

            <label
              htmlFor="delete-false"
              className="flex items-start space-x-4"
            >
              <input
                {...register('delete')}
                id="delete-false"
                value="false"
                type="radio"
                className="w-6 h-6
                  bg-background-dark
                    transition-shadow
                    border border-background-deep
                    focus:outline-none
                    focus:(ring ring-3 ring-primary ring-opacity-50)
                  text-primary
                  rounded-full"
              />

              <div>
                <p className="text-lg">Blur Content</p>
                <p className="text-sm leading-loose opacity-50 max-w-sm">
                  NSFW contents will be deleted <b>AND</b> re-posted with{' '}
                  <code className="bg-background-deep
                    py-1 px-2
                    rounded">
                      SPOILER
                  </code> tag
                </p>
              </div>
            </label>
          </div>

          <p className="text-danger text-sm h-5 mt-2">
            {errors.delete?.message}
          </p>
        </div>
      </div>

      <Button type="button" theme="primary" onClick={() => setOpen(true)}>
        Toggle Modal
      </Button>

      <div className="grid grid-cols-2">
        <div
          className="col-start-2
          mt-4"
        >
          <Button
            disabled={!isDirty}
            loading={loading}
            type="submit"
            theme="primary"
            className="grid place-items-center
              w-30 h-12
              text-lg
              font-medium"
          >
            Save
          </Button>
        </div>
      </div>

      <Toaster />

      <Dialog.Root open={open}>
        <Dialog.Overlay
          className="bg-dark opacity-60
            h-screen w-screen
            fixed top-0
            z-10"
        />
        <Dialog.Content
          onPointerDownOutside={() => setOpen(false)}
          className="fixed
          bg-background
          text-content
          p-8
          rounded-md
          top-1/2 left-1/2
          transform -translate-x-1/2 -translate-y-1/2"
        >
          <Dialog.Title className="text-2xl font-bold">
            Discard Unsaved Changes?
          </Dialog.Title>
          <Dialog.Description className="opacity-50
            mt-4
            mb-12
            text-lg">
            Any unsaved changes will be lost.
          </Dialog.Description>
          <div className="flex justify-end space-x-6">
            <Dialog.Close>
              <button>Cancel</button>
            </Dialog.Close>
            <Dialog.Close>
              <button className="text-danger">Discard</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </form>
  );
}

ConfigForm.Skeleton = Skeleton;

export default ConfigForm;
