import { components } from '@/components/mdx-components';

export function useMDXComponents(components: any) {
  return {
    ...components,
  };
}