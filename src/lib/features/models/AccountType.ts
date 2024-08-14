export enum AccountType {
    Email = 1,
    Google,
    Apple,
    Facebook,
    Backoffice
  }
  
export const getBadgeStyles = (accountType: AccountType) => {
  switch (accountType) {
    case AccountType.Email:
      return { bgColor: "#F0B500", textColor: "#000000", text: "@" }; 
    case AccountType.Google:
      return { bgColor: "#3B7DED", textColor: "#FFFFFF", text: "Gmail" };
    case AccountType.Apple:
      return { bgColor: "#B8B8B8", textColor: "#2B2418", text: "Apple" }; 
    case AccountType.Facebook:
      return { bgColor: "#9AB3D9", textColor: "#1F1B11", text: "Facebook" }; 
    case AccountType.Backoffice:
      return { bgColor: "#ECEAE4", textColor: "#5D5246", text: "Backoffice" }; 
    default:
      return { bgColor: "#E0D6C5", textColor: "#3D3427", text: "Unknown" }; 
  }
};