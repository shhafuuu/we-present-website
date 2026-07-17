"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function FileField({
  name,
  label,
  hint,
  required,
  multiple,
  locale,
}: {
  name: string;
  label: string;
  hint: string;
  required?: boolean;
  multiple?: boolean;
  locale: Locale;
}) {
  const common = getDictionary(locale).common;
  const [fileNames, setFileNames] = useState<string[]>([]);

  return (
    <label className="block text-sm text-ink/70">
      {label}
      <div className="mt-2 flex items-center gap-3 rounded-lg border border-dashed border-amethyst/30 bg-ivory px-4 py-3">
        <span className="kicker shrink-0 rounded-full bg-amethyst/10 px-3 py-1 text-[0.65rem] text-amethyst">
          {common.chooseFile}
        </span>
        <span className="truncate text-xs text-ink/50">
          {fileNames.length ? fileNames.join(", ") : common.noFileSelected}
        </span>
        <input
          required={required}
          name={name}
          type="file"
          multiple={multiple}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
          onChange={(e) =>
            setFileNames(Array.from(e.target.files ?? []).map((f) => f.name))
          }
          className="absolute h-0 w-0 opacity-0"
        />
      </div>
      <p className="mt-1.5 text-xs text-ink/40">{hint}</p>
    </label>
  );
}
