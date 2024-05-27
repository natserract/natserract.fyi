import { NotesType } from "../../pages/notes";
import { useTheme } from "../layout";

export const Notes = ({ data }: { data: NotesType[] }) => {
  const theme = useTheme();

  return <div>{JSON.stringify(data)}</div>;
};
