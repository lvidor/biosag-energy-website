import { type SchemaTypeDefinition } from 'sanity'
import { faqType } from './faqType'
import { aboutType } from './aboutType'
import { featureType } from './featureType'
import { projectType } from './projectType'
import { siteSettingsType } from './siteSettingsType'
import { heroType } from './heroType'
import { galleryType } from './galleryType'
import { certificateType } from './certificateType'
import { productType } from './productType'
import { postType } from './postType'
import { testimonialType } from './testimonialType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    faqType,
    aboutType,
    featureType,
    projectType,
    siteSettingsType,
    heroType,
    galleryType,
    certificateType,
    productType,
    postType,
    testimonialType,
  ],
}
