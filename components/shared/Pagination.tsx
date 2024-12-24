import {
    Pagination as ShadPagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  
  interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
  }) => {
    return (
      <ShadPagination>
    <PaginationContent
  className="flex items-center justify-center gap-4 bg-[var(--background)] text-[var(--foreground)]"
>
  {/* Previous Button */}
  <PaginationItem>
    <PaginationPrevious
      href="#"
      className="flex items-center justify-center px-4 py-2 bg-[var(--muted)] text-[var(--muted-foreground)] rounded hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition"
      onClick={(e) => {
        e.preventDefault();
        if (currentPage > 1) onPageChange(currentPage - 1);
      }}
    >
    </PaginationPrevious>
  </PaginationItem>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, index) => (
    <PaginationItem key={index + 1}>
      <PaginationLink
        href="#"
        className={`flex items-center justify-center px-3 py-2 ${
          currentPage === index + 1
            ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
            : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
        } rounded transition`}
        onClick={(e) => {
          e.preventDefault();
          onPageChange(index + 1);
        }}
      >
        {index + 1}
      </PaginationLink>
    </PaginationItem>
  ))}

  {/* Next Button */}
  <PaginationItem>
    <PaginationNext
      href="#"
      className="flex items-center justify-center px-4 py-2 bg-[var(--muted)] text-[var(--muted-foreground)] rounded hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition"
      onClick={(e) => {
        e.preventDefault();
        if (currentPage < totalPages) onPageChange(currentPage + 1);
      }}
    >
    </PaginationNext>
  </PaginationItem>
</PaginationContent>
      </ShadPagination>
    );
  };
  