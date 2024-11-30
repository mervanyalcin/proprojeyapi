import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
}

const Breadcrumb = ({ items, showHomeIcon = true }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-2">
        {showHomeIcon && (
          <li>
            <Link 
              href="/"
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Home size={18} />
            </Link>
          </li>
        )}
        
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {(index > 0 || showHomeIcon) && (
              <ChevronRight 
                size={16} 
                className="mx-2 text-gray-400" 
              />
            )}
            
            {index === items.length - 1 ? (
              <span className="text-gray-800 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;