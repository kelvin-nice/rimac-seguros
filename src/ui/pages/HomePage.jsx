import React, { useEffect, useState } from "react";
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

import iconHome from '../assets/icon-home.svg';
import iconClinic from '../assets/icon-clinic.svg';
import iconChekeo from '../assets/icon-chekeo.svg';
import planRecomendado from '../assets/plan-recomendado.svg';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [filteredPlans, setFilteredPlans] = useState([]);

  const navigate = useNavigate();
  const handleGoToLogin = () => {
    navigate('/');
  };

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

  useEffect(() => {
    const getPlans = async () => {
      try {
        const fetchedPlans = await fetchPlans();
        const plans = fetchedPlans.list.filter((plan) =>
          ["Plan en Casa", "Plan en Casa y Clínica", "Plan en Casa + Chequeo "].includes(plan.name)
        ).map((plan) => {
          let icon;
          let additionalIcon;
          if (plan.name === "Plan en Casa") icon = iconHome;
          if (plan.name === "Plan en Casa y Clínica") {
            icon = iconClinic;
            additionalIcon = planRecomendado;
          }
          if (plan.name === "Plan en Casa + Chequeo ") icon = iconChekeo;

          return { ...plan, icon, additionalIcon };
        });

        if (selectedOption === "forMe") {
          setFilteredPlans(
            plans.map(plan => ({
              ...plan,
              price: `${plan.price.toFixed(2)}`
            }))
          );
        } else if (selectedOption === "forOther") {
          setFilteredPlans(
            plans.map((plan) => ({
              ...plan,
              price: `${(plan.price * 0.95).toFixed(2)}`,
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
      <div className="barra-desktop">
        <div className="container-barra">
          <img src={unoStepper} alt="stepper" />
        </div>
        <div className="container-volver" onClick={handleGoToLogin}>
          <img src={textButton} alt="boton volver" />
        </div>
      </div>

      <section className="barra-mobile">
        <div className="container">
          <button onClick={handleGoToLogin}>
            <img src={iconButton} alt="volver al inicio" />
          </button>
          <p>Paso 1 de 2</p>
          <div className="barra">
            <div className="barra-filled"></div>
          </div>
        </div>
      </section>

      <div className="column-content">
        <div className="column-text">
          {user ? (
            <h1 className="name-user">{user.name}, ¿Para quién deseas cotizar?</h1>
          ) : (
            <p>Cargando datos del usuario...</p>
          )}
          <p>Selecciona la opción que se ajuste más a tus necesidades.</p>
        </div>
      </div>

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
                <strong>Para mí</strong>
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
            <div className="text-alguien">
              <div>
                <img src={forSomeOne} alt="icono para alguien más" />
                <strong>Para alguien más</strong>
              </div>
              <p>Cotiza un seguro de salud para un amigo o familiar.</p>
            </div>
          </label>
        </div>
      </section>

      <div className="cards-total">
        {filteredPlans.map((plan, index) => (
          <CardPlans
            key={plan.name}
            additionalIcon={plan.additionalIcon}
            name={plan.name}
            description={plan.description}
            price={plan.price}
            icon={plan.icon}
            customStyle={index === 1 ? { paddingTop: '40px' } : {}}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;