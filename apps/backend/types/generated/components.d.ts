import type { Schema, Struct } from '@strapi/strapi';

export interface HostLanguageType extends Struct.ComponentSchema {
  collectionName: 'components_host_language_types';
  info: {
    displayName: 'Language Type';
  };
  attributes: {
    language: Schema.Attribute.Enumeration<
      [
        'English',
        'Spanish',
        'French',
        'German',
        'Hindi',
        'Chinese Mandarin',
        'Arabic',
        'Japanese',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface ListingAmenityType extends Struct.ComponentSchema {
  collectionName: 'components_listing_amenity_types';
  info: {
    displayName: 'Amenity Type';
  };
  attributes: {
    amenity: Schema.Attribute.Enumeration<
      [
        'Wifi',
        'Air conditioning',
        'Heating',
        'Kitchen',
        'Refrigerator',
        'Microwave',
        'Stove',
        'Oven',
        'Dishwasher',
        'Washer',
        'Dryer',
        'TV',
        'Streaming services',
        'Private entrance',
        'Free parking',
        'Garage parking',
        'Balcony',
        'Patio',
        'Backyard',
        'Outdoor furniture',
        'BBQ grill',
        'Workspace',
        'Hair dryer',
        'Iron',
        'Coffee maker',
        'Toiletries',
        'Linens',
        'Towels',
        'Pool',
        'Hot tub',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface ListingFeaturedServicesType extends Struct.ComponentSchema {
  collectionName: 'components_listing_featured_services_types';
  info: {
    displayName: 'Featured Service Type';
  };
  attributes: {
    featuredService: Schema.Attribute.Enumeration<
      [
        'Outdoor entertainment',
        'Designed for staying cool',
        'Self check-in',
        'Fast Wifi',
        'Fully equipped kitchen',
        'Free parking on premises',
        'Washer & Dryer',
        'Family-friendly',
        'Pet-friendly',
        'Hot tub',
        'Pool',
        'Balcony with a view',
        'Fireplace',
        'BBQ grill',
        'Outdoor dining area',
        'Fitness area',
        'Workspace',
        'Breakfast included',
        'Air conditioning',
        'Heating',
        'Smart TV',
        'Sound system',
        'Garden',
        'Terrace',
        'Iron & ironing board',
        'Hair dryer',
        'Elevator access',
        'Luggage drop-off',
        'Twenty-four-hour security',
        'Concierge service',
      ]
    > &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'host.language-type': HostLanguageType;
      'listing.amenity-type': ListingAmenityType;
      'listing.featured-services-type': ListingFeaturedServicesType;
    }
  }
}
