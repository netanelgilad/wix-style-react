import { modalPreviewLayoutDriverFactory as publicDriverFactory } from '../ModalPreviewLayout.uni.driver';
import { iconButtonDriverFactory } from '../../IconButton/IconButton.uni.driver';
import { dataHooks } from '../constants';

export const modalPreviewLayoutPrivateDriverFactory = base => {
  const rightArrow = base.$(
    `[data-hook="${dataHooks.modalPreviewRightArrow}"]`,
  );
  const leftArrow = base.$(`[data-hook="${dataHooks.modalPreviewLeftArrow}"]`);

  const getContent = () =>
    base.$(`[data-hook="${dataHooks.modalPreviewContent}"]`);

  return {
    ...publicDriverFactory(base),
    clickRightNavigationButton: rightArrow.click,
    clickLeftNavigationButton: leftArrow.click,
    getCurrentChildIndex: async () =>
      Number(await getContent().attr('data-index')),
  };
};
