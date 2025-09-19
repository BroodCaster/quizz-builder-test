import Link from 'next/link';
import { navLinks } from '~/constants/nav-links';

function Navbar() {
  return (
    <nav className="z-50 flex h-20 w-full justify-between bg-[#13161B] px-4 sm:px-[100px] md:px-[100px] xl:items-center">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-9 xl:gap-20">
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className="text-[#94979C] hover:text-[#6172F3]"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
