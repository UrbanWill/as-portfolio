export default function Home() {
  return (
    <main className="flex justify-center flex-col space-y-2 sm:space-y-4">
      <div className="flex items-center justify-center bg-gray-300 h-96 rounded-lg">
        <div className="text-lg font-bold">Hero Image</div>
      </div>
      <div className="flex flex-col items-stretch space-y-2 text-lg font-bold sm:space-x-3 sm:flex-row sm:space-y-0">
        {Array(3)
          .fill("Product description")
          .map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-gray-300 h-96 w-full rounded-lg"
            >
              {item} {i + 1}
            </div>
          ))}
      </div>
    </main>
  );
}
