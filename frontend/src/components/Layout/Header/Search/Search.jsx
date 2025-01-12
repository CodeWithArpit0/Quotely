import { Search } from "lucide-react";
import InputField from "../../../UI/InputFields/TextInputField/InputField";

export default function NotesSearch() {
  return (
    <InputField
      id="firstName"
      type="text"
      placeholder="Search here."
      icon={<Search size="20" />}
    />
  );
}
