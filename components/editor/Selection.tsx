import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Selection = ({
  setCatSlug,
}: {
  setCatSlug: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <Select onValueChange={setCatSlug}>
        <SelectTrigger className="max-w-[380px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="web-development">Web Development</SelectItem>
            <SelectItem value="frontend-development">
              Frontend development
            </SelectItem>
            <SelectItem value="backend-development">
              Backend development
            </SelectItem>
            <SelectItem value="desktop-application-development">
              desktop-application-development
            </SelectItem>
            <SelectItem value="mobile-app-development">
              Mobile app development
            </SelectItem>
            <SelectItem value="cloud-computing">Cloud computing</SelectItem>
            <SelectItem value="application-development">
              Application development
            </SelectItem>
            <SelectItem value="full-stack-development">
              Full stack development
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default Selection;
