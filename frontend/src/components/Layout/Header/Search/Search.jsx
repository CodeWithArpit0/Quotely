import { Search } from "lucide-react";
import InputField from "../../../UI/InputFields/TextInputField/InputField";

export default function NotesSearch({ search, setSearch }) {
  return (
    <InputField
      id="search"
      type="text"
      placeholder="Search here..."
      icon={<Search size="20" />}
      value={search}
      handler={(e) => setSearch(e.target.value)}
    />
  );
}
