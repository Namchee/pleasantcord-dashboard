import toast from 'react-hot-toast';

const style = {
  backgroundColor: '#34343A',
  color: '#EDEDEF',
};

export function spawnToast(): void {
  toast('Careful — You have unsaved changes!', {
    style,
    id: 'loading',
    duration: Infinity,
  });
}

export function spawnLoadingToast(): void {
  toast.loading('Saving changes', {
    style,
    id: 'loading',
    duration: Infinity,
  });
}

export function spawnSuccessToast() {
  dismissToasts();

  toast.success(
    'Configuration has been updated',
    {
      id: 'success',
      duration: 2500,
      style,
    },
  );
}

export function dismissToasts() {
  toast.dismiss('loading');
  toast.dismiss('success');
}