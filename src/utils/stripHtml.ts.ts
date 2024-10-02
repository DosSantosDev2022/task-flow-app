export const stripHtmlTags = (html: string, limit: number = 100): string => {
  const text = html.replace(/<[^>]*>?/gm, '') // Remove todas as tags HTML
  return text.length > limit ? text.substring(0, limit) + '...' : text
}
