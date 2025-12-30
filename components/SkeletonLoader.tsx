export function DictionarySkeleton() {
  return (
    <div className="animate-pulse motion-reduce:animate-none space-y-4">
      <div className="h-6 w-1/3 rounded bg-gray-300 dark:bg-gray-700" />
      <div className="h-4 w-2/3 rounded bg-gray-300 dark:bg-gray-700" />
      <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700" />
      <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-700" />
    </div>
  );
}