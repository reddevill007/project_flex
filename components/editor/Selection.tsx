import React, { Dispatch, SetStateAction } from "react";

const Selection = ({
  setCatSlug,
}: {
  setCatSlug: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <select className="text-black" onChange={(e) => setCatSlug(e.target.value)}>
      <option value="web-development">Web Development</option>
      <option value="frontend-development">Frontend development</option>
      <option value="backend-development">Backend development</option>
      <option value="desktop-application-development">
        desktop-application-development
      </option>
      <option value="mobile-app-development">Mobile app development</option>
      <option value="cloud-computing">Cloud computing</option>
      <option value="application-development">Application development</option>
      <option value="full-stack-development">Full stack development</option>
    </select>
  );
};

export default Selection;
