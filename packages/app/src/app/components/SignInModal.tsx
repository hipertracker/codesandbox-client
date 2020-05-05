import React, { useEffect } from 'react';
import { ThemeProvider, Stack } from '@codesandbox/components';
import codeSandboxBlack from '@codesandbox/components/lib/themes/codesandbox-black';
import OutsideClickHandler from 'react-outside-click-handler';
import { SignInModalElement } from 'app/pages/SignIn/Modal';
import { useOvermind } from 'app/overmind';

export const SignInModal = () => {
  const {
    actions: { toggleSignInModal },
    state: { redirectOnLogin },
  } = useOvermind();

  const closeModal = event => {
    if (event.keyCode === 27 && open) {
      toggleSignInModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal, false);
    return () => document.removeEventListener('keydown', closeModal, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={codeSandboxBlack}>
      <Stack
        align="center"
        justify="center"
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          background: 'rgba(21, 21, 21, 0.9)',
        }}
      >
        <OutsideClickHandler onOutsideClick={toggleSignInModal}>
          <SignInModalElement redirectTo={redirectOnLogin} />
        </OutsideClickHandler>
      </Stack>
    </ThemeProvider>
  );
};
