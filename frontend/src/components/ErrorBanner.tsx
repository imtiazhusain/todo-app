interface Props {
  message: string
  onRetry?: () => void
}

export default function ErrorBanner({ message, onRetry }: Props) {
  return (
    <div role="alert" className="flex items-center justify-between gap-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
      <span>{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="font-medium underline underline-offset-2">
          Try again
        </button>
      )}
    </div>
  )
}
