export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h2>
      <p className="text-gray-700 mb-6">We can&apos;t seem to find the page you&apos;re looking for.</p>
      <a 
        href="/" 
        className="text-yellow-600 hover:text-yellow-700 hover:underline text-lg font-semibold"
      >
        Go back to Home
      </a>
    </div>
  );
}