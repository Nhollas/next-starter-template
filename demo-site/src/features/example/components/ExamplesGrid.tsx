export const ExamplesGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
      {children}
    </div>
  )
}
