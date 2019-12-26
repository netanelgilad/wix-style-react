import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from 'wix-style-react/Box';
import Button from 'wix-style-react/Button';
import IconButton from 'wix-style-react/IconButton';
import Print from 'wix-ui-icons-common/Print';
import More from 'wix-ui-icons-common/More';
import ascendInvoice from '../../../test/assets/ascend-invoice.jpg';
import ModalPreviewLayout from '..';
import Modal from '../../Modal';
import { modalPreviewLayoutPrivateDriverFactory } from './ModalPreviewLayout.private.uni.driver';
import { uniTestkitFactoryCreator } from 'wix-ui-test-utils/vanilla';

const dataHook = 'storybook-modal-preview-layout';

const modalPreviewLayoutUniTestkitFactory = uniTestkitFactoryCreator(
  modalPreviewLayoutPrivateDriverFactory,
);

const createDriver = () =>
  modalPreviewLayoutUniTestkitFactory({
    wrapper: document.body,
    dataHook,
  });

const commonProps = {
  title: 'Basic Website Design',
  actions: (
    <Box align="space-between" width={'276px'}>
      <Button prefixIcon={<Print />} skin="dark">
        Print
      </Button>
      <Button priority="secondary" skin="light">
        Send
      </Button>
      <IconButton skin="light">
        <More />
      </IconButton>
    </Box>
  ),
};

const multipleChildren = ['first', 'second', 'third'].map(ordinalNum => (
  <Box
    width="90vw"
    height="95vh"
    align="center"
    verticalAlign="middle"
    backgroundColor="D80"
  >
    {`${ordinalNum} content page`}
  </Box>
));

const tests = [
  {
    describe: 'sanity',
    its: [
      {
        it: 'scrollable',
        props: {
          children: (
            <Box>
              <img src={ascendInvoice} />
            </Box>
          ),
        },
      },
    ],
  },
  {
    describe: 'Navigation Buttons',
    its: [
      {
        it: 'first child node',
        props: {
          children: multipleChildren,
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`ModalPreviewLayout/${describe}`, module).add(it, () => (
      <Modal isOpen>
        <ModalPreviewLayout {...commonProps} {...props} />
      </Modal>
    ));
  });
});
