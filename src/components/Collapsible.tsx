import classNames from 'classnames';
import React, {
  memo,
  useState,
  cloneElement,
  ReactElement,
  ReactNode,
} from 'react';
import Button from './Button';
import './Collapsible.scss';
import Icon from './Icon';

interface CollapsibleType {
  title?: ReactNode;
  defaultOpen?: boolean;
  menu: ReactElement[];
  className?: string;
}

const Collapsible = ({
  title,
  defaultOpen,
  menu,
  className,
}: CollapsibleType) => {
  const [open, setOpen] = useState(defaultOpen);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={classNames(className, 'dodoCollapsible')}>
      <Button
        className="dodoTriggerButton"
        variant="invisible"
        size="stretch"
        children={title}
        accessories={
          <Icon
            src={chrome.runtime.getURL(
              open ? 'sort-up-solid.svg' : 'sort-down-solid.svg'
            )}
          />
        }
        onClick={handleOpen}
      />
      {open ? (
        <ul className="dodoMenu">
          {menu.map((menuItem, index) => (
            <li key={index} className="dodoMenuItem">
              {cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default memo(Collapsible);
