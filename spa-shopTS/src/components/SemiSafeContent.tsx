type SemiSafeContent = {
  rawContent: string | TrustedHTML;
};
function SemiSafeContent({ rawContent }: SemiSafeContent) {
  const unsafePatterns = /(<[/]+script[^>]?>|javascript)/gi;
  const lessDangerousContent = rawContent.toString().replace(unsafePatterns, "");
  return <div dangerouslySetInnerHTML={{ __html: lessDangerousContent }}></div>;
}

export default SemiSafeContent;
