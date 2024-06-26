import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function DropDownComponent({ dropDownTitle, dropDownElements, selectedKey, onSelectionChange }: { dropDownTitle: string, dropDownElements: string[], selectedKey: string, onSelectionChange: Function }) {
    const selectedValue = selectedKey || dropDownTitle;

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
                    selectedKeys={new Set([selectedKey])}
                    onSelectionChange={(keys) => onSelectionChange(Array.from(keys)[0])}
                >
                    {dropDownElements.map((item: any) => (
                        <DropdownItem key={item}>{item}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
