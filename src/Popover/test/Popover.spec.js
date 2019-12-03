import React, { useState } from 'react';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import { testkitFactoryCreator } from 'wix-ui-test-utils/vanilla';

import Popover from '../Popover';
import Button from '../../Button/Button';
import popoverDriverFactory from '../Popover.driver';
import { buttonDriverFactory } from '../../Button/Button.uni.driver';

const buttonTestkitFactory = testkitFactoryCreator(buttonDriverFactory);

describe('Popover', () => {
  const createDriver = createDriverFactory(popoverDriverFactory);

  it("should inherit core's driver methods", () => {
    const onClickFn = jest.fn();

    const driver = createDriver(
      <Popover shown onClick={onClickFn}>
        <Popover.Element>I am the trigger!</Popover.Element>
        <Popover.Content>I am the content!</Popover.Content>
      </Popover>,
    );

    expect(driver.isTargetElementExists()).toBe(true);
    expect(driver.isContentElementExists()).toBe(true);

    driver.click();
    expect(onClickFn).toHaveBeenCalledTimes(1);
  });

  it('should click on a button inside content', () => {
    const _Popover = ({ onClick }) => {
      const [shown, setShown] = useState(false);
      return (
        <Popover
          shown={shown}
          onMouseEnter={() => setShown(true)}
          onMouseLeave={() => setShown(false)}
        >
          <Popover.Element>I am the trigger!</Popover.Element>
          <Popover.Content>
            <Button dataHook="test-button" onClick={onClick}>
              test
            </Button>
          </Popover.Content>
        </Popover>
      );
    };
    const _onClick = jest.fn();
    const driver = createDriver(<_Popover onClick={_onClick} />);
    driver.mouseEnter();
    expect(driver.isContentElementExists()).toBe(true);
    const buttonDriver = buttonTestkitFactory({
      element: driver.getContentElement(),
      dataHook: 'test-button',
    });
    expect(buttonDriver.exists()).toBe(true);
    buttonDriver.click();
    expect(_onClick).toBeCalled();
  });

  describe('propTypes validation', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest
        .spyOn(global.console, 'error')
        .mockImplementation(jest.fn());
    });

    it('should throw a PropType error when not provided with Popover.Element', () => {
      createDriver(
        <Popover>
          <Popover.Content>I am the content!</Popover.Content>
        </Popover>,
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Warning: Failed prop type: Invalid children provided, <Popover.Element/> must be provided',
        ),
      );
    });

    it('should throw a PropType error when not provided with Popover.Content', () => {
      createDriver(
        <Popover>
          <Popover.Element>I am the Element!</Popover.Element>
        </Popover>,
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Warning: Failed prop type: Invalid children provided, <Popover.Content/> must be provided',
        ),
      );
    });

    it('should throw a PropType error when provided with unknown child', () => {
      createDriver(
        <Popover>
          <Popover.Element>I am the Element!</Popover.Element>
          <Popover.Content>I am the content!</Popover.Content>
          <div>Who am I? What am I?</div>
        </Popover>,
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Warning: Failed prop type: Invalid children provided, unknown child <div/> supplied',
        ),
      );
    });
  });
});
