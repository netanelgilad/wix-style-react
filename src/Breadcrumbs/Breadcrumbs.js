import React from 'react';
import {
  arrayOf,
  func,
  oneOf,
  oneOfType,
  node,
  number,
  shape,
  string,
  any,
  bool,
} from 'prop-types';
import styles from './Breadcrumbs.scss';
import classnames from 'classnames';
import Text from '../Text';
import BreadcrumbsChevronRight from 'wix-ui-icons-common/system/BreadcrumbsChevronRight';
import { DATA_HOOKS, DATA_ACTIVE, DATA_POSITION_ID } from './constnats';

/**
 * a way to visualise current navigation path
 */
class Breadcrumbs extends React.PureComponent {
  static displayName = 'Breadcrumbs';

  static propTypes = {
    /**
     * * __id__ - Specifies the item id
     * * __link__ - Optional link to be called on click
     * * __value__ - Value to be shown on breadcrumb
     * * __disabled__ - if this value is disabled
     * * __customElement__ - A custom item which will be rendered
     */
    items: arrayOf(
      shape({
        id: oneOfType([string, number]).isRequired,
        value: node.isRequired,
        link: string,
        customElement: any,
        disabled: bool,
      }),
    ).isRequired,
    onClick: func,
    activeId: oneOfType([string, number]),
    size: oneOf(['medium', 'large']),
    theme: oneOf(['onWhiteBackground', 'onGrayBackground', 'onDarkBackground']),
    /** Applied as data-hook HTML attribute that can be used to create driver in testing */
    dataHook: string,
  };

  static defaultProps = {
    size: 'medium',
    theme: 'onGrayBackground',
    onClick: () => {},
  };

  getTextAppearance(isActive) {
    const { theme, size } = this.props;

    const isDarkBackground = theme === 'onDarkBackground';
    const isSmallSize = size === 'medium';

    return {
      weight: isActive ? 'normal' : 'thin',
      light: isDarkBackground,
      size: isSmallSize ? 'small' : 'medium',
    };
  }

  createItem({ item, isActive, onClick, className, id }) {
    const breadcrumbText = value => (
      <Text
        dataHook={DATA_HOOKS.BREADCRUMBS_ITEM}
        {...this.getTextAppearance(isActive)}
      >
        {value}
      </Text>
    );

    const defaultBreadcrumb = id => (
      <button
        type="button"
        data-hook={`${DATA_HOOKS.BREADCRUMB_CLICKABLE}-${id}`}
        className={classnames(styles.item, styles.button, className, {
          [styles.disabled]: item.disabled,
          [styles.active]: isActive,
        })}
        onClick={onClick}
        children={breadcrumbText(item.value)}
      />
    );

    const linkBreadcrumb = id => (
      <a
        href={item.link}
        data-hook={`${DATA_HOOKS.BREADCRUMB_CLICKABLE}-${id}`}
        className={classnames(styles.item, styles.link, className, {
          [styles.disabled]: item.disabled,
          [styles.active]: isActive,
        })}
        onClick={onClick}
        children={breadcrumbText(item.value)}
      />
    );

    const customBreadcrumb = id => (
      <span
        data-hook={`${DATA_HOOKS.BREADCRUMB_CLICKABLE}-${id}`}
        className={classnames(styles.item, className)}
        onClick={onClick}
        children={breadcrumbText(item.customElement)}
      />
    );

    if (isActive) {
      return defaultBreadcrumb(id);
    } else if (item.customElement) {
      return customBreadcrumb(id);
    } else if (item.link) {
      return linkBreadcrumb(id);
    } else {
      return defaultBreadcrumb(id);
    }
  }

  _getIsActive = item => this.props.activeId === item.id;

  _handleItemClick = item => () => !item.disabled && this.props.onClick(item);

  _getItemWrapperDataAttributes = ({ position, item }) => {
    return {
      'data-hook': `${DATA_HOOKS.ITEM_WRAPPER}-${position}`,
      [DATA_ACTIVE]: this._getIsActive(item),
      [DATA_POSITION_ID]: position,
    };
  };

  render() {
    const { items, size, theme, dataHook } = this.props;

    return (
      <div
        data-hook={dataHook}
        className={classnames(styles[size], styles[theme])}
      >
        {items.map((item, i, allItems) => (
          <div
            key={item.id}
            className={classnames(styles.itemContainer, {
              [styles.active]: this._getIsActive(item),
            })}
            {...this._getItemWrapperDataAttributes({ position: i, item })}
          >
            {this.createItem({
              id: i,
              item,
              isActive: this._getIsActive(item),
              onClick: this._handleItemClick(item),
              className:
                i === 0 && allItems.length === 1 ? styles.itemFullWidth : '',
            })}

            {allItems[i + 1] && (
              <BreadcrumbsChevronRight className={styles.divider} />
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default Breadcrumbs;
