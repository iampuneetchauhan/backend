import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
type dropdownType = {
  props: string[]
  onChange?: (value: string) => void
}
export default function Dropdown ({ props }: dropdownType) {
  const [selectedTab, setSelectedTab] = useState<string>('')
  useEffect(() => {
    if (props.length > 0) {
      if (setSelectedTab) setSelectedTab(props[0])
    }
  }, [props])

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        {props.length > 0 && (
          <MenuButton className='inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50'>
            {selectedTab}
            <ChevronDownIcon
              aria-hidden='true'
              className='-mr-1 size-5 text-gray-400'
            />
          </MenuButton>
        )}
      </div>

      <MenuItems
        transition
        className='absolute right-0 left-1  z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
      >
        <div className='py-1'>
          {props.length > 1 &&
            props.slice(1).map((item, i) => (
              <MenuItem key={i}>
                <p
                  className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dt'
                  onClick={() => setSelectedTab && setSelectedTab(item)}
                >
                  {item}
                </p>
              </MenuItem>
            ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
