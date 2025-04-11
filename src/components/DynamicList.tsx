import { useState } from "react";
import { get } from "radash";
import TagFilter from "./TagFilter.tsx";

// TODO try make type safe with https://chatgpt.com/share/67f89e9e-fc78-8004-8033-dce165447358. if works, make a gist out of it.

// TODO try get rid of the anys
interface DynamicListProps<T extends Record<string, any>> {
  items: T[];
  /* The name of the field to filter on, at the moment only implementation uses "tags" */
  field: string;
  /* cannot use a render prop because that would require a parent astro
  component to use JSX as value for this prop, which it cannot support.
  Instead we must pass the function itself and then render that as JSX within
  here

  e.g. of original attempt with a render prop:
  renderItem: (item: T) => ReactNode;
  */
  ItemComponent: React.ComponentType<{ item: T }>;
}

interface Tag {
  id: number;
  name: string;
}

// FIXME: some of the naming and implementation here is specific to tags even though should be dynamic to filter on any field.
export default function DynamicList<T extends Record<string, any>>({
  items,
  field,
  ItemComponent,
}: DynamicListProps<T>) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const filteredItems = items.filter((item) => {
    return selectedTags.length === 0
      ? items
      : Array.from(
          new Set(get(item, field) as any[]).intersection(new Set(selectedTags.map((selectedTag) => selectedTag.name))),
        ).length > 0;
  });

  return (
    <div className="space-y-8">
      <TagFilter selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <ul className="space-y-10">
        {filteredItems.map((filteredItem, i) => (
          <ItemComponent key={i} item={filteredItem} />
        ))}
      </ul>
    </div>
  );
}
