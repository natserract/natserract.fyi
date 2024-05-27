import { NotesType } from "../../pages/notes";
import { Section } from "../util/section";

export const Note = (props: NotesType) => {
  return <Section className="flex-1">{JSON.stringify(props)}</Section>;
};
