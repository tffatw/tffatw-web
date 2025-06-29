import { nextTick } from 'vue'

export function useSEO() {
  const setPageMeta = ({ title, description, keywords, ogImage }) => {
    nextTick(() => {
      if (title) {
        document.title = `${title} - 台灣速食餐飲協會`
      }
      
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription && description) {
        metaDescription.setAttribute('content', description)
      }
      
      const metaKeywords = document.querySelector('meta[name="keywords"]')
      if (metaKeywords && keywords) {
        metaKeywords.setAttribute('content', keywords)
      }
      
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle && title) {
        ogTitle.setAttribute('content', `${title} - 台灣速食餐飲協會`)
      }
      
      const ogDescription = document.querySelector('meta[property="og:description"]')
      if (ogDescription && description) {
        ogDescription.setAttribute('content', description)
      }
      
      const ogImageMeta = document.querySelector('meta[property="og:image"]')
      if (ogImageMeta && ogImage) {
        ogImageMeta.setAttribute('content', ogImage)
      }
      
      const twitterTitle = document.querySelector('meta[name="twitter:title"]')
      if (twitterTitle && title) {
        twitterTitle.setAttribute('content', `${title} - 台灣速食餐飲協會`)
      }
      
      const twitterDescription = document.querySelector('meta[name="twitter:description"]')
      if (twitterDescription && description) {
        twitterDescription.setAttribute('content', description)
      }
      
      const twitterImage = document.querySelector('meta[name="twitter:image"]')
      if (twitterImage && ogImage) {
        twitterImage.setAttribute('content', ogImage)
      }
    })
  }
  
  return {
    setPageMeta
  }
}