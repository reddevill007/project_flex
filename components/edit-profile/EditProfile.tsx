"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const EditProfile = () => {
  const [openEditor, setOpenEditor] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpenEditor(true)}>Edit</Button>
      {openEditor && (
        <div>
          <div className="fixed top-0 left-0 h-screen w-full bg-black text-white">
            <Button onClick={() => setOpenEditor(false)}>Close</Button>
            <div className="flex justify-center items-center flex-col w-[60%] mx-auto gap-10">
              <div className="grid gap-2 w-full">
                <Label htmlFor="github">Github</Label>
                <Input
                  id="github"
                  type="text"
                  placeholder="https://github.com/reddevill007"
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="LinkedIn">LinkedIn</Label>
                <Input
                  id="LinkedIn"
                  type="text"
                  placeholder="https://github.com/reddevill007"
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="dribble">Dribble</Label>
                <Input
                  id="dribble"
                  type="text"
                  placeholder="https://github.com/reddevill007"
                />
              </div>
              <Button className="border">Update</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
