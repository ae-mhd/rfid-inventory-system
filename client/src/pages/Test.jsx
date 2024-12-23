import { CustomAutocomplete } from "@/components"
import * as Popover from "@radix-ui/react-popover";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Test = () => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const [inputWidth, setInputWidth] = useState(0);
    const options = ["Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Oran", "Algiers"]; // Add more options as needed

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
    );

    const frameworks = [
        {
            value: "next.js",
            label: "Next.js",
        },
        {
            value: "sveltekit",
            label: "SvelteKit",
        },
        {
            value: "nuxt.js",
            label: "Nuxt.js",
        },
        {
            value: "remix",
            label: "Remix",
        },
        {
            value: "astro",
            label: "Astro",
        },
    ]

    useEffect(() => {
        // Set the input width whenever the component renders
        if (inputRef.current) {
            setInputWidth(inputRef.current.offsetWidth);
        }
    }, [inputRef.current, query]); // Recalculate on query change in case input size changes

    return (
        <>
            <h2 className='h2-bold text-primary-dark-light '>Test</h2>
            <CustomAutocomplete
                items={frameworks}
                onChange={(v) => console.log(v)}
                label='إختر مكتبة'
            />
            <div className="relative ">
                <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
                    <Popover.Trigger asChild>
                        <div className="relative w-full bg-orange-300">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="ابحث عن الولاية ..."
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setIsOpen(true);
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => setIsOpen(true)}
                            />
                            <ChevronDownIcon className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
                        </div>
                    </Popover.Trigger>
                    <Popover.Content
                        align="start"
                        className="bg-white shadow-md rounded mt-2 max-h-60 overflow-y-auto"
                        style={{ width: inputWidth }} // Set the width dynamically
                    >
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setQuery(option);
                                        setIsOpen(false);
                                    }}
                                >
                                    {option}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-500">No results found</div>
                        )}
                    </Popover.Content>
                </Popover.Root>
            </div>

        </>
    )
}

export default Test