import React from 'react'

const SearchBar = ({ value,onChange,handleSearch, onClearSearch}) => {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md'>
        <input
  type="text"
  placeholder="Search"
  className="w-full text-xs bg-transparent py-[11px] border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent"
  value={value}
  onChange={onChange}
/>

    </div>
  )
}

export default SearchBar