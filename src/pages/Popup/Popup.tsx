import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import './Popup.scss';
import '../../styles.scss';
import { Button, Icon, Searchbar } from '../../components';
import { LANGUAGE_CODES } from '../../constant';
import { Utils } from '../../utils';

import { RootState } from '../../redux/types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { loadLanguage, redirect, toggleLanguage } from '../../redux/actions';

const Popup = () => {
  // global state
  const { translateTerm, language } = useSelector(
    (state: RootState) => state.popup,
    shallowEqual
  );

  const dispatch = useDispatch();

  // local state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadLanguage(dispatch);
  }, []);

  return (
    <div className="dodoCornerPopup">
      <div className="dodoNavBar">
        <Searchbar
          defaultTerm={translateTerm.current || ''}
          onSearch={(text) => redirect(dispatch, text)}
          showAutocomplete={true}
        ></Searchbar>
        <Button
          variant="invisible"
          size="normal"
          onClick={() => toggleLanguage(dispatch, language)}
          accessories={
            language === LANGUAGE_CODES.VIETNAMESE ? (
              <Icon src={chrome.runtime.getURL('vietnam.svg')} />
            ) : (
              <Icon src={chrome.runtime.getURL('usa.svg')} />
            )
          }
        />
      </div>
      {isLoading ? (
        <Icon
          className="dodoSpinningIcon"
          src={chrome.runtime.getURL('spinner-solid.svg')}
        />
      ) : (
        <div>Content</div>
      )}
    </div>
  );
};

export default memo(Popup);
