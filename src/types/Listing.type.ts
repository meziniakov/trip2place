export type Listing = {
  id: string
  title: string
  description: string
  category: string
  locationValue: string
  createdAt: Date
  medias?: Medias[]
}

export type Medias = {
  id: string
  type: string
  public_id: string
  listingId: string
  width: number
  height: number
  format: string
  bytes: number
  src: string
  duration: number
}
