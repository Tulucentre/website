import { uploadSnapFormSchemaZ } from "~/lib/zodschema";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { base64ToFile, dataFilter, parseXLSX } from "~/lib/utils";
import { env } from "~/env";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { getFile, uploadFileToServer } from "~/server/utils";

export const snapshotRouter = createTRPCRouter({
  // TODO: convert to adminProcedure
  addNewSnapshot: adminProcedure
    .input(uploadSnapFormSchemaZ)
    .mutation(async ({ ctx, input }) => {
      const currentTime = new Date();
      const fileName = `${currentTime.getFullYear()}${currentTime.getMonth()}${currentTime.getDate()}_${currentTime.getHours()}${currentTime.getMinutes()}${currentTime.getSeconds()}${currentTime.getMilliseconds()}_${input.file.name}`;
      const path = `${env.NODE_ENV}/${currentTime.getFullYear()}/${fileName}`;
      const file = base64ToFile(input.file.base64, fileName);

      if (file === null) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to convert base64 to file",
        });
      }

      // HACK: This function uploads file to the file server
      const res = await uploadFileToServer(file, path);

      if (res.status !== 201) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to upload file to server",
        });
      }

      await ctx.db.snapshot.create({
        data: {
          name: input.name,
          fileName: fileName,
          source: res.url ?? "",
          createdBy: ctx.session?.user.id,
          status: input.status,
        },
      });

      return {
        status: "true",
        message: "Snapshot added successfully",
      };
    }),

  // INPUT: snapshot ID
  loadSnapshot: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const snapshot = await ctx.db.snapshot.findUnique({
        where: { id: input },
      });

      if (snapshot === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Snapshot not found",
        });
      }
      if (snapshot.status === false) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Snapshot is not active",
        });
      }

      const file = await getFile(snapshot.source, snapshot.fileName);
      if (file === null) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get file from server",
        });
      }

      const wordData = dataFilter(await parseXLSX(file), true);

      const transaction = await ctx.db.$transaction(async (tx) => {
        const activeSnapshots = await tx.snapshot.findMany({
          where: {
            status: true,
            env: snapshot.env,
            NOT: {
              id: input,
            },
          },
          select: {
            id: true,
          },
        });

        if (activeSnapshots.length > 0) {
          await tx.snapshot.updateMany({
            where: {
              status: true,
              env: snapshot.env,
              NOT: {
                id: input,
              },
            },
            data: {
              status: false,
            },
          });

          await Promise.all([
            activeSnapshots.map((snap) => {
              return tx.word.deleteMany({
                where: {
                  snapshotId: snap.id,
                },
              });
            }),
          ]);
        }
        await tx.word.deleteMany({ where: { snapshotId: input } });

        const newWords = await tx.word.createMany({
          data: wordData.map((word) => {
            return { ...word, snapshotId: input };
          }),
        });

        return {
          status: "true",
          data: newWords,
        };
      });

      if (transaction.status !== "true") {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to load snapshot",
        });
      }

      return {
        status: "true",
        message: "Snapshot loaded successfully",
      };
    }),

  getActiveSnapshot: publicProcedure.query(async ({ ctx }) => {
    const activeSnapshots = await ctx.db.snapshot.findFirst({
      where: { status: true },
    });

    if (activeSnapshots === null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No active snapshot found",
      });
    }

    return {
      status: "true",
      data: activeSnapshots,
      message: "Active snapshot retrieved successfully",
    };
  }),
});
