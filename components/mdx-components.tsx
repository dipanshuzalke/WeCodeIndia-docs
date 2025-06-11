"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const components = {
  h1: ({ children }: { children?: ReactNode }) => {
    const id = typeof children === "string" ? children.toLowerCase().replace(/\s+/g, "-") : "default-id";
    return (
      <h1
        id={id}
        className="text-2xl lg:text-3xl font-bold font-dm-sans text-app-typo-h1-dark dark:text-app-primary-light border-b border-b-app-border-dark py-3"
      >
        {children}
      </h1>
    );
  },

  h2: ({ children }: { children?: ReactNode }) => {
    const id = typeof children === "string" ? children.toLowerCase().replace(/\s+/g, "-") : "default-id";
    return (
      <h2
        id={id}
        className="text-xl lg:text-[1.6rem] font-bold font-dm-sans text-app-typo-h1-dark dark:text-app-primary-light mt-7 md:mt-10"
      >
        {children}
      </h2>
    );
  },

  h3: ({ children }: { children?: ReactNode }) => {
    const id = typeof children === "string" ? children.toLowerCase().replace(/\s+/g, "-") : "default-id";
    return (
      <h3
        id={id}
        className="text-lg lg:text-[1.4rem] font-semibold text-app-typo-h2-dark mt-5 md:mt-8"
      >
        {children}
      </h3>
    );
  },

  h4: ({ children }: { children?: ReactNode }) => {
    const id = typeof children === "string" ? children.toLowerCase().replace(/\s+/g, "-") : "default-id";
    return (
      <h4
        id={id}
        className="text-base lg:text-[1.2rem] font-semibold text-app-typo-h2-dark py-1 mt-1 md:mt-4"
      >
        {children}
      </h4>
    );
  },

  p: ({ children }: { children?: ReactNode }) => (
    <p className="text-sm lg:text-base text-app-typo-p-dark/80 py-1">
      {children}
    </p>
  ),

  a: ({ children, href }: { children?: ReactNode; href?: string }) => (
    <a
      href={href}
      className="text-blue-300 transition-colors underline py-1"
    >
      {children}
    </a>
  ),

  span: ({ children }: { children?: ReactNode }) => (
    <span className="text-sm text-app-secondary-dark dark:text-app-secondary-light py-1">
      {children}
    </span>
  ),

  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="list-disc my-2 ml-2 text-app-typo-p-dark/80">
      {children}
    </ul>
  ),

  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="list-decimal my-2 ml-2 text-app-typo-p-dark/80">
      {children}
    </ol>
  ),

  li: ({ children }: { children?: ReactNode }) => (
    <li className="text-sm md:text-base text-app-typo-p-dark/90">
      {children}
    </li>
  ),

  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="border-l-4 border-app-primary-dark dark:border-app-primary-light pl-4 italic text-app-secondary-dark dark:text-app-secondary-light">
      {children}
    </blockquote>
  ),

  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      {...props}
      className={cn("rounded-xl shadow-lg my-4 w-full object-contain", props.className)}
    />
  ),

  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-app-typo-h2-dark">
      {children}
    </strong>
  ),

  em: ({ children }: { children?: ReactNode }) => (
    <em className="italic text-app-primary-dark">
      {children}
    </em>
  ),

  table: ({ children }: { children?: ReactNode }) => (
    <table className="table-auto w-full bg-app-border-dark/30 rounded-md my-2">
      {children}
    </table>
  ),

  thead: ({ children }: { children?: ReactNode }) => (
    <thead>{children}</thead>
  ),

  tr: ({ children }: { children?: ReactNode }) => (
    <tr className="border-app-border-dark">{children}</tr>
  ),

  td: ({ children }: { children?: ReactNode }) => (
    <td className="p-3 text-xs md:text-sm text-left text-app-typo-p-dark border-app-border-dark">
      {children}
    </td>
  ),

  th: ({ children }: { children?: ReactNode }) => (
    <th className="p-3 text-xs md:text-sm text-left font-semibold border-app-border-dark bg-app-border-dark/40">
      {children}
    </th>
  ),

  // code: ({ children }: { children?: ReactNode }) => (
  //   <code className="bg-app-border-dark text-app-btn-primary/80 px-1.5 py-0.5 rounded-md font-dm-mono text-sm">
  //     {children}
  //   </code>
  // ),
};
