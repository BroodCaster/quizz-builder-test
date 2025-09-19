interface NavLinkType {
  name: string;
  path: string;
  query?: string;
}
export const navLinks: NavLinkType[] = [
  { name: 'Quizzes', path: '/' },
  { name: 'Create Quizz', path: '/create' },
];
