import { Fragment, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faCircleXmark,
  faCloudUpload,
  faCoins,
  faEarthAsia,
  faEllipsisVertical,
  faKeyboard,
  faMagnifyingGlass,
  faQuestionCircle,
  faSignOut,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import TippyHeadLess from "@tippyjs/react/headless";
import 'tippy.js/dist/tippy.css';

import Button from "~/components/Button";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import styles from "./Header.module.scss";
import images from "~/assets/images";
import AccountItem from "~/components/AccountItem";
import Menu from "~/components/Popper/Menu";
import { Upload } from "~/components/Icons";
import Image from "~/components/Image";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "Endlish",
    children: {
      title: "Language",
      data: [
        { type: "language", code: "en", title: "English" },
        { type: "language", code: "vi", title: "Tieng Viet" },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
    title: "Feedback and help",
    to: "/feedback",
  },
  { icon: <FontAwesomeIcon icon={faKeyboard} />, title: "Keyboard shortcuts" },
];

function Header() {
  const [searchResult, setSearchResult] = useState([]);

  const handleMenuChange = (menuItem) => {
  };

  const current_user = true;

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([]);
    }, 0);
  }, []);

  const userMenu = [
    { icon: <FontAwesomeIcon icon={faUser} />, title: "View profile", to: "/profile" },
    { icon: <FontAwesomeIcon icon={faCircleQuestion} />, title: "Get coins", to: "/get-coin" },
    { icon: <FontAwesomeIcon icon={faCoins} />, title: "Settings", to: "/settings" },
    ...MENU_ITEMS,
    { icon: <FontAwesomeIcon icon={faSignOut} />, title: "Logout", to: "/logout" },
  ]

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Button href='/upload'>ahihi</Button>
        <img src={images.logo} alt='Tiktok' />
        <TippyHeadLess
          interactive
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex='-1' {...attrs}>
              <PopperWrapper>
                <h4 className={cx("search-title")}>Accounts</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx("search")}>
            <input
              placeholder='Search accounts and videos'
              spellCheck={false}
            />

            <button className={cx("clear-btn")}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />

            <button className={cx("search-btn")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </TippyHeadLess>

        <div className={cx("action")}>
          {current_user ? (
            <Fragment>
              <Tippy delay={200} content="Upload video" placement="bottom">
                <button className={cx("action-btn")}>
                  <Upload></Upload>
                </button>
              </Tippy>
            </Fragment>
          ) : (
            <Fragment>
              <Button text>Upload</Button>
              <Button primary rounded>
                Log in
              </Button>
            </Fragment>
          )}
          <Menu items={current_user ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {current_user ? (
              <Image
                className={cx("user-avatar")}
                src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/97c273f9d2a0ad0835605eec7ff86c7c~c5_100x100.jpeg?x-expires=1655985600&x-signature=bAbH2EJyd%2FZKlpZCJKwQqIF72og%3D'
                alt='Ahihi nhoaaaa'
              />
            ) : (
              <button className={cx("more-btn")}>
                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
