export type NavPage = {
  icon?: React.ReactNode;
  name: string;
  page: string;
  exact?: boolean;
};
export type NavPageWithChildren = NavPage & {
  children: NavPage[];
};
