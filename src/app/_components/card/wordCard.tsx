import { DialogTitle } from "@radix-ui/react-dialog";
import type React from "react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
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
      <DialogContent className="max-h-[85vh] w-[95vw] max-w-[95vw] overflow-y-auto border-0 bg-gradient-to-br from-blue-50 to-yellow-50 shadow-2xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <DialogHeader className="space-y-2 pb-4 sm:space-y-4 sm:pb-6">
          {title && (
            <DialogTitle className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-center text-2xl font-bold break-all text-transparent sm:text-3xl sm:break-words md:text-4xl lg:text-5xl">
              {title}
            </DialogTitle>
          )}
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Word Forms Section */}
          <Card className="border-l-4 border-l-blue-600 bg-white/80 shadow-md backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="mb-3 flex flex-row justify-between gap-2 sm:mb-4 sm:items-center">
                <span className="text-lg font-semibold text-blue-800 sm:text-xl">
                  Word Forms
                </span>
                {word.grammatical_form && (
                  <Badge
                    variant="secondary"
                    className="border-secondary bg-secondary/30 w-fit truncate border text-xs font-medium break-words text-black sm:text-sm"
                  >
                    {word.grammatical_form}
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
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
            <CardContent className="p-3 sm:p-4 md:p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-800 sm:mb-4 sm:text-xl">
                Meanings
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
                <ShowColumnContent column="tulu_meaning" word={word} />
                <ShowColumnContent column="kannada_meaning" word={word} />
                <ShowColumnContent column="english_meaning" word={word} />
              </div>
            </CardContent>
          </Card>

          {/* Usage Examples Section */}
          <Card className="border-l-4 border-l-blue-500 bg-white/80 shadow-md backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-800 sm:mb-4 sm:text-xl">
                Usage Examples
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                <div className="space-y-3 sm:space-y-4">
                  <ShowColumnContent column="usage_sentence" word={word} />
                  <ShowColumnContent column="usage_tulu" word={word} />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <ShowColumnContent column="usage_kannada" word={word} />
                  <ShowColumnContent column="usage_english" word={word} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DialogHeading({ text, column }: { text: string; column: string }) {
  const words = parseDelimiter(text);

  if (words.length > 0) {
    return (
      <div className="rounded-lg border border-blue-200 bg-white/90 p-3 transition-all duration-200 hover:border-yellow-300 hover:shadow-md sm:p-4">
        <div className="flex flex-col space-y-1 sm:space-y-2">
          <span className="text-xs font-medium tracking-wide text-blue-600 uppercase sm:text-sm">
            {column}
          </span>
          <div className="text-base font-semibold break-words text-blue-900 sm:text-lg">
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
        <div className="font-kannada rounded-lg border border-blue-200 bg-white/90 p-3 transition-all duration-200 hover:border-yellow-300 hover:shadow-md sm:p-4">
          <h4 className="mb-2 text-xs font-medium tracking-wide text-blue-600 uppercase sm:mb-3 sm:text-sm">
            {col.displayName}
          </h4>
          <div className="space-y-1 sm:space-y-2">
            {contentArray.map((content, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-2 text-blue-900"
              >
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-400 sm:mt-2 sm:h-2 sm:w-2"></div>
                <p className="text-sm leading-relaxed break-words sm:text-base">
                  {content}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
  return null;
}
