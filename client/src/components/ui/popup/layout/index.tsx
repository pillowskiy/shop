import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './styles.module.css';
import { IModalLayoutParams } from '../types';
import { ANIMATIONS, ANIMATION_TIME_MS } from './constants';

const { overlay, content } = ANIMATIONS;

const Layout: FC<PropsWithChildren<IModalLayoutParams>> = ({
  onClose,
  children,
  active,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [animationIn, setAnimationIn] = useState(false);
  useEffect(() => setAnimationIn(active), [active]);

  return (
    <div ref={overlayRef} className={styles.overlay} onClick={onClose}>
      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={ANIMATION_TIME_MS}
        mountOnEnter
        unmountOnExit
        classNames={overlay}
      >
        <div
          ref={contentRef}
          className={styles.container}
          onClick={(e) => e.stopPropagation()}
        >
          <CSSTransition
            in={animationIn}
            nodeRef={contentRef}
            timeout={ANIMATION_TIME_MS}
            mountOnEnter
            unmountOnExit
            classNames={content}
          >
            <div className={styles.content}>{children}</div>
          </CSSTransition>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Layout;
