/* eslint-disable */
import React from 'react';
import Modal from 'wix-style-react/Modal';
import Box from 'wix-style-react/Box';
import Button from 'wix-style-react/Button';
import TextButton from 'wix-style-react/TextButton';
import IconButton from 'wix-style-react/IconButton';

import ModalPreviewLayout from '../..';

class MultipleContentExample extends React.Component {
  state = {
    isModalOpened: false,
  };

  openModal() {
    this.setState({ isModalOpened: true });
  }

  closeModal() {
    this.setState({ isModalOpened: false });
  }

  render() {
    const { isModalOpened } = this.state;
    return (
      <div>
        <Button onClick={() => this.openModal()}>Open</Button>
        <Modal isOpen={isModalOpened}>
          <ModalPreviewLayout
            title="Modal with Multiple Content"
            actions={
              <Box verticalAlign="middle">
                <Box marginRight={2}>
                  <TextButton size="small" skin="light" prefixIcon={<Icons.Print />}>
                    Print
                  </TextButton>
                </Box>
                <Box marginRight={2}>
                  <Button priority="secondary" size="small" skin="light">
                    Send
                  </Button>
                </Box>
                <IconButton priority="secondary" size="small" skin="light">
                  <Icons.More />
                </IconButton>
              </Box>
            }
            onClose={() => this.closeModal()}
          >
            {['first', 'second', 'third'].map((ordinalNum, i)=>
              <Box
                key={`content-page-${i}`}
                align="center"
                verticalAlign="middle"
                backgroundColor="D80"
                width="60vh"
                height="90vh"
                children={`This is the ${ordinalNum} page`}
              />)}
          </ModalPreviewLayout>
        </Modal>
      </div>
    );
  }
}
