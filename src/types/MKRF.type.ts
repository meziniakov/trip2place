export interface RootObject {
  status: number
  nextPage: string
  cursor: string
  total: number
  filter: Filter
  o: boolean
  s: number
  l: number
  data: RootData[]
  count: number
}

export interface Filter {
  odSetVersions: OdSetVersions
}

export interface OdSetVersions {
  $in: string[]
}

export interface RootData {
  _id: string
  nativeId: string
  hash: string
  data: Data
  status: number
  nativeName: string
  activated: string
  created: string
  modified: string
  odSetVersions: string[]
  odSetVersion: string
  updateSession: string
  odSchema: string
  dataset: string
  changes: Changes[]
}

export interface Data {
  info: Info
  general: GeneralData
}

export interface Info {
  path: string
  category: string
  createDate: string
  updateDate: string
}

export interface GeneralData {
  id: number
  name: string
  description: string
  status: string
  address: Address
  category: Category
  contacts: Contacts
  externalInfo: ExternalInfo[]
  externalIds?: ExternalIds
  extraFields?: ExtraFields
  gallery: Gallery[]
  image: Image
  localeIds: number[]
  locale: Locale
  organization: Organization
  recommendations?: Recommendations[]
  tags?: Tags[]
  workingSchedule?: WorkingSchedule
  videoHostings?: VideoHosting[]
}

export interface VideoHosting {
  hosting: string
  id: string
}

export interface Address {
  street: string
  comment: string
  fiasSettlementId: string
  fiasAreaId: string
  fiasRegionId: string
  fullAddress: string
  mapPosition: MapPosition
}

export interface MapPosition {
  type: string
  coordinates: number[]
}

export interface Category {
  name: string
  sysName: string
}

export interface Contacts {
  website: string
  phones: Phones[]
}

export interface Phones {
  value: string
}

export interface ExternalInfo {
  url: string
  serviceName: string
}

export interface ExternalIds {
  eipskId: number
  culturarf: number
  goscatalogId: number
  statistic: number
}

export interface ExtraFields {
  types: string[]
}

export interface Gallery {
  url: string
  title: string
}

export interface Image {
  url: string
  title: string
}

export interface Locale {
  name: string
  timezone: string
  sysName: string
  id: number
}

export interface Organization {
  id: number
  name: string
  inn: string
  type: string
  address: Address2
  subordinationIds: number[]
  subordination: Subordination
  localeIds: number[]
  locale: Locale
  socialGroups: SocialGroups[]
}

export interface Address2 {
  street: string
  comment: string
  fiasHouseId: string
  fiasStreetId: string
  fiasCityId: string
  fiasRegionId: string
  fullAddress: string
}

export interface Subordination {
  name: string
  timezone: string
  sysName: string
  id: number
}

export interface SocialGroups {
  network: string
  name: string
  networkId: string
  updateDate: string
  createDate: string
  isPersonal?: boolean
  accountId: number
  postingGroupId: number
}

export interface Recommendations {
  name: string
  timezone: string
  sysName: string
  id: number
}

export interface Tags {
  id: number
  name: string
  sysName: string
}

export type WorkingSchedule = {
  [key in 1 | 2 | 3 | 4 | 5 | 6]: FromTo
}

export type FromTo = {
  from: string
  to: string
}

export interface Changes {
  modified: string
  diff: Diff[]
  updateSession: string
}

export interface Diff {
  op: string
  path: string
  value: Value
}

export interface Value {
  network: string
  name: string
  networkId: string
  isPersonal?: boolean
  createDate: string
  updateDate: string
  accountId: number
  postingGroupId: number
}

export interface GeneralDataEvent {
  id: number
  name: string
  shortDescription?: string
  description: string
  ageRestriction: number
  isFree: boolean
  price?: number
  status: string
  start: string
  saleLink?: string
  needMedia?: boolean
  end: string
  tags: Tags[]
  image: Image
  gallery: Gallery[]
  recommendations: Recommendations[]
  category: CategoryEvent
  organization: OrganizationEvent
  places: Places[]
  seances: Seances[]
}

export interface CategoryEvent {
  type: string
  name: string
  sysName: string
  id: number
}

export interface OrganizationEvent {
  id: number
  name: string
  type: string
  subordinationIds: number[]
  subordination: Subordination
  localeIds: undefined[]
  locale: Locale
}

export interface Places {
  address: AddressPlace
  externalInfo: undefined[]
  gallery: undefined[]
  localeIds: number[]
  locale: Locale
  recommendations: undefined[]
  seances: Seances[]
  tags: undefined[]
  videoHostings: undefined[]
  ticketReport: undefined[]
}

export interface AddressPlace {
  street: string
  comment: string
  fiasHouseId: string
  fiasStreetId: string
  fiasSettlementId: string
  fiasAreaId: string
  fiasRegionId: string
  fullAddress: string
  mapPosition: MapPosition
}

export interface Seances {
  start: string
  end: string
}
