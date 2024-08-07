export interface AdModel {
  id: number;
  userId: number;
  email: string;
  title: string;
  city: string;
  state: string;
  country: string;
  vote: number;
  description: string;
  avatar: string;
  avatar_preview: string;
  location: string;
  price: number;
  images: imagesModalForAd[];
  isFavourite: boolean;
  street_name: string;
  postcode: string;
  unit_no: string;
  timezone: string;
  currency: string;
  created: string;
  status: number;
  /*
  address: string;
  reviewCount: number;
  accessType: string;
  accessTimes: number;
  accessTimeText: string;
  listingType: number;
  space: string;
  locked: boolean;
  uid: number;
  uname: string;
  userReviewCount: number;
  features: string;
  isVerified: boolean;
  height: number;
  length: number;
  width: number;*/
}

export interface imagesModalForAd {
  id: number;
  listing_id: number;
  show_order: number;
  image: string;
  preview: string;
}
