import type { Word } from "~/lib/types";
import { db } from "./db";
import { CacheKeys, DURATION, getCache, setCache } from "~/lib/cache";
import { put } from "@vercel/blob";
import { env } from "~/env";

export async function setDictionaryCache(): Promise<{
  data: Array<Word> | null;
  status: "SUCCESS" | "NOT_ACTIVE" | "NO_WORDS" | "ERROR";
  error?: unknown;
}> {
  try {
    const dbData = await db.snapshot.findFirst({
      select: {
        source: true,
        columns: {
          select: {
            name: true,
            displayName: true,
            required: true,
          },
        },
      },
      where: {
        status: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (dbData === null) {
      return Promise.reject(new Error("NOT_ACTIVE"));
    } else {
      const data = (await db.word.findMany()) as Array<Word>;
      if (data.length > 0) {
        // set cache data for 7 days
        setCache(CacheKeys.VOCABULARY_DATA, data, DURATION);

        return Promise.resolve({
          status: "SUCCESS",
          data: data,
        });
      } else {
        return Promise.reject(new Error("NO_WORDS"));
      }
    }
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(String(err)));
  }
}

export async function getDictionaryCache(): Promise<Array<Word> | null> {
  const cachedData = getCache<Array<Word>>(CacheKeys.VOCABULARY_DATA);
  if (cachedData) {
    return Promise.resolve(cachedData);
  } else {
    return setDictionaryCache()
      .then((res) => {
        if (res.status === "SUCCESS") {
          return res.data;
        } else {
          return null;
        }
      })
      .catch(() => {
        return null;
      });
  }
}

export function getUniqueNumber(arr: Array<number>, max: number): number {
  while (true) {
    const num = Math.floor(Math.random() * max);
    if (!arr.includes(num)) {
      return num;
    }
  }
}

export async function uploadFileToServer(
  file: File,
  path: string,
): Promise<{ status: number; statusText: string; url: string | null }> {
  try {
    // HACK: code to upload to vercel blob storage
    // const blob = await put(path, file, {
    //   access: "public",
    //   // addRandomSuffix: true,
    //   token: env.BLOB_READ_WRITE_TOKEN,
    // });

    // HACK: code to upload to custom file server
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", path);
    formData.append("secret", env.FILE_SERVER_SECRET);

    const res = await fetch(`${env.FILE_SERVER_URL}/api/fs/addfile`, {
      method: "POST",
      body: formData,
    });

    if (res.status === 201) {
      return {
        status: 201,
        statusText: "File uploaded successfully",
        // url: blob.url,
        url: path,
      };
    } else {
      return {
        status: 500,
        statusText: "Failed to upload file",
        url: null,
      };
    }
  } catch {
    return {
      status: 500,
      statusText: "Internal Server Error",
      url: null,
    };
  }
}

export async function getFile(
  path: string,
  fileName: string,
): Promise<File | null> {
  // HACK: code to fetch file from vercel blob storage
  // const res = await fetch(path);

  // HACK: code to fetch file from custom file server
  const res = await fetch(
    `${env.FILE_SERVER_URL}/api/fs/getfile?path=${encodeURIComponent(path)}`,
  );

  if (res.ok) {
    const blob = await res.blob();
    const file = new File([blob], fileName, { type: blob.type });
    return Promise.resolve(file);
  }

  return Promise.reject(new Error("Failed to fetch file"));
}
//   }
// }

// export async function getFile(
//   path: string,
//   fileName: string,
// ): Promise<File | null> {
//   // const res = await fetch(
//   //   `${env.FILE_SERVER_URL}/api/getfile?path=${encodeURIComponent(path)}`,
//   // );
//   const res = await fetch(path);

//   if (res.ok) {
//     const blob = await res.blob();
//     const file = new File([blob], fileName, { type: blob.type });
//     return Promise.resolve(file);
//   }

//   return Promise.reject();
// }
