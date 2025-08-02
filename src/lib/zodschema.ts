import z from "zod";

const fileZ = z.object({
  name: z.string(),
  type: z.string(),
  base64: z.string(),
});

export const uploadSnapFormSchemaZ = z.object({
  name: z.string(),
  status: z.boolean().default(false),
  file: fileZ,
  columns: z
    .array(
      z.object({
        name: z.string(),
        displayName: z.string(),
        required: z.boolean().default(true),
      }),
    )
    .default([]),
});

export const feedbackFormSchemaZ = z.object({
  name: z.string(),
  email: z.email(),
  message: z.string(),
  reference: z.string().nullable(),
});
