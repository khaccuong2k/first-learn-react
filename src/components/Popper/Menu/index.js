import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";

import MenuItem from './MenuItem';
import styles from "./Menu.module.scss";
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from "./Header";
import { useState } from "react";

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {

  const [history, setHistory] = useState([{ data: items }]);

  const current = history[history.length - 1];

  const renderMenuItem = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return <MenuItem key={index} data={item} onClick={() => {
        if (isParent) {
          setHistory(prev => [...prev, item.children])
        } else {
          onChange(item)
        }
      }} />
  });
  }

  return (
    <Tippy
      // visible
      interactive
      delay={[0, 500]}
      placement='bottom-end'
      hideOnClick={hideOnClick}
      render={(attrs) => (
        <div className={cx("content")} tabIndex='-1' {...attrs}>
          <PopperWrapper className={cx('menu-popper')}>
            {history.length > 1 && <Header title="Language" onBack={() => {
              setHistory(prev => prev.slice(0, prev.length - 1))
            }} />}
            {renderMenuItem()}
          </PopperWrapper>
        </div>
      )}
      onHide={() => setHistory(prev => prev.slice(0, 1))}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
