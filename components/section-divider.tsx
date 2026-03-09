export function SectionDivider() {
  return (
    <div className="relative py-8">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center">
        <div className="bg-background px-4">
          <div className="h-2 w-2 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  )
}
