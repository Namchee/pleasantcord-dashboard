import * as React from 'react';

import * as Dialog from '@radix-ui/react-alert-dialog';

import { useTransition, config, animated } from 'react-spring';

import { Button } from '@/components/Button';

export type ConfigDialogProps = {
  open: boolean;
  onClose: () => void;
  onDiscard: () => void;
};

function ConfigDialog({
  open,
  onClose,
  onDiscard,
}: React.PropsWithoutRef<ConfigDialogProps>): JSX.Element {
  const transition = useTransition(open, {
    from: { opacity: 0, transform: 'scale(0.95) translate(-50%, -50%)' },
    enter: { opacity: 1, transform: 'scale(1) translate(-50%, -50%)' },
    leave: { opacity: 0, transform: 'scale(0.95) translate(-50%, -50%)' },
    reverse: open,
    config: {
      ...config.stiff,
      duration: 150,
    },
  });

  return (
    <Dialog.Root open={open}>
      {transition((style, item) => {
        return (
          item && (
            <>
              <Dialog.Overlay forceMount asChild>
                <animated.div
                  style={{
                    opacity: style.opacity,
                  }}
                  className="bg-background-dark bg-opacity-60
                    h-screen w-screen
                    fixed top-0
                    z-10"
                />
              </Dialog.Overlay>
              <Dialog.Content forceMount asChild>
                <animated.div
                  className="w-75vw
                  max-w-md
                  fixed
                  bg-background-dark
                  text-content
                  rounded-md
                  p-8
                  shadow-lg
                  top-1/2 left-1/2
                  origin-top-left"
                  style={style}
                >
                  <Dialog.Title className="text-xl md:text-2xl font-bold">
                    Discard Unsaved Changes?
                  </Dialog.Title>
                  <Dialog.Description
                    className="text-content
                    text-opacity-50
                    mt-4
                    mb-12
                    md:text-lg"
                  >
                    Leaving this page will cause any potential unsaved changes
                    to be lost.
                  </Dialog.Description>
                  <div className="flex justify-end
                    space-x-4
                    md:space-x-6">
                    <Dialog.Cancel asChild>
                      <Button
                        onClick={onClose}
                        type="button"
                        className="px-4 py-2">
                        Cancel
                      </Button>
                    </Dialog.Cancel>
                    <Dialog.Trigger asChild>
                      <Button
                        onClick={onDiscard}
                        type="button"
                        theme="danger"
                        className="px-4 py-2">
                        Discard
                      </Button>
                    </Dialog.Trigger>
                  </div>
                </animated.div>
              </Dialog.Content>
            </>
          )
        );
      })}
    </Dialog.Root>
  );
}

export default ConfigDialog;
