import React from 'react';
import PropTypes from "prop-types";

const CardPlans = ({ name, description, price, icon, additionalIcon, customStyle = {} }) => {
  return (
    <article className="card-plans" style={customStyle} data-testid={`plan-card-${name.replace(/\s+/g, '-').toLowerCase()}`}>
      {additionalIcon && (
        <img
          src={additionalIcon}
          alt="recomendado"
          className="recomendado"
        />
      )}

      <div className="content">
        <div className="card-plans_content">
          <h3 className="card-plans__title">{name}</h3>
          <h5 className="text-costo">Costo plan</h5>
          <p className="card-plans__price" data-testid={`plan-price-${name.replace(/\s+/g, '-').toLowerCase()}`}>
            ${price} al mes
          </p>
        </div>
        <div className="img-icon">
          <img src={icon} alt={`${name} icon`} className="card-plans__icon" />
        </div>
      </div>

      <div className="separation"></div>

      <ul>
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button className="btn-selection">Seleccionar Plan</button>
    </article>
  );
};

CardPlans.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.string.isRequired,
  additionalIcon: PropTypes.string,
  customStyle: PropTypes.object,
};

export default CardPlans;