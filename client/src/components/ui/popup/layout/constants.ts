import animationStyles from './animation.module.css';

export const ANIMATION_TIME_MS = 400;

export const ANIMATIONS: Record<
  string,
  {
    enter: string;
    enterActive: string;
    exit: string;
    exitActive: string;
  }
> = {
  overlay: {
    enter: animationStyles.overlayEnter,
    enterActive: animationStyles.overlayEnterActive,
    exit: animationStyles.overlayExit,
    exitActive: animationStyles.overlayExitActive,
  },
  content: {
    enter: animationStyles.contentEnter,
    enterActive: animationStyles.contentEnterActive,
    exit: animationStyles.contentExit,
    exitActive: animationStyles.contentExitActive,
  },
};