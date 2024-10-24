export interface NavLinkType {
  id: number;
  title: string;
  url: string;
}

export const navLinks: NavLinkType[] = [
  { id: 1, title: 'Home', url: '/' },
  { id: 2, title: 'Teachers', url: '/teachers' },
  { id: 3, title: 'Students', url: '/students' },
];