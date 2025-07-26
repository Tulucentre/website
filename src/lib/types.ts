export type Word = {
  id: string;
  snapshotId: string;

  entryId: string;
  count: number;
  category: string;

  d1: string;
  d2: string;
  d3: string;
  d4: string;

  cf_similar_meaning: string;
  grammatical_form: string;

  tulu_meaning: string;
  kannada_meaning: string;
  english_meaning: string;

  usage_sentence: string;
  usage_tulu: string;
  usage_kannada: string;
  usage_english: string;
};

export type WordOfTheDay = {
  word: Word | null;
  days: number;
  values: Array<number>;
};

export type Column = {
  name: string;
  displayName: string;
  required: boolean;
};
