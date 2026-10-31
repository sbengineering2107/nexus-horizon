import * as runtime from "react/jsx-runtime";

const cache = new Map<string, React.FC>();

/** Compile a Velite MDX function body once and reuse the resulting component. */
function getMdxComponent(code: string): React.FC {
  let component = cache.get(code);
  if (!component) {
    const fn = new Function(code);
    component = fn({ ...runtime }).default as React.FC;
    cache.set(code, component);
  }
  return component;
}

/** Renders a Velite-compiled MDX body. Server component; runs at build time for static pages. */
export function MdxContent({ code }: { code: string }) {
  return getMdxComponent(code)({});
}
