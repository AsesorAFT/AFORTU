const publicLegalAddress = (
  process.env.NEXT_PUBLIC_AFORTU_LEGAL_ADDRESS ?? ""
).trim();

export const legalIdentity = {
  commercialName: "AFORTU",
  legalName: "ASESOR AFORTU, S.A.S. DE C.V.",
  phoneDisplay: "+52 55 4814 4552",
  phoneHref: "tel:+525548144552",
  email: "contacto@afortu.com.mx",
  arcoEmail: "contacto@afortu.com.mx",
  lastUpdated: "26 de julio de 2026",
  address: {
    formatted: publicLegalAddress,
    isConfigured: publicLegalAddress.length > 0,
  },
} as const;
