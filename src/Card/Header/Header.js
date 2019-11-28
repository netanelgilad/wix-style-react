import React from 'react';
import PropTypes, { bool, node } from 'prop-types';
import { Animator } from 'wix-animations';

import Divider from '../Divider';
import styles from './Header.scss';
import Heading from '../../Heading';
import Text from '../../Text';

const isString = a => typeof a === 'string';

class Header extends React.PureComponent {
  static displayName = 'Card.Header';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests */
    dataHook: PropTypes.string,

    /** required card title */
    title: node.isRequired,

    /** any string to be rendered below title */
    subtitle: node,

    suffix: node,

    /** define whether header border on the bottom is visible
     * deprecated! use <Card.Divider/> instead
     * @deprecated
     * */
    withoutDivider: bool,
  };

  static defaultProps = {
    subtitle: null,
    suffix: null,
    withoutDivider: false,
  };

  render() {
    const { dataHook, title, subtitle, withoutDivider, suffix } = this.props;

    return (
      <div data-hook={dataHook}>
        <div className={styles.wrapper}>
          <div className={styles.titleWrapper}>
            {isString(title) ? (
              <Heading dataHook="title" appearance="H3" children={title} />
            ) : (
              <span data-hook="title">{title}</span>
            )}

            {subtitle && isString(subtitle) ? (
              <Text dataHook="subtitle" children={subtitle} secondary />
            ) : (
              <span data-hook="subtitle">{subtitle}</span>
            )}
          </div>

          {suffix && (
            <div
              data-hook="suffix"
              className={styles.suffix}
              children={suffix}
            />
          )}
        </div>

        <Animator opacity timing="medium" show={!withoutDivider}>
          <Divider />
        </Animator>
      </div>
    );
  }
}

export default Header;
