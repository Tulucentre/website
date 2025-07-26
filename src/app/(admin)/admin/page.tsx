"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { fileToBase64 } from "~/lib/utils";
import { api } from "~/trpc/react";
import { signOut, useSession, signIn } from "next-auth/react";

export default function Admin() {
  const [file, setFile] = React.useState<File | null>(null);
  const submitMutation = api.snapshot.addNewSnapshot.useMutation();
  const loadMutation = api.snapshot.loadSnapshot.useMutation();
  const session = useSession();

  return (
    <div>
      <Input
        type="file"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] ?? null;
          setFile(selectedFile);
        }}
      />
      <Button
        onClick={async () => {
          if (file) {
            // handle file submit logic here
            console.log("Submitting file:", file);
            try {
              const fileRes = await fileToBase64(file);

              submitMutation.mutate({
                file: {
                  base64: fileRes,
                  name: file.name,
                  type: file.type,
                },
                name: "name",
                status: true,
                columns: [
                  { name: "d1", displayName: "d 1", required: true },
                  { name: "d2", displayName: "d 2", required: true },
                  { name: "d3", displayName: "d 3", required: true },
                  { name: "d4", displayName: "d 4", required: true },
                  {
                    name: "cf_similar_meaning",
                    displayName: "cf similar meaning",
                    required: true,
                  },
                  {
                    name: "grammatical_form",
                    displayName: "grammatical form",
                    required: true,
                  },
                  {
                    name: "tulu_meaning",
                    displayName: "tulu meaning",
                    required: true,
                  },
                  {
                    name: "kannada_meaning",
                    displayName: "kannada meaning",
                    required: true,
                  },
                  {
                    name: "english_meaning",
                    displayName: "english meaning",
                    required: true,
                  },
                  {
                    name: "usage_sentence",
                    displayName: "usage sentence",
                    required: true,
                  },
                  {
                    name: "usage_tulu",
                    displayName: "usage tulu",
                    required: true,
                  },
                  {
                    name: "usage_kannada",
                    displayName: "usage kannada",
                    required: true,
                  },
                  {
                    name: "usage_english",
                    displayName: "usage english",
                    required: true,
                  },
                ],
              });
            } catch (error) {
              console.log(error);
            }
          }
        }}
        disabled={!file}
      >
        submit
      </Button>
      {session.status === "authenticated" ? (
        <Button
          onClick={async () => {
            await signOut();
          }}
        >
          Log out
        </Button>
      ) : (
        <Button
          onClick={async () => {
            await signIn("google");
          }}
        >
          Signin
        </Button>
      )}

      <Button
        onClick={() => {
          loadMutation.mutate("cmdk2c8kq0006rqnnnlnn2fqz");
        }}
      >
        Load
      </Button>
    </div>
  );
}
