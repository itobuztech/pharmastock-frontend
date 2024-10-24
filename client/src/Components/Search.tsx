import { ChangeEvent, useId, useState } from 'react';
import {
  MantineRadius,
  MantineSize,
  MantineSpacing,
  TextInput,
} from '@mantine/core';
import { BiSearch, BiX } from 'react-icons/bi';

export default function Search({
  onChange,
  placeHolder,
  radius = 'md',
  className,
  marginTop,
  size,
}: {
  readonly onChange: (e: string) => void;
  readonly placeHolder?: string;
  readonly radius?: MantineRadius;
  readonly className?: string;
  readonly marginTop?: MantineSpacing;
  readonly size?: MantineSize;
}) {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    onChange(value);
  };

  const clearInput = () => {
    setSearchValue('');
    onChange('');
  };

  return (
    <div className={`${className && className} w-7/12 lg:w-1/2 xl:w-1/4 rounded-md mb-8`}>
      <TextInput
        value={searchValue}
        radius={radius}

        onChange={handleInputChange}
        rightSectionPointerEvents='all'
        mt={marginTop}
        size={size}
        name={useId()}
        placeholder={placeHolder ?? 'Search ...'}
        leftSection={<BiSearch size={20} />}
        rightSection={
          searchValue ? (
            <BiX
              size={20}
              cursor="pointer"
              onClick={clearInput}
            />
          ) : ""
        }
      />
    </div>
  );
}
