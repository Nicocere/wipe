"use client";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from '@/context/TransitionPageContext';

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  ...props
}) => {
  const router = useRouter();
  const { setTransitionState } = useTransition();

  const handleTransition = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const cleanTitle = String(href)
    .replace(/^\//, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  console.log(cleanTitle);

    setTransitionState(true, cleanTitle);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push(String(href));


    
    setTimeout(() => {
      setTransitionState(false);
    }, 1000);
  };

  return (
    <Link href={href} {...props} onClick={handleTransition}>
      {children}
    </Link>
  );
};