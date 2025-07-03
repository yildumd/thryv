export default function ProgramPage() {
  return (
    <div className="space-y-6">
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          8-Week Focus Sprint
        </h2>
        <p className="text-gray-600">
          Your program content goes here...
        </p>
      </section>

      {/* Example Week Component */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-blue-600">Week 1</h3>
        <ul className="mt-2 space-y-2">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Introduction to Focus Techniques</span>
          </li>
        </ul>
      </div>
    </div>
  );
}