"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import SpinnerLoader from "../loaders/SpinnerLoader";

const DeletePost = ({ id, authCheck }: { id: string; authCheck: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data } = useSession();

  const deleteProject = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const CHECK_USER_AUTHORITY = data?.user?.email === authCheck;

  return (
    <>
      {CHECK_USER_AUTHORITY ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="mb-3">
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this post.
              </DialogTitle>
              <DialogDescription>
                Projects once deleted can not be recovered if you you want to
                continue click delete else click cancel
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <Button onClick={() => deleteProject(id)}>
                {loading ? <SpinnerLoader dark={false} /> : "Delete"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
};

export default DeletePost;
