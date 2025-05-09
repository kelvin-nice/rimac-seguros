import Logo from '../assets/Logo.svg';
import iconPhone from '../assets/iconPhone.svg'


const Header = () => {
  return (
    <header>
      
      <div className='container' >

        <div className='logo' >
          <img src={Logo} alt="logo" />
        </div>

        <div className='header-right' >
          <a className='compra' href="#" >¡Compra por este medio!</a>
          <a className='call' href="#"> <img src={iconPhone}  /> (01) 411 6001</a>
        </div>

      </div>
    </header>
  )
}

export default Header;
