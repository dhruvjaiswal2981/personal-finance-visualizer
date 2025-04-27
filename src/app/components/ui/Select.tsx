export default function Select({ children, ...props }: { children: React.ReactNode }) {
    return (
      <select
        className="border p-2 rounded w-full"
        {...props}
      >
        {children}
      </select>
    );
  }
  