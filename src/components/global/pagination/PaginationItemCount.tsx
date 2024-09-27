interface PaginationItemCountProps {
  page: number
  limit: number
  total: number
}

export const PaginationItemCount = ({
  page,
  limit,
  total,
}: PaginationItemCountProps) => {
  const currentCount = Math.min(limit, total - (page - 1) * limit)
  return (
    <span className="flex-1 font-normal text-sm">
      Mostrando {currentCount} de {total} itens
    </span>
  )
}
