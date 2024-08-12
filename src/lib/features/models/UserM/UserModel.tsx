export interface UserModel {
  id: number;
  name: string;
  lastname: string;
  fullName: string;
  password: string;
  email: string;
  mobile: string;
  mobileCode: string;
  address: string;
  town: string;
  state: string;
  postalCode: string;
  birthDay: Date;
  isHost: boolean;
  isVerified: boolean;
  status: number;
  avatar: string;
  accountType: number;
  idNumber: string;
  emergencyContact: string;
  emergencyContactMobileCode: string;
  emergencyContactMobile: string;
  updateDate: Date;
  createDate: Date;
  refCode: string;
}
