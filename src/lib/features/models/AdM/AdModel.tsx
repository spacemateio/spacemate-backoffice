export interface AdModel {
  id: number;
  userId: number;
  email: string;
  title: string;
  address: string;
  city: string;
  state: string;
  country: string;
  vote: number;
  reviewCount: number;
  description: string;
  accessType: string;
  accessTimes: number;
  accessTimeText: string;
  listingType: number;
  space: string;
  locked: boolean;
  uid: number;
  avatar: string;
  avatar_preview: string;
  uname: string;
  userReviewCount: number;
  location: string;
  features: string;
  price: number;
  images: imagesModalForAd[];
  isFavourite: boolean;
  isVerified: boolean;
  street_name: string;
  postcode: string;
  unit_no: string;
  timezone: string;
  height: number;
  length: number;
  width: number;
  currency: string;
  created: string;
  status: number;
}

export interface imagesModalForAd {
  id: number;
  listing_id: number;
  show_order: number;
  image: string;
  preview: string;
}
