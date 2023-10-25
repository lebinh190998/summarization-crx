import classNames from 'classnames';
import React, { memo, useState, cloneElement, ReactElement } from 'react';
import './Dropdown.scss';

interface DropdownType {
  trigger: ReactElement;
  menu: ReactElement[];
  className?: string;
}

const Dropdown = ({ trigger, menu, className }: DropdownType) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={classNames(className, 'dodoDropdown')}>
      {cloneElement(trigger, {
        onClick: handleOpen,
      })}
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

export default memo(Dropdown);
