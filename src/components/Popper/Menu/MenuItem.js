import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
  return <Button className={cx('menu-items')} href={data.to} icon={data.icon} onClick={onClick}>
    {data.title}
  </Button>;
}

export default MenuItem;
