import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { categoryMap } from "@/utils/constants";

const Selection: React.FC<{ setCatSlug: Dispatch<SetStateAction<string>> }> = ({
  setCatSlug,
}) => (
  <Select onValueChange={setCatSlug}>
    <SelectTrigger className="max-w-[380px]">
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {Object.entries(categoryMap).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default Selection;
