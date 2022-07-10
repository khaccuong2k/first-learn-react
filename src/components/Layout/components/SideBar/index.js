import routesConfig from "~/configs/routes";
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss'
import MenuItem from './Menu/MenuItem.js';
import Menu from './Menu';

const cx = classNames.bind(styles);

function SideBar() {
  return <aside className={cx("wrapper")}>
    <Menu>
      <MenuItem title="For Your" to={routesConfig.root} icon={null}></MenuItem>
      <MenuItem title="Following" to={routesConfig.following} icon={null}></MenuItem>
      <MenuItem title="LIVE" to={routesConfig.live} icon={null}></MenuItem>
    </Menu>
  </aside>;
}

export default SideBar;
