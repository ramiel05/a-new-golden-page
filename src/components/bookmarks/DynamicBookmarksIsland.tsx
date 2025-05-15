import type { DataEntryMap, Flatten } from "../../types/client-side-content";
import DynamicList from "../DynamicList";
import BookmarkListItem from "./BookmarkListItem";

type DynamicBookmarksIslandProps = {
  // TODO: create a helper type for this, because it is not intuitive looking at it. was derived by file hopping the type astro definitions
  allBookmarks: Flatten<DataEntryMap["bookmarks"]>[];
};

export default function DynamicBookmarksIsland({ allBookmarks }: DynamicBookmarksIslandProps) {
  // TODO now that this is entirely in a react component, i can change back to using renderProps, which i feel is more ergonomic and communicates intent better
  return (
    <DynamicList
      items={allBookmarks.toReversed()}
      field={"data.tags"}
      renderItem={(item, key) => <BookmarkListItem item={item} key={key} />}
    />
  );
}
