import '@/components/MainRow.css'

export const MainRow = ({ children, backgroundImageSrc }: { children: React.ReactNode, backgroundImageSrc: string | null }) => {
  return <div className='main-game'>
    <div className="main-row" style={{ backgroundImage: backgroundImageSrc ? `url(${backgroundImageSrc})` : undefined }}>
      {children}
    </div>
  </div>
}
