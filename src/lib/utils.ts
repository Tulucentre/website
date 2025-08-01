import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import * as XLSX from "xlsx";
import type { Column, Word } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => {
      if (error instanceof Error) {
        reject(error);
      } else if (typeof error === "object") {
        reject(new Error(JSON.stringify(error)));
      } else {
        reject(new Error(String(error)));
      }
    };
  });
}

export function base64ToFile(
  base64String: string,
  filename: string,
): File | null {
  // Extract content type and base64 data from the data URL
  const match = /^data:([^;]+);base64,(.+)$/.exec(base64String);

  if (!match) {
    throw new Error("Invalid base64 string format");
  }

  const contentType = match[1];
  const base64Data = match[2];

  if (base64Data === undefined || base64Data === null) {
    return null;
  }

  // Convert base64 to binary
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);

  let i = 0;
  for (const char of binaryString) {
    bytes[i++] = char.charCodeAt(0);
  }

  // Create a blob and then a file
  const blob = new Blob([bytes], { type: contentType });
  return new File([blob], filename, { type: contentType });
}

export async function parseXLSX(file: File) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const data: Array<Word> = [];

  workbook.SheetNames.forEach((sheet) => {
    const worksheet = workbook.Sheets[sheet];
    if (worksheet) {
      const temp: Array<Word> = XLSX.utils.sheet_to_json(worksheet);
      data.push(...temp);
    }
  });

  return data;
}

export function dataFilter(data: Array<Word>, count = false) {
  const filterdData = data.map((word) => {
    const currWord = {
      entryId: word.entryId ?? "",
      d1: word.d1 ?? "",
      d2: word.d2 ?? "",
      d3: word.d3 ?? "",
      d4: word.d4 ?? "",
      cf_similar_meaning: word.cf_similar_meaning ?? "",
      grammatical_form: word.grammatical_form ?? "",
      tulu_meaning: word.tulu_meaning ?? "",
      kannada_meaning: word.kannada_meaning ?? "",
      english_meaning: word.english_meaning ?? "",
      usage_sentence: word.usage_sentence ?? "",
      usage_tulu: word.usage_tulu ?? "",
      usage_kannada: word.usage_kannada ?? "",
      usage_english: word.usage_english ?? "",
    } as Word;

    const values = Object.values(currWord);

    for (const value of values) {
      if (value !== "") {
        if (count) {
          currWord.count = 0;
        }
        return currWord;
      }
    }

    return null;
  });

  return filterdData.filter((word) => word !== null);
}

export function getColumn(key: string, columns: Column[]) {
  const column = columns.find((col) => col.name === key);
  return column ?? null;
}

export function parseDelimiter(str: string, delimiter = ";") {
  const data = str.split(delimiter);
  const result = data.map((item) => {
    if (item.trim() === "") {
      return null;
    } else {
      return item.trim();
    }
  });
  return result.filter((item) => item !== null);
}

export const columns = [
  {
    name: "d1",
    displayName: "D1 Kuntu",
    required: true,
  },
  {
    name: "d2",
    displayName: "D2 Tappu",
    required: true,
  },
  {
    name: "d3",
    displayName: "D3 Soppu",
    required: true,
  },
  {
    name: "d4",
    displayName: "D4 Kapda",
    required: true,
  },
  {
    name: "cf_similar_meaning",
    displayName: "Similar Meaning",
    required: false,
  },
  {
    name: "grammatical_form",
    displayName: "Grammatical Form",
    required: false,
  },
  {
    name: "tulu_meaning",
    displayName: "Tulu Meaning",
    required: true,
  },
  {
    name: "kannada_meaning",
    displayName: "Kannada Meaning",
    required: true,
  },
  {
    name: "english_meaning",
    displayName: "English Meaning",
    required: true,
  },
];

export function parseDate(d: string | Date) {
  const date = typeof d === "string" ? new Date(d) : d;

  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  return {
    object: date,

    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    day: date.getDay(),
    dayStr: days[date.getDay() as keyof typeof days],
    monthStr: months[date.getMonth() as keyof typeof months],

    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),

    iso: date.toISOString(),
    utc: date.toUTCString(),
    timeZone: date.getTimezoneOffset(),
  };
}

export function filterUniqueWords(dict: Array<Word>) {
  const result: Array<{ name: string; id: string; word: Word }> = [];

  dict.forEach((word) => {
    const uniques = new Set([word.d1, word.d2, word.d3, word.d4]);
    uniques.forEach((unique) => {
      if (unique !== "") result.push({ name: unique, id: word.id, word: word });
    });
  });

  return result;
}
