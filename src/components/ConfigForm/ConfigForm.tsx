import * as React from 'react';

import router, { useRouter, Router } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod/dist/zod';

import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';

import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Radio } from '@/components/Radio';

import { Label } from '@/entity/category';

import Skeleton from './Skeleton';
import ConfigDialog from './ConfigDialog';
import {
  spawnToast,
  spawnLoadingToast,
  spawnSuccessToast,
  dismissToasts,
  spawnFailedToast,
} from './toast';
import { PreventRoutingException } from '@/common/error';

import { configSchema, Configuration } from '@/entity/config';

import type { APIResponse } from '@/entity/response';
import type { Model } from '@/entity/model';

export type ConfigFormProps = {
  config: Configuration;
  categories: Record<Label, string>;
  models: Record<Model, string>;
};


function ConfigForm({
  config,
  categories,
  models,
}: React.PropsWithoutRef<ConfigFormProps>): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      accuracy: config.accuracy * 100,
      categories: config.categories.sort(),
      delete: String(config.delete),
      model: config.model,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    resolver: zodResolver(configSchema),
  });

  const [loading, setLoading] = React.useState(false);
  const { query, push } = useRouter();

  const onSubmit = async (data: Record<string, unknown>) => {
    spawnLoadingToast();
    setLoading(true);

    const response = await fetch(`/api/configs/${query.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (response.ok) {
      reset({
        accuracy: data.accuracy as number,
        categories: data.categories as Label[],
        delete: data.delete as string,
        model: data.model as Model,
      });
      spawnSuccessToast();
    } else {
      if (response.status === 500) {
        push('/500');
      } else {
        const { error }: APIResponse<null> = await response.json();
        spawnFailedToast(error);
      }
    }

    setLoading(false);
  };

  // toast logic
  React.useEffect(() => {
    isDirty ? spawnToast() : dismissToasts();

    return () => dismissToasts();
  }, [isDirty]);


  // unsaved changes logic
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [route, setRoute] = React.useState('');

  const continueNavigation = () => {
    setConfirm(true);

    if (route) {
      push(route);
    }
  };

  React.useEffect(() => {
    const handleRouteChange = (path: string) => {
      if (isDirty && !confirm && path !== '/500') {
        setOpen(true);
        setRoute(path);
        router.router?.abortComponentLoad(path, { shallow: true });
        Router.events.emit('routeChangeError');
        throw new PreventRoutingException();
      }
    };

    const handleWindowChange = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue =
          'Leaving this page will cause any unsaved changes to be lost';
        return 'Leaving this page will cause any unsaved changes to be lost';
      }
    };

    window.addEventListener('beforeunload', handleWindowChange);
    Router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
      window.removeEventListener('beforeunload', handleWindowChange);
    };
  }, [isDirty, confirm]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
              Categories that should be classified as NSFW
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
                    props='categories'
                    theme='primary'
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
              Action to be taken on NSFW contents
            </p>
          </div>

          <div>
            <div className="space-y-6">
              <Radio
                key='delete-true'
                value='true'
                name='Delete Content'
                props='delete'
                theme='primary'
                register={register}
                help='NSFW contents will be deleted'
              />

              <Radio
                key='delete-false'
                value='false'
                name='Blur Content'
                props='delete'
                theme='primary'
                register={register}
                // eslint-disable-next-line max-len
                help={<>NSFW contents will be deleted <b>AND</b> re-posted with{' '}
                  <code
                    className="bg-background-deep
                      py-1 px-2
                      rounded"
                  >
                    SPOILER
                  </code>{' '}
                tag</>}
              />
            </div>

            <p className="text-danger text-sm h-5 mt-2">
              {errors.delete?.message}
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
              NSFW classifier to be used
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
                    props='model'
                    theme='primary'
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

        <div className="grid grid-cols-2">
          <div
            className="lg:col-start-2
          lg:mt-4"
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
      </form>

      <Toaster
        containerStyle={{
          top: 24,
        }}
      />

      <ConfigDialog
        open={open}
        onClose={() => setOpen(false)}
        onDiscard={() => continueNavigation()}
      />
    </>
  );
}

ConfigForm.Skeleton = Skeleton;

export default ConfigForm;
