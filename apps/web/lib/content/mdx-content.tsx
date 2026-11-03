import * as runtime from "react/jsx-runtime";
import Link from "next/link";

type MdxComponents = Record<string, React.ComponentType<Record<string, unknown>>>;
const cache = new Map<string, React.FC<{ components?: MdxComponents }>>();

/** Compile a Velite MDX function body once and reuse the resulting component. */
function getMdxComponent(code: string): React.FC<{ components?: MdxComponents }> {
  let component = cache.get(code);
  if (!component) {
    const fn = new Function(code);
    component = fn({ ...runtime }).default as React.FC<{ components?: MdxComponents }>;
    cache.set(code, component);
  }
  return component;
}

/** Internal links use next/link (prefetch); anything else opens normally. */
function MdxLink({ href = "", ...rest }: React.ComponentProps<"a">) {
  if (href.startsWith("/")) return <Link href={href} {...rest} />;
  return <a href={href} rel="noopener" target="_blank" {...rest} />;
}

/** Wide tables scroll inside their own box on small screens. */
function MdxTable(props: React.ComponentProps<"table">) {
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label="Table">
      <table {...props} />
    </div>
  );
}

const components = { a: MdxLink, table: MdxTable } as unknown as MdxComponents;

/** Renders a Velite-compiled MDX body. Server component; runs at build time for static pages. */
export function MdxContent({ code }: { code: string }) {
  return getMdxComponent(code)({ components });
}
