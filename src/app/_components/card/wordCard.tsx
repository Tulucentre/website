import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "~/components/ui/dialog";
import type { Word } from "~/lib/types";
import { columns, getColumn, parseDelimiter } from "~/lib/utils";

export default function WordCard({
  word,
  open,
  title,
  onOpenChange,
}: {
  word: Word;
  open: boolean;
  title?: string;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-0 bg-gradient-to-br from-blue-50 to-yellow-50 shadow-2xl">
        <DialogHeader className="space-y-4 pb-6">
          {title && (
            <DialogTitle className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
              {title}
            </DialogTitle>
          )}
        </DialogHeader>

        <DialogDescription className="space-y-8">
          {/* Word Forms Section */}
          <Card className="border-l-4 border-l-blue-600 bg-white/80 shadow-md backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-blue-800">
                  Word Forms
                </h3>
                {word.grammatical_form && (
                  <Badge
                    variant="secondary"
                    className="border-secondary bg-secondary/30 border font-medium text-black"
                  >
                    {word.grammatical_form}
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DialogHeading
                  text={word.d1}
                  column={getColumn("d1", columns)?.displayName ?? "Form 1"}
                />
                <DialogHeading
                  text={word.d2}
                  column={getColumn("d2", columns)?.displayName ?? "Form 2"}
                />
                <DialogHeading
                  text={word.d3}
                  column={getColumn("d3", columns)?.displayName ?? "Form 3"}
                />
                <DialogHeading
                  text={word.d4}
                  column={getColumn("d4", columns)?.displayName ?? "Form 4"}
                />
              </div>
            </CardContent>
          </Card>

          {/* Meanings Section */}
          <Card className="border-l-4 border-l-yellow-500 bg-white/80 shadow-md backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-blue-800">
                Meanings
              </h3>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <ShowColumnContent column="tulu_meaning" word={word} />
                <ShowColumnContent column="kannada_meaning" word={word} />
                <ShowColumnContent column="english_meaning" word={word} />
              </div>
            </CardContent>
          </Card>

          {/* Usage Examples Section */}
          <Card className="border-l-4 border-l-blue-500 bg-white/80 shadow-md backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-blue-800">
                Usage Examples
              </h3>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <ShowColumnContent column="usage_sentence" word={word} />
                  <ShowColumnContent column="usage_tulu" word={word} />
                </div>
                <div className="space-y-4">
                  <ShowColumnContent column="usage_kannada" word={word} />
                  <ShowColumnContent column="usage_english" word={word} />
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

function DialogHeading({ text, column }: { text: string; column: string }) {
  const words = parseDelimiter(text);

  if (words.length > 0) {
    return (
      <div className="rounded-lg border border-blue-200 bg-white/90 p-4 transition-all duration-200 hover:border-yellow-300 hover:shadow-md">
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-medium tracking-wide text-blue-600 uppercase">
            {column}
          </span>
          <div className="text-lg font-semibold text-blue-900">
            {words.map((word, idx) => (
              <span key={idx} className="inline-block">
                {word}
                {idx !== words.length - 1 && (
                  <span className="mx-1 text-yellow-500">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function ShowColumnContent({ word, column }: { word: Word; column: string }) {
  const col = getColumn(column, columns);

  if (col && col.required && word) {
    const contentArray = parseDelimiter(word[col.name as keyof Word] as string);

    if (contentArray.length > 0) {
      return (
        <div className="rounded-lg border border-blue-200 bg-white/90 p-4 transition-all duration-200 hover:border-yellow-300 hover:shadow-md">
          <h4 className="mb-3 text-sm font-medium tracking-wide text-blue-600 uppercase">
            {col.displayName}
          </h4>
          <div className="space-y-2">
            {contentArray.map((content, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-2 text-blue-900"
              >
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-400"></div>
                <p className="text-base leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
  return null;
}
