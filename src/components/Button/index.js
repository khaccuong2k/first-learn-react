import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  primary = false,
  outline = false,
  small = false,
  medium = false,
  large = false,
  text = false,
  disabled = false,
  rounded = false,
  icon = false,
  children,
  onClick,
  className,
  ...passProps
}) {
  let Component = "button";

  const props = {
    onClick,
    ...passProps,
  };

  if (disabled) {
    delete props.onClick;
  }

  if (to) {
    props.to = to;
  } else if (href) {
    props.href = href;
    Component = "a";
  }

  const classes = cx("wrapper", {
    [className]: className,
    primary,
    outline,
    small,
    medium,
    large,
    text,
    disabled,
    rounded,
    icon,
  });

  return (
    <Component className={classes} {...props}>
      {icon && <span className={cx('icon')}>{icon}</span>}
      <span className={cx('title')}>{children}</span>
    </Component>
  );
}

export default Button;
