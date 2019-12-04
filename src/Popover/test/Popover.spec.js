import React, { useState } from 'react';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import { buttonTestkitFactory } from '../../../testkit/index';

import Popover from '../Popover';
import Button from '../../Button/Button';
import popoverDriverFactory from '../Popover.driver';

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

  it('should click on a button inside content', async () => {
    const PopoverExample = ({ onClick }) => {
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
    const driver = createDriver(<PopoverExample onClick={_onClick} />);
    await driver.mouseEnter();

    expect(driver.isContentElementExists()).toBe(true);

    const buttonDriver = buttonTestkitFactory({
      wrapper: driver.getContentElement(),
      dataHook: 'test-button',
    });

    expect(await buttonDriver.exists()).toBe(true);

    await buttonDriver.click();

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
