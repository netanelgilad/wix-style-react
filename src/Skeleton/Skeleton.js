import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Skeleton.scss';

/**
 * Skeleton is a “placeholder” component.
 * Used for filling up screen usually for when some async operation is ongoing.
 */
class Skeleton extends React.PureComponent {
  render() {
    const { dataHook, content, alignment, spacing, className } = this.props;
    return (
      <div data-hook={dataHook} className={className}>
        {content.map((item, key) => (
          <div
            key={key}
            data-hook="placeholder-line"
            className={classnames(styles.placeholderLine, styles[spacing], {
              [styles.middle]: alignment === 'middle',
            })}
          >
            <div
              data-hook="placeholder-chunk"
              className={classnames(styles.chunk, styles[item.size])}
            />
          </div>
        ))}
      </div>
    );
  }
}

Skeleton.displayName = 'Skeleton';

Skeleton.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** The type of the skeleton */
  content: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['line']).isRequired,
      size: PropTypes.oneOf(['small', 'medium', 'large', 'full']).isRequired,
    }),
  ).isRequired,

  /** The position of the indicating progress line */
  alignment: PropTypes.oneOf(['start', 'middle']),

  /** The space between the first and second lines */
  spacing: PropTypes.oneOf(['small', 'medium', 'large']),

  /** A single CSS class name to be appended to the root element. */
  className: PropTypes.string,
};

Skeleton.defaultProps = {
  alignment: 'start',
  spacing: 'medium',
  content: [{ type: 'line', size: 'small' }],
};

export default Skeleton;
