import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { fetchPlans } from "../../application/getPlansUseCase";
import { fetchUser } from "../../application/getUserUseCase";
import check from "../assets/check.svg";
import CardPlans from "../components/CardPlans";
import forMe from "../assets/icon-forMe.svg";
import forSomeOne from "../assets/icon-forSomeone.svg";
import iconButton from '../assets/button-circle-icon.svg';
import unoStepper from '../assets/uno_stepper.svg';
import textButton from '../assets/text_button_web.svg';




const HomePage = () => {
  const [user, setUser] = useState(null); // Datos del usuario (Rocío)
  const [selectedOption, setSelectedOption] = useState(""); // Opción seleccionada (para mí o para otro)
  const [filteredPlans, setFilteredPlans] = useState([]); // Planes filtrados

  // volver al login
  const navigate = useNavigate();
  const handleGoToLogin = ()=>{
    navigate('/');
  }
  // Obtener datos del usuario
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUser();
        setUser(data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };
    getUserData();
  }, []);

  // Obtener planes según la opción seleccionada
  useEffect(() => {
    const getPlans = async () => {
      try {
        const fetchedPlans = await fetchPlans();
        const plans = fetchedPlans.list.filter((plan) =>
          ["Plan en Casa", "Plan en Casa y Clínica", "Plan en Casa + Chequeo "].includes(plan.name)
        )
        .map((plan) => {
          // Agregar un icono basado en el nombre del plan
          let icon;
          let additionalIcon; 
          if (plan.name === "Plan en Casa") {icon = "src/ui/assets/icon-home.svg";}
          if (plan.name === "Plan en Casa y Clínica") {icon = "src/ui/assets/icon-clinic.svg"; additionalIcon = "src/ui/assets/plan-recomendado.svg";} 
          if (plan.name === "Plan en Casa + Chequeo ") {icon = "src/ui/assets/icon-chekeo.svg";}

          return { ...plan, icon, additionalIcon };
        });

        if (selectedOption === "forMe") {
          setFilteredPlans(plans);
        } else if (selectedOption === "forOther") {
          setFilteredPlans(
            plans.map((plan) => ({
              ...plan,
              price: (plan.price * 0.95).toFixed(2), // Aplica descuento del 5%
            }))
          );
        } else {
          setFilteredPlans([]);
        }
      } catch (error) {
        console.error("Error al obtener planes:", error);
      }
    };

    if (selectedOption) getPlans();
  }, [selectedOption]);

  return (
    <>

    <div className="barra-desktop" >
      <div className="container-barra"  >
        <img src={unoStepper} alt="stepper" />
      </div>
      <div className="container-volver" onClick={handleGoToLogin} >
        <img src={textButton} alt="boton volver" />
      </div>
    </div>

    <section className="barra-mobile" >
      <div className="container" >
        <button onClick={handleGoToLogin} >
          <img src={iconButton} alt="volver al inicio" />
        </button>
        <p>Paso 1 de 2</p>
        <div className="barra" >
          <div className="barra-filled" ></div>
        </div>
      </div>
    </section>
    
      {/* Título */}
      <div className="column-content" >
        <div className="column-text" >
          {user ? (
            <h1 className="name-user" >{user.name}, ¿Para quién deseas cotizar?</h1>
          ) : (
            <p>Cargando datos del usuario...</p>
          )}
          <p>Selecciona la opción que se ajuste más a tus necesidades.</p>
        </div>
      </div>

      {/* Opciones */}
      <section className="options">
        <div
          className={`check__label ${selectedOption === "forMe" ? "active" : ""}`}
          onClick={() => setSelectedOption("forMe")}
        >
          <input type="radio" id="forMe" name="option" hidden />
          <label className="label-inside" htmlFor="forMe">
            <div className="circle">
              <img src={check} alt="check" />
            </div>
            <div className="text-me">
              <div>
                <img src={forMe} alt="icono para mí" />
                <strong >Para mí</strong>
              </div>
              
              <p>Cotiza tu seguro de salud y agrega familiares si así lo deseas.</p>
            </div>
          </label>
        </div>
        <div
          className={`check__label ${selectedOption === "forOther" ? "active" : ""}`}
          onClick={() => setSelectedOption("forOther")}
        >
          <input type="radio" id="forOther" name="option" hidden />
          <label className="label-inside" htmlFor="forOther">
            <div className="circle">
              <img src={check} alt="check" />
            </div>
            <div className="text-alguien" >
              <div>
                <img src={forSomeOne} alt="icono para mí" />
                <strong>Para alguien más</strong>
              </div>
              
              <p>Cotiza un seguro de salud para un amigo o familiar.</p>
            </div>
          </label>
        </div>
      </section>

      {/* Planes filtrados */}
      <section className="cards-total" >
        {
          filteredPlans.map((plan, index) => (
            <CardPlans
              key={plan.name}
              additionalIcon={plan.additionalIcon}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              icon={plan.icon}
              customStyle={index === 1 ? { paddingTop: '40px' } : {}} // Solo para el segundo elemento (índice 1)
            />
          ))
        }
      </section>
    </>
  );
};

export default HomePage;