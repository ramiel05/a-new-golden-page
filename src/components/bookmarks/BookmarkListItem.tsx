import type { DataEntryMap } from "../../types/client-side-content.tsx";
import Tag from "../Tag.tsx";

type BookmarkListItemProps = {
  // WARNING: i don't actually understand how this type got me what i wanted...
  item: DataEntryMap["bookmarks"][number];
};

export default function BookmarkListItem({ item: bookmark }: BookmarkListItemProps) {
  return (
    <li className="zag-pop zag-text zag-transition flex flex-col gap-3 p-6">
      <a
        href={bookmark.data.url}
        className="text-xl zag-offset underline font-medium flex items-center focus:outline-2 focus:outline-offset-2 focus:outline-zag-dark dark:focus:outline-zag-light"
        target="_blank"
      >
        {bookmark.data.name}
      </a>
      <p className="zag-text zag-transition">{bookmark.data.description}</p>
      <div className="flex flex-row wrap gap-2">
        {bookmark.data.tags.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}
      </div>
    </li>
  );
}
