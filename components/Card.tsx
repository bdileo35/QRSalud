import Link from 'next/link';

interface CardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Card({ 
  title, 
  description, 
  icon, 
  href, 
  onClick,
  className = "" 
}: CardProps) {
  const content = (
    <div className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}>
      {icon && <div className="mb-3">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {content}
      </button>
    );
  }

  return content;
}

