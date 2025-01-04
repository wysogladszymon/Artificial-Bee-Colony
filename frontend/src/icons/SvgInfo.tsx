export function SvgInfo({ color = '#0D6ABC', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.3335 3.66665H7.66683V4.99998H6.3335V3.66665ZM6.3335 6.33331H7.66683V10.3333H6.3335V6.33331ZM7.00016 0.333313C3.32016 0.333313 0.333496 3.31998 0.333496 6.99998C0.333496 10.68 3.32016 13.6666 7.00016 13.6666C10.6802 13.6666 13.6668 10.68 13.6668 6.99998C13.6668 3.31998 10.6802 0.333313 7.00016 0.333313ZM7.00016 12.3333C4.06016 12.3333 1.66683 9.93998 1.66683 6.99998C1.66683 4.05998 4.06016 1.66665 7.00016 1.66665C9.94016 1.66665 12.3335 4.05998 12.3335 6.99998C12.3335 9.93998 9.94016 12.3333 7.00016 12.3333Z" fill={color} />
    </svg>
  );
}
