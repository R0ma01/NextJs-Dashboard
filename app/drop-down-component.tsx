import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const DropDownComponent = ({ dropDownTitle, dropDownElements, selectedKey, onSelectionChange }) => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([dropDownTitle]));

  React.useEffect(() => {
    setSelectedKeys(new Set([selectedKey]));
  }, [selectedKey]);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={(keys) => {
            setSelectedKeys(keys);
            onSelectionChange(Array.from(keys).join(", "));
          }}
        >
          {dropDownElements.map((item) => (
            <DropdownItem key={item.toLowerCase()}>{item}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropDownComponent;
