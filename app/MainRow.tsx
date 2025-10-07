import './MainRow.css'

export const MainRow = ({ children, backgroundImageSrc }: { children: React.ReactNode, backgroundImageSrc: string }) => {
  return <div className='main-game'>
    <div className="main-row" style={{ backgroundImage: `url(${backgroundImageSrc})` }}>
      {children}
    </div>
  </div>
}
