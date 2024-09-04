

export function SkeletonProjectListCards() {
  return (
    <div className="flex flex-col gap-1 w-full col-span-3">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="py-2 px-1 bg-zinc-50 border border-zinc-100 rounded-lg flex flex-col items-center justify-between w-full"
        >
          <div className="flex w-full justify-between gap-2 items-start animate-pulse">
            <div className="flex items-center justify-center gap-2 w-full py-2 px-1">
              <div className="bg-zinc-300 rounded-full w-9 h-9"></div>
              <div className="bg-zinc-300 h-4 rounded w-full"></div>
            </div>

          </div>
          <div className="w-full mt-1 animate-pulse">
            <div className="bg-zinc-300 h-6 rounded w-full mb-1"></div>
            <div className="bg-zinc-300 h-6 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
