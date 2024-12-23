import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react'
import { LuSearchX } from 'react-icons/lu';

const SearchInput = ({ name, placeholder, onChange, defaultValue = '' }) => {
    const [searchedTerm, setSearchedTerm] = useState(defaultValue)
    const [search, setSearch] = useState(defaultValue)

    const handleSearchChange = (value) => {

        onChange(name, value)
        setSearchedTerm(value)
    }
    const handleCleare = () => {
        onChange(name, '')
        setSearchedTerm('')
        setSearch('')

    }
    return (
        <label
            className="[&:has(:focus-visible)]:ring-ring ring-white rounded-md flex items-center p-0 [&:has(:focus-visible)]:ring-1 bg-tertiary-dark-light"
        >
            <Input
                placeholder={placeholder}
                value={search}
                onChange={(e) => {
                    if (searchedTerm.length === 0) {
                        setSearch(e.target.value)
                    }
                }}
                onKeyPress={(e) => {

                    if (e.key === 'Enter') {
                        e.preventDefault()
                        handleSearchChange(e.target.value)
                    }
                }}

                className="size-full   ml-2  bg-transparent focus:outline-none no-focus border-none"

            />
            <div className="flex-center bg-primary-dark-light rounded-e-md p-2">
                {
                    !searchedTerm.length ? (

                        <SearchIcon
                            onClick={() => handleSearchChange(search)}
                            className="size-6 cursor-pointer" />
                    ) : (

                        <LuSearchX
                            onClick={handleCleare}
                            className="size-6 text-red-500 cursor-pointer" />
                    )
                }
            </div>
        </label>
    );
};

export default SearchInput