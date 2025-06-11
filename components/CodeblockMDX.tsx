"use client";

import hljs from "highlight.js";
import "highlight.js/styles/gradient-dark.css";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useState } from "react";

interface CodeblockMDXProps {
  className?: string;
  children?: React.ReactNode;
}

const CodeblockMDX = ({ className, children }: CodeblockMDXProps) => {
  const language = className?.replace("language-", "") || "";
  const codeString = String(children).trim();

  const isSupported = hljs.getLanguage(language);
  const highlightedCode = isSupported
    ? hljs.highlight(codeString, { language }).value
    : hljs.highlightAuto(codeString).value;

  const codeLines = codeString.split("\n");

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="w-full rounded-md border border-app-border-dark my-2">
      <div className="flex items-center justify-between bg-app-border-dark/60 py-2 px-4 gap-2">
        <div className="flex justify-start items-center gap-1 md:gap-2">
          <div className="flex justify-center items-center gap-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="w-2 h-2 bg-neutral-300 rounded-full"></span>
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <span className="text-[9px] md:text-sm text-app-secondary-dark">
            {language || "code"}
          </span>
        </div>

        <button onClick={handleCopy} className="cursor-pointer">
          {copied ? (
            <ClipboardCheck className="inline-block size-4 text-green-500" />
          ) : (
            <Clipboard className="inline-block size-4" />
          )}
        </button>
      </div>

      <div className="relative text-xs md:text-sm max-h-[30rem] flex w-full p-2 bg-app-border-dark/20 rounded-b-md overflow-hidden">
        {/* <div className="py-2 px-3 text-right select-none text-app-secondary-dark/60">
          {codeLines.map((_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div> */}

        <pre className="p-2 overflow-x-auto w-full">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeblockMDX;
