import logoWhiteHorizontal from '../assets/logo-white-horizontal.svg'
import logoWhiteVertical from '../assets/logo-white-vertical.svg'

const Footer = () => {
  return (
    <footer>
      <div className='container-footer' >
        <div className='logos-whites' >
            <img className='logo-vertical' src={logoWhiteVertical} alt="Logo Rimac" />
            <img className='logo-horizontal' src={logoWhiteHorizontal} alt="Logo Rimac" />
        </div>
        <div className='line-footer'> </div>
        <div className='credits' >
            <p>© 2023 RIMAC Seguros y Reaseguros.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
