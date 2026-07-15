import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge Tailwind CSS class names conditionally.
 * Mirrors the shadcn/ui `cn` helper.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
