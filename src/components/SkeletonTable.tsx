import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTable() {
  return (
    <div className="w-full">
      <table className="w-full text-sm text-left rtl:text-right  bg-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3">
              <Skeleton className="h-4 w-[250px] bg-white" />
            </th>
            <th className="px-6 py-3">
              <Skeleton className="h-4 w-[250px] bg-white" />
            </th>
            <th className="px-6 py-3">
              <Skeleton className="h-4 w-[250px] bg-white" />
            </th>
            <th className="px-6 py-3">
              <Skeleton className="h-4 w-[250px] bg-white" />
            </th>
            <th className="px-6 py-3">
              <Skeleton className="h-4 w-[250px] bg-white" />
            </th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 5 }).map((_, rowIdx) => (
            <tr
              key={rowIdx}
              className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              {Array.from({ length: 5 }).map((_, colIdx) => (
                <td key={colIdx} className="px-6 py-4">
                  <Skeleton className="h-4 w-[250px]" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
