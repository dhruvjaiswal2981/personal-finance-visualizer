export default function Button({ children, ...props }: { children: React.ReactNode }) {
    return (
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        {...props}
      >
        {children}
      </button>
    );
  }
  