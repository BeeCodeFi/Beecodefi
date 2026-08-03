interface StructuredDataProps {
  data: object;
}

/**
 * StructuredData component for adding JSON-LD schema markup
 * Helps search engines understand page content for rich results
 */
export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
