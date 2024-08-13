interface FormErrorState {
  message?: string;
}

export default function FormSuccess({ message }: FormErrorState) {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/25 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      {message}
    </div>
  );
}
