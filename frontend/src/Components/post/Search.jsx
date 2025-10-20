import React from 'react'

const Search = () => {
  return (
    <div className='space-y-1'>
        <h2>Search</h2>
        <div className='flex gap-1.5'>
            <input className='py-1.5 px-3.5 border outline-none rounded-sm' type="search" />
            <button className='bg-tertiary text-primary active:bg-gray-800 py-1.5 px-3.5'>Search</button>
        </div>
    </div>
  )
}

export default Search