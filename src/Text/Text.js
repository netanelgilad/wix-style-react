import React from 'react';
import { oneOf, bool, string, any } from 'prop-types';
import classNames from 'classnames';
import ellipsisHOC from '../common/EllipsisHOC';
import style from './Text.st.css';

// NOTE: It's not possible to load assets from modules in Stylable right now,
// using Sass with css-loader as a workaround.
import sassStyle from './Text.scss';

/*
 * Temporary fix: SIZES, SKINS, WEIGHTS constants are copied here from constants.js
 * in order to have AutoDocs able to parse them.
 * See this issue: https://github.com/wix/wix-ui/issues/784
 */
export const SIZES = {
  tiny: 'tiny',
  small: 'small',
  medium: 'medium',
};

export const SKINS = {
  standard: 'standard',
  error: 'error',
  success: 'success',
  premium: 'premium',
  disabled: 'disabled',
};

export const WEIGHTS = {
  thin: 'thin',
  normal: 'normal',
  bold: 'bold',
};

const Text = ({
  size,
  secondary,
  skin,
  light,
  weight,
  tagName,
  children,
  ...rest
}) => {
  /* eslint-disable no-unused-vars */
  const { dataHook, ...textProps } = rest;
  const stylableProps = style(
    'root',
    {
      size,
      secondary,
      skin,
      light,
      weight,
    },
    rest,
  );

  const className = classNames(
    stylableProps.className,
    sassStyle.root,
    sassStyle[size],
  );

  return React.createElement(
    tagName,
    {
      ...textProps,
      'data-hook': dataHook,
      ...stylableProps,
      className,
    },
    children,
  );
};

Text.displayName = 'Text';

Text.propTypes = {
  dataHook: string,
  /** tag name that will be rendered */
  tagName: string,

  /** class to be applied to the root element */
  className: string,

  /** font size of the text */
  size: oneOf(Object.keys(SIZES)),

  /** any nodes to be rendered (usually text nodes) */
  children: any,

  /** is the text type is secondary. Affects the font color */
  secondary: bool,

  /** skin color of the text */
  skin: oneOf(Object.keys(SKINS)),

  /** make the text color lighter */
  light: bool,

  /** font weight of the text */
  weight: oneOf(Object.keys(WEIGHTS)),

  ...ellipsisHOC.propTypes,
};

Text.defaultProps = {
  size: SIZES.medium,
  secondary: false,
  skin: SKINS.standard,
  light: false,
  weight: WEIGHTS.thin,
  tagName: 'span',
};

export default ellipsisHOC(Text);
