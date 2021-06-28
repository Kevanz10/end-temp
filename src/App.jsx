import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './navBar';
import MedicPlan from './medicPlan';
import headerLogo from './medicPlanLogo.png';
import headerLogo2 from './lifeEnsurance.png';
import petEnsurance from './petEnsurance.png';

import dentalLogo from './dentalLogo.png';
import Modal from 'react-modal';
import closeIcon from './closeIcon.png'

const App = (props) => {
  let subtitle;
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0
    },
  };
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const afterOpenModal = (subtitle) => {
    subtitle.style.color = '#f00';
  }

  const selectedSubBenefit = () => {

  }

  const desiredData = {
    "id": "id usuario - deseado",
    "email": "email usuario",
    "budgetSpent": "calcuated",
    "selectedBenefits": [
      {
        "id": "29d3f530-3db3-4e69-8f9c-86cbc091b539",
        "name": "Plan Medico Mayores de 64 años",
        "serviceProvider": {
          "id": "346730ef-aaa9-47a7-9464-1bb802268285",
          "name": "Colsanitas"
        },
        "benefitType": {
          "id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
          "name": "Plan Medico"
        },
        "amountOfPeople": 0,
        "isEmployeeChoice": true,
        "cost": "loqueva",
      },
      {
        "id": "29d3f530-3db3-4e69-8f9c-86cbc091b539",
        "name": "Plan Medico Mayores de 64 años",
        "serviceProvider": {
          "id": "346730ef-aaa9-47a7-9464-1bb802268285",
          "name": "Colsanitas"
        },
        "benefitType": {
          "id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
          "name": "Plan Medico"
        },
        "amountOfPeople": 0,
        "isEmployeeChoice": true,
        "cost": "loqueva",
      }
    ]
  }

  const benefitsDts = [
    {
      "id": "0",
      "name": "Colmedica",
      "description": "colmedica details",
      "serviceProvider": [
        {
          "name": "mayores 60 ",
          "cost": "100"
        },
         {
          "name": "mayores 20",
          "cost": "200"
        }
      ]
    }, 
    {
      "id": "0",
      "name": "Sura eps",
      "description": "Sura details",
      "serviceProvider": [
        {
          "name": "menores 60",
          "cost": "140"
        },
         {
          "name": "mayores 20",
          "cost": "250"
        }
      ]
    },
    {
      "id": "0",
      "name": "Colsanitas",
      "description": "Colsanitas details",
      "serviceProvider": [
        {
          "name": "mayores 45",
          "cost": "150"
        },
         {
          "name": "mayores 20",
          "cost": "250"
        },
         {
          "name": "mayores 30",
          "cost": "730"
        },
         {
          "name": "mayores 45",
          "cost": "910"
        }, {
          "name": "mayores 10",
          "cost": "100"
        }
      ]
    },
    {
      "id": "0",
      "name": "Otro",
      "description": "Otra details",
      "serviceProvider": [
      ]
    }
  ]

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleChangeCheckBox = () => {
    setAcceptTerms(!acceptTerms);
  };

  const displayEntries = ( benefitsDts.length > 0 &&
    benefitsDts.map((benefit, index) => {
      return (
        <div>
          <div>
            <div className="text-black">
              <input type="text" type="radio" value={acceptTerms} onChange={handleChangeCheckBox} />
              <label className="px-4">{benefit.name}</label>
            </div>
          </div>
        </div>
      )
    })
  ) 

   const displayEntriesDetails = ( benefitsDts.length > 0 &&
    benefitsDts.map((benefit, index) => {
      return (
        benefit.serviceProvider.map((provider, i) => {
          return (
            <div>
              <div>
                <div className="grid grid-cols-6 gap-4 text-black">
                  <p className="col-start-1 col-span-2 font-light text-right">{provider.name}</p>
                  <p className="col-start-3 font-medium">${provider.cost}</p>
                  <input className="col-start-4 total-sub-benefit" type="text" value=""/>
                  <p className="col-start-6">$0</p>
                </div>
              </div>
            </div>
          )
        })
      )
    })
  ) 

  return (
    <div className="wrapper">
     <NavBar/>
      <div className="flex flex-wrap my-8">
        <div className="m-auto">
          <div className="grid gap-40 grid-cols-2">
            <div>
              <MedicPlan
                setIsOpen = {setIsOpen}
                modalIsOpen={modalIsOpen}
                mainLogo={headerLogo}
                title="Plan Médico" 
                subtitle="Plan de medicina prepagada"/>
            </div>
            <div>
              <MedicPlan 
                setIsOpen = {setIsOpen}
                modalIsOpen={modalIsOpen}
                modalIsOpen={modalIsOpen}
                mainLogo={headerLogo}
                title="Plan Dental" 
                subtitle="Plan Dental"/>
            </div>
            <div>
              <MedicPlan 
               setIsOpen = {setIsOpen}
                modalIsOpen={modalIsOpen}
                modalIsOpen={modalIsOpen}
                mainLogo={headerLogo2}
                title="Seguro Vida" 
                subtitle="Seguro de vida, elige tu monto a asegurar:"/>
            </div>
            <div>
              <MedicPlan
                setIsOpen = {setIsOpen}
                modalIsOpen={modalIsOpen}
                modalIsOpen={modalIsOpen}
                mainLogo={petEnsurance}
                title="Seguro Mascotas" 
                subtitle="Asegura tu mascota"/>
            </div>
          </div>

          <div className="main-card-resume-total text-right my-10">
            <p className="text-black font-bold text-lg">
              Total Beneficios Seleccionados:  <span className="endava-text-color">$1.878.283</span>
            </p>
            <div className="my-10">
              <p className="text-black font-bold text-xs">
                * Valores sujetos a verificación. 
                <a href="" className="endava-text-color"> Ver más información</a>
              </p>
              <p className="text-black font-bold text-xs">
                ** Si el total de tus beneficios supera el valor de tu People Pass, el excedente será descontado de tu nómina
              </p>
              <p className="text-black font-bold text-xs">
                *** Puedes realizar cambios desde el 1ro de Julio de 2021 al 12 de julio de 2021
              </p>
            </div>
          </div>

          <div className="flex space-x-4 ... my-20 ">
            <input type="text" type="checkbox" value={acceptTerms} onChange={handleChangeCheckBox} />
            <p className="flex-1 text-black font-bold">
              He leído y acepto los 
              <a href="" className="flex-1 endava-text-color"> terminos y condiciones </a> <br/> 
              y las <a href="" className="flex-1 endava-text-color">politicas de privacidad y tratamiento de datos</a> 
            </p>
            <button className={"endava-bg-color text-black font-bold py-2 px-4 rounded" + (!acceptTerms ? " cursor-not-allowed" : '')}>Submit</button>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="modal-benefits">
              <div className="modal-header">
                <img className="close-icon-modal" src={closeIcon} onClick={closeModal}/>
                <h1 className="text-lg">Selecciona las opciones de tu beneficio</h1>
              </div>
              <div className="modal-body">
                <p className="text-black text-center my-5 font-bold text-xl">Selecciona el prestador de servicio</p>
                <div class="modal-first-options">
                  {displayEntries}
                </div>
                <p className="text-black text-center my-5 font-bold text-xl">Selecciona la(s) opciones y la cantidad</p>
                <div>
                  {displayEntriesDetails}
                </div>

                <p className="text-black text-xs text-center my-5">*Valores sujetos a verificación. <span className="endava-text-color">Ver mas información.</span></p>

                <div className="modal-footer mx-10">
                  <button className="bg-gray-500 endava-text-color text-black py-2 px-4 rounded text-right float-right mb-5">Submit</button>   
                </div> 
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
