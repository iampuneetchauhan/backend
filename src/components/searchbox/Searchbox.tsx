import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
const Searchbox = () => {
  return (
    <div className=' relative'>
      <MagnifyingGlassIcon className='absolute left-3 top-[50%] transform -translate-y-1/2 h-4 w-4 text-gray-500' />
      <input
        name='search'
        type='search'
        placeholder='Search Doc'
        className='pl-10 block w-[100%] rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6'
      />
    </div>
  )
}

export default Searchbox
