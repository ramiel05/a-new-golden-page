import { useState, type Dispatch } from "react";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";

interface Tag {
  id: number;
  name: string;
}

const tags: Tag[] = [
  { id: 1, name: "blog" },
  { id: 2, name: "react" },
  { id: 3, name: "guide" },
  { id: 4, name: "remix" },
  { id: 5, name: "life" },
];

export default function TagFilter() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [query, setQuery] = useState("");
  const unselectedTags = Array.from(new Set(tags).difference(new Set(selectedTags)));

  const filteredTags =
    query === ""
      ? unselectedTags
      : unselectedTags.filter((tag) => {
          return tag.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedTags} onChange={setSelectedTags} multiple>
      <div className="space-y-3">
        <TagsPillBox selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <ComboboxInput
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tags..."
          // TODO support light and dark mode, with theme classes
          className="w-full p-2 border-2 rounded-sm border-orange-100"
        />
        <ComboboxOptions className="w-full p-2 border-2 rounded-sm border-orange-100">
          {filteredTags.map((tag) => (
            <ComboboxOption key={tag.id} value={tag}>
              {({ focus }) => (
                <li className={`${focus ? "bg-blue-500 text-white" : "bg-white text-black"}`}>{tag.name}</li>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}

interface TagsPillBoxProps {
  selectedTags: Tag[];
  setSelectedTags: Dispatch<React.SetStateAction<Tag[]>>;
}

// TODO reserved space for pills to avoid jumping
// TODO floating options to avoid jumping
function TagsPillBox({ selectedTags, setSelectedTags }: TagsPillBoxProps) {
  return (
    <div className="flex justify-between">
      {selectedTags.length > 0 && (
        <>
          <ul className="flex space-x-2">
            {selectedTags.map((tag) => (
              <li key={tag.id} className="-zag-text -zag-bg zag-transition px-2 py-1 text-sm font-semibold">
                {tag.name}
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => setSelectedTags([])} className="cursor-pointer">
            clear
          </button>
        </>
      )}
    </div>
  );
}
