import type { KnowledgeBlock } from "@/lib/knowledge";

function StyledText({ block }: { block: KnowledgeBlock }) {
  const boundaries = new Set([0, block.text.length]);

  for (const range of block.inlineStyleRanges) {
    boundaries.add(range.offset);
    boundaries.add(range.offset + range.length);
  }

  const points = Array.from(boundaries)
    .filter((point) => point >= 0 && point <= block.text.length)
    .sort((a, b) => a - b);

  return points.slice(0, -1).map((start, index) => {
    const end = points[index + 1];
    const text = block.text.slice(start, end);
    const styles = new Set(
      block.inlineStyleRanges
        .filter(
          (range) =>
            start >= range.offset && end <= range.offset + range.length,
        )
        .map((range) => range.style),
    );

    let node: React.ReactNode = text;
    if (styles.has("UNDERLINE")) node = <u>{node}</u>;
    if (styles.has("ITALIC")) node = <em>{node}</em>;
    if (styles.has("BOLD")) node = <strong>{node}</strong>;

    return <span key={`${block.key}-${start}`}>{node}</span>;
  });
}

function Block({ block }: { block: KnowledgeBlock }) {
  const content = <StyledText block={block} />;

  switch (block.type) {
    case "header-one":
    case "header-two":
      return (
        <h2 className="afortu-display mt-14 text-3xl font-medium leading-tight tracking-[-0.025em] text-[#071a2b] sm:text-4xl">
          {content}
        </h2>
      );
    case "header-three":
    case "header-four":
      return (
        <h3 className="!font-sans mt-10 text-xl font-extrabold leading-8 text-[#132b39]">
          {content}
        </h3>
      );
    case "unordered-list-item":
      return (
        <li
          className="ml-5 list-disc pl-2 leading-8 text-[#4f5d66]"
          style={{ marginLeft: `${Math.max(1, block.depth + 1) * 1.25}rem` }}
        >
          {content}
        </li>
      );
    case "ordered-list-item":
      return (
        <li
          className="ml-5 list-decimal pl-2 leading-8 text-[#4f5d66]"
          style={{ marginLeft: `${Math.max(1, block.depth + 1) * 1.25}rem` }}
        >
          {content}
        </li>
      );
    case "blockquote":
      return (
        <blockquote className="my-9 border-l-2 border-[#b89663] bg-[#eee8de] px-6 py-5 text-lg italic leading-8 text-[#30434e]">
          {content}
        </blockquote>
      );
    default:
      return <p className="leading-8 text-[#4f5d66]">{content}</p>;
  }
}

export function RichContent({ blocks }: { blocks: KnowledgeBlock[] }) {
  return (
    <div className="grid gap-5">
      {blocks.map((block) => (
        <Block key={block.key} block={block} />
      ))}
    </div>
  );
}
