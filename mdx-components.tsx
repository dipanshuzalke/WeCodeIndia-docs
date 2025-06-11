import { ReactNode } from "react";
import { Clipboard } from "lucide-react";
import CodeblockMDX from "@/components/CodeblockMDX";

export function useMDXComponents(components: any) {
  return {
    // Spread any existing components passed in
    ...components,

    // For code blocks (```ts ... ```), wrap in <pre>
    pre: ({ children }: { children: React.ReactElement }) => {
      return <CodeblockMDX {...children.props} />;
    },
  };
}
