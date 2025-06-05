import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import imagen from '../assets/imagen-familia.png';
import check from '../assets/check.svg'
import arrow from '../assets/arrow-down-select.svg';
import blueD from '../assets/blur-blue-d.png'
import blueS from '../assets/blur-blue-s.png'
import fucciaD from '../assets/blur-fuccia-d.png'
import fucciaS from '../assets/blur-fuccia-s.png'
import Footer from '../components/Footer';


const LoginPage = () => {
    const [documentType, setDocumentType] = useState("dni"); // Estado para almacenar el tipo de documento (DNI o RUC)
    const [inputValue, setInputValue] = useState(""); // Estado para almacenar el valor del input
    const [errors, setErrors] = useState(''); // Estado para errores
    const [cel, setCel] = useState(''); // Estado para celular
    const [isChecked, setIsChecked] = useState(false); // aceptación de politicas
    const [isCheckedDos, setIsCheckedDos] = useState(false); // aceptación de politicas
    const [checkedErrors, setCheckedErrors] = useState(false);
    const navigate = useNavigate();


    //VA ADENTRO DEL INPUT QUE VA IR EL NUMERO DE DNI O RUC
    // Maneja el cambio en el input (solo números)
    const handleInputChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Permite solo números
     setInputValue(numericValue);
    };

    //VA ADENTRO DEL INPUT QUE VA IR EL NUMERO DE CELULAR
    // Maneja el cambio en el input (solo números)
    const handleCelChange = (e) => {
    const numericValueCel = e.target.value.replace(/[^0-9]/g, ""); // Permite solo números
    setCel(numericValueCel);
    };


    //¡¡CUANDO SELECIONO DNI O RUC SE LIMPIA EL INPUT DEL COSTADO!!!
    // Maneja el cambio en el selector (DNI o RUC)
    const handleSelectChange = (e) => {
    setDocumentType(e.target.value);
    setInputValue(""); // Limpiar el input cuando se cambia el tipo de documento
    };


    //PARA CHECKED Politicas
    const handleChecked= () =>{
      setIsChecked(!isChecked);
      setCheckedErrors(false); // Resetear errores si el checkbox se selecciona
    }

     //PARA CHECKED Politicas
     const handleCheckedDos= ()=>{
      setIsCheckedDos(!isCheckedDos);
      setCheckedErrors(false); // Resetear errores si el checkbox se selecciona
     }
    
    // PARA EL ARROW DEL SELECTOR
    const selectRef = useRef(null);
    const handleArrow = ()=>{
      if(selectRef.current){
        selectRef.current.focus();
        selectRef.current.onClick();
      }
    };


      const aprovedData = (event) => {
        event.preventDefault();
        const user = { dni: '30216147', ruc: '10888692966', cel: '5130216147' }; // Example user data
        if (((documentType === "dni" && inputValue === user.dni  &&  cel === user.cel ) || (documentType === "ruc" &&  inputValue === user.ruc  &&  cel === user.cel)) && 
    isChecked && 
    isCheckedDos ){
          setErrors("");
          setCheckedErrors(false);
          navigate('/home');
        }else if(!isChecked || 
    !isCheckedDos){
          setErrors("");
          setCheckedErrors(true);

        }
        
        else {
          setErrors('*Credenciales incorrectas. Por favor, verifica tus datos.');
          setInputValue("");
          setCel("");
          setCheckedErrors(true); // Indica error en checkboxes aunque los datos sean incorrectos
          return;
        } 
        
          
    };


  return (
    <>
    
    <section className='login' >
      <div className='container' >

        <div className='login-left' >
          <img src={imagen} alt='imagen-familia'  />
        </div>

        <div className='login-right' >
          <div className='text-login'>
            <div className='block' >
              <div className='block01'>
                <p className='seguro' >Seguro Salud Flexible</p>
                <h1>Creado para ti y tu familia</h1>
              </div>
              <div className='hide-img' >
                <img src={imagen} alt='imagen-familia'  />
              </div>
            </div>
            <hr className='line' />
            <p>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</p>
          </div>
          <form onSubmit={aprovedData} >
            <div className='documentoSelect' >

              <div className='select-document' >
                <div className='select-documentoTipo' >
                  <select value={documentType} onChange={handleSelectChange} name="documentoTipo" id="documentoTipo" ref={selectRef}  >
                    <option value= "dni" >DNI</option>
                    <option value= "ruc" >RUC</option>
                  </select>
                  <img src={arrow} alt='arrow-down' className='arrow-down' onClick={handleArrow} />
                </div>
                <div className='n-document' >
                  <input //para el DNI y RUC
                  className= {` inputDocument ${ errors ? "error" : ""} `}
                  type='text'
                  value={inputValue}
                  onChange={handleInputChange}
                  inputMode='numeric'
                  maxLength={documentType === "dni" ? 8 : 11}
                  pattern='\d*'
                  id='inputDocument'
                  placeholder=" "
                  />
                  <label htmlFor='inputDocument' className={`floating-label ${inputValue ? 'active' : ''}`}>N° de Documento</label>
                </div>
              </div>

              <div className='error-field-uno' >{errors && <p className='error' > {errors} </p> }</div>
              
              <div className='input-cel' >
                <input className={` celular ${ errors ? "error" : ""} `}
                    id='celular'
                    type='text'
                    inputMode='numeric'
                    value={cel}
                    pattern='\d*'
                    placeholder=''
                    onChange={handleCelChange}
                />
                <label htmlFor='celular' className={`floating-label-celular ${cel ? 'active':'' } `} >Celular</label>
                
              </div>
              <div className='error-field-dos' >{errors && <p className='error' > {errors} </p> }</div>

              <label className={`label_check-politica ${ !isChecked && checkedErrors ? "errorCheck" : "" }`} > 
                <input type='checkbox' name='AcceptedPolitica' onChange={handleChecked} checked={isChecked}  hidden />
                <div className= {` check-label-box ${isChecked ? "checked" : "" } `} > {isChecked && <img src={check} alt="Check" />} </div>
                <div className='text-acepto' >Acepto la política de privacidad</div>
              </label>

              <label className= { ` label_check-politicaComunicaciones ${ !isCheckedDos && checkedErrors ? "errorCheck" : "" } ` } > 
                <input type='checkbox' name='AcceptedPoliticaComunicaciones' onChange={handleCheckedDos} checked={isCheckedDos}  hidden />
                <div className={` check-label-boxComunicaciones ${isCheckedDos ? "checked" : "" } `} > {isCheckedDos && <img src={check} alt="Check" />} </div>
                <div className='text-acepto' >Acepto la política Comunicaciones Comerciales</div>
              </label>

              <a href='#' >Aplican Términos y Condiciones.</a>

              <button className='cotiza-btn' type='submit' >Cotiza aquí</button>

            </div>

            

          </form>
        </div>

      </div>
      <img className='blue-d' src={blueD} alt="esfera-blue" />
      <img className='blue-s' src={blueS} alt="esfera-blue" />
      <img className='fuccia-d' src={fucciaD} alt="esfera-fuccia" />
      <img className='fuccia-s' src={fucciaS} alt="esfera-fuccia" />
    </section>
    <Footer  />
    
    </>
  );
};

export default LoginPage;