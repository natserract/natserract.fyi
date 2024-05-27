import Link from "next/link";
import { Virtuoso } from "react-virtuoso";
import { forwardRef, memo, useCallback, useMemo, useState } from "react";

import { NotesType } from "../../pages/notes";
import { filterOptions } from "./filter";
import { useDebounce } from "./hooks";

const defaultFilterOptions = filterOptions();

export const Notes = ({ data }: { data: NotesType[] }) => {
  const [search, setInputSearch] = useState("");
  const searchDebounced = useDebounce(search);

  const handleSearch = useCallback(
    (value: string) => setInputSearch(value),
    [],
  );

  const notes = useMemo(() => {
    if (searchDebounced.length > 1) {
      const options = defaultFilterOptions(data, {
        inputValue: searchDebounced,
      });

      return options;
    }

    return data;
  }, [searchDebounced, data]);

  const sortedNotesByDate = useMemo(() => {
    return notes.slice().sort((a, b) => {
      const [left, right] = [
        new Date(a.node.date).getTime(),
        new Date(b.node.date).getTime(),
      ];
      return right - left;
    });
  }, [notes]);

  return (
    <div className="min-h-screen">
      <h3 className="text-2xl font-bold mb-5 border-b border-gray-250 font-eb-garamond">
        Shared Notes
      </h3>

      <div className="gap-10">
        <div className="mb-5">
          <input
            type="search"
            placeholder="Search"
            className="border border-gray-400 w-full p-2"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <Virtuoso
          data={sortedNotesByDate}
          className="min-h-screen"
          components={{
            List: forwardRef((props, ref) => {
              return (
                <ul
                  //@ts-expect-error Ref always HTMLDivElement
                  ref={ref}
                  className="list-disc ml-5"
                  {...props}
                />
              );
            }),
          }}
          itemContent={(_, note) => <InnerNote {...note} />}
        />
      </div>
    </div>
  );
};

const InnerNote: React.FC<NotesType> = memo(({ node }) => {
  return (
    <li>
      <Link
        href={`/notes/` + node._sys.filename}
        className="group block transition-all duration-150 ease-out"
      >
        <h2
          className={`text-sail-500 dark:text-white font-semibold title-font transition-all hover:underline duration-150 ease-out`}
        >
          {node?.title}
        </h2>
      </Link>
    </li>
  );
});