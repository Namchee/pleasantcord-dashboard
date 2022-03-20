import * as React from 'react';

import router, { useRouter, Router } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod/dist/zod';

import { FieldError, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';

import { Button } from '@/components/Button';

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
import GeneralForm from './GeneralForm';
import AdvancedForm from './AdvancedForm';

export type ConfigFormProps = {
  config: Configuration;
  categories: Record<Label, string>;
  models: Record<Model, string>;
};

// TODO: is it possible to generate this without defining?
export type ConfigFormErrors = {
  categories?: FieldError[] | undefined;
  model?: FieldError | undefined;
  accuracy?: FieldError | undefined;
  delete?: FieldError | undefined;
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

  const onSubmit = async (data: Record<keyof Configuration, unknown>) => {
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
        <GeneralForm
          register={register}
          categories={categories}
          errors={errors}
        />

        <AdvancedForm
          register={register}
          models={models}
          errors={errors}
        />

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
