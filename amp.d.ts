declare namespace JSX {
  interface AmpImg {
    alt: string
    src: string
    width?: string
    height?: string
    layout: string
    className?: string
  }
  interface AmpVideo {
    width: string
    height: string
    layout: string
    poster: string
    children: React.ReactNode
    autoplay: string
    loop?: string
    className?: string
  }
  interface AmpStory {
    standalone: string
    title: string
    publisher: string
    className?: string
    'publisher-logo-src': string
    'poster-portrait-src': string
    children: React.ReactNode
  }
  interface AmpStoryPage {
    id: string
    key?: string
    className?: string
    children: React.ReactNode
  }
  interface AmpStoryGridLayer {
    template: 'fill' | 'vertical' | 'horizontal' | 'thirds'
    children: React.ReactNode
    className?: string
    id?: string
  }
  interface AmpStoryBookend {
    src: string
    layout?:
      | 'fill'
      | 'fixed'
      | 'fixed-height'
      | 'flex-item'
      | 'intrinsic'
      | 'nodisplay'
      | 'responsive'
  }
  interface IntrinsicElements {
    'amp-img': AmpImg
    'amp-video': AmpVideo
    'amp-story': AmpStory
    'amp-story-grid-layer': AmpStoryGridLayer
    'amp-story-page': AmpStoryPage
    'amp-story-bookend': AmpStoryBookend
  }
}

// Only the intrinsic elements defined here will be accepted, attributes don't matter
// declare namespace JSX {
//   interface IntrinsicElements {
//     'amp-img': any
//     'amp-video': any
//     'amp-story': any
//     'amp-story-grid-layer': any
//     'amp-story-page': any
//     'amp-story-bookend': any
//   }
// }

// All intrinsic elements will be accepted
// declare namespace JSX {
//   interface IntrinsicElements {
//     [elemName: string]: any
//   }
// }
