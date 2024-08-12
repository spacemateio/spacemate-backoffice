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
      return { bgColor: "#D9A19A", textColor: "#4A4031", text: "Email" }; // Red Ecru
    case AccountType.Google:
      return { bgColor: "#EEDCB3", textColor: "#4A4031", text: "Google" }; // Yellow Ecru
    case AccountType.Apple:
      return { bgColor: "#B8B8B8", textColor: "#2B2418", text: "Apple" }; // Gray Ecru
    case AccountType.Facebook:
      return { bgColor: "#9AB3D9", textColor: "#1F1B11", text: "Facebook" }; // Blue Ecru
    case AccountType.Backoffice:
      return { bgColor: "#ECEAE4", textColor: "#5D5246", text: "Backoffice" }; // Light Ecru
    default:
      return { bgColor: "#E0D6C5", textColor: "#3D3427", text: "Unknown" }; // Default Ecru
  }
};