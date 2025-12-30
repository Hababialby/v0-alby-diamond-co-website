// Simple markdown parser for blog posts
export function parseMarkdown(markdown: string): string {
  let html = markdown

  // Bold text: **text** -> <strong>text</strong>
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")

  // Convert line breaks to <br> tags
  html = html.replace(/\n/g, "<br />")

  // Convert double line breaks to paragraphs
  html = html.replace(/(<br \/>){2,}/g, "</p><p>")

  // Wrap in paragraph tags
  html = `<p>${html}</p>`

  return html
}
