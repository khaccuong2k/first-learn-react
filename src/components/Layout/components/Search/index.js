import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import TippyHeadLess from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import styles from "./Search.module.scss";
import AccountItem from "~/components/AccountItem";
import { useDebounce } from "~/hooks";
import * as searchService from "~/apiServices/searchService";

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const debounce = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounce.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);
      const result = await searchService.search(debounce);
      setSearchResult(result);
      setLoading(false);
    }

    fetchApi();

  }, [debounce]);

  return (
    <div>
      <TippyHeadLess
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex='-1' {...attrs}>
            <PopperWrapper>
              <h4 className={cx("search-title")}>Accounts</h4>
              {searchResult.map(data => (
                <AccountItem key={data.id} data={data} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={() => {
          setShowResult(false);
        }}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder='Search accounts and videos'
            spellCheck={false}
            onChange={(e) => {
              const searchValue = e.target.value;
              if (searchValue.startsWith(" ")) {
                return;
              }
              setSearchValue(searchValue)
            }}
            onFocus={(e) => setShowResult(true)}
          />
  
          {!!searchValue && !loading && (
            <button
              className={cx("clear-btn")}
              onClick={() => {
                setSearchValue("");
                inputRef.current.focus();
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}
  
          <button className={cx("search-btn")} onMouseDown={e => e.preventDefault()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </TippyHeadLess>
    </div>
  );
}

export default Search;
