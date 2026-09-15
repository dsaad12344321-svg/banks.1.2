export type PosterLayoutSize =
  | "story"
  | "square"
  | "portrait45"
  | "portrait34"
  | "landscape";

export interface PosterLayout {
  headerX: number;
  headerY: number;

  logoBox: number;
  logo: number;
  logoBottom: number;

  title: number;
  subtitle: number;
  subtitleTop: number;

  dateX: number;
  dateY: number;
  dateLabel: number;
  date: number;
  dateTop: number;

  gridX: number;
  gridGap: number;
  gridBottom: number;

  cardPadding: number;
  cardRadius: number;

  cardBankBottom: number;

  bankLogoBox: number;
  bankLogo: number;
  bankLogoBottom: number;

  bankName: number;
  cardName: number;

  interest: number;
  interestBottom: number;
  interestLabel: number;

  dividerY: number;

  detailGap: number;
  detailText: number;

  footerX: number;
  footerY: number;
  footerTitle: number;
  footerText: number;
  footerTextTop: number;
}

export const POSTER_LAYOUTS: Record<
  PosterLayoutSize,
  PosterLayout
> = {
  story: {
    headerX: 32,
    headerY: 32,

    logoBox: 80,
    logo: 42,
    logoBottom: 16,

    title: 30,
    subtitle: 18,
    subtitleTop: 8,

    dateX: 32,
    dateY: 24,
    dateLabel: 14,
    date: 30,
    dateTop: 8,

    gridX: 24,
    gridGap: 16,
    gridBottom: 24,

    cardPadding: 20,
    cardRadius: 16,

    cardBankBottom: 20,

    bankLogoBox: 64,
    bankLogo: 44,
    bankLogoBottom: 12,

    bankName: 18,
    cardName: 14,

    interest: 36,
    interestBottom: 20,
    interestLabel: 12,

    dividerY: 20,

    detailGap: 12,
    detailText: 14,

    footerX: 24,
    footerY: 20,
    footerTitle: 18,
    footerText: 14,
    footerTextTop: 4,
  },

  square: {
    headerX: 20,
    headerY: 18,

    logoBox: 54,
    logo: 32,
    logoBottom: 8,

    title: 23,
    subtitle: 13,
    subtitleTop: 4,

    dateX: 20,
    dateY: 10,
    dateLabel: 11,
    date: 21,
    dateTop: 3,

    gridX: 14,
    gridGap: 10,
    gridBottom: 12,

    cardPadding: 10,
    cardRadius: 12,

    cardBankBottom: 10,

    bankLogoBox: 42,
    bankLogo: 29,
    bankLogoBottom: 6,

    bankName: 13,
    cardName: 10,

    interest: 25,
    interestBottom: 9,
    interestLabel: 9,

    dividerY: 9,

    detailGap: 6,
    detailText: 10,

    footerX: 14,
    footerY: 9,
    footerTitle: 12,
    footerText: 9,
    footerTextTop: 2,
  },

  portrait45: {
    headerX: 22,
    headerY: 20,

    logoBox: 58,
    logo: 34,
    logoBottom: 9,

    title: 24,
    subtitle: 14,
    subtitleTop: 4,

    dateX: 22,
    dateY: 12,
    dateLabel: 11,
    date: 23,
    dateTop: 4,

    gridX: 16,
    gridGap: 11,
    gridBottom: 14,

    cardPadding: 12,
    cardRadius: 13,

    cardBankBottom: 12,

    bankLogoBox: 46,
    bankLogo: 31,
    bankLogoBottom: 7,

    bankName: 14,
    cardName: 11,

    interest: 28,
    interestBottom: 11,
    interestLabel: 10,

    dividerY: 11,

    detailGap: 7,
    detailText: 11,

    footerX: 16,
    footerY: 11,
    footerTitle: 13,
    footerText: 10,
    footerTextTop: 2,
  },

  portrait34: {
    headerX: 24,
    headerY: 22,

    logoBox: 62,
    logo: 36,
    logoBottom: 10,

    title: 26,
    subtitle: 15,
    subtitleTop: 5,

    dateX: 24,
    dateY: 14,
    dateLabel: 12,
    date: 25,
    dateTop: 5,

    gridX: 18,
    gridGap: 12,
    gridBottom: 16,

    cardPadding: 14,
    cardRadius: 14,

    cardBankBottom: 14,

    bankLogoBox: 50,
    bankLogo: 34,
    bankLogoBottom: 8,

    bankName: 15,
    cardName: 12,

    interest: 30,
    interestBottom: 13,
    interestLabel: 10,

    dividerY: 13,

    detailGap: 8,
    detailText: 12,

    footerX: 18,
    footerY: 13,
    footerTitle: 14,
    footerText: 11,
    footerTextTop: 2,
  },

  landscape: {
    headerX: 18,
    headerY: 12,

    logoBox: 42,
    logo: 26,
    logoBottom: 6,

    title: 18,
    subtitle: 11,
    subtitleTop: 2,

    dateX: 18,
    dateY: 6,
    dateLabel: 9,
    date: 17,
    dateTop: 2,

    gridX: 12,
    gridGap: 8,
    gridBottom: 10,

    cardPadding: 8,
    cardRadius: 10,

    cardBankBottom: 7,

    bankLogoBox: 32,
    bankLogo: 22,
    bankLogoBottom: 4,

    bankName: 10,
    cardName: 8,

    interest: 19,
    interestBottom: 6,
    interestLabel: 7,

    dividerY: 6,

    detailGap: 4,
    detailText: 8,

    footerX: 12,
    footerY: 7,
    footerTitle: 10,
    footerText: 7,
    footerTextTop: 1,
  },
};

export function getPosterLayout(
  size: PosterLayoutSize
) {
  return POSTER_LAYOUTS[size];
}