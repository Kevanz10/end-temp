import './App.css';
import './Index.css';
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './navBar';
import MedicPlan from './medicPlan';
import headerLogo from './medicPlanLogo.png';
import headerLogo2 from './lifeEnsurance.png';
import petEnsurance from './petEnsurance.png';
import addIcon from './addIcon.png';

import dentalLogo from './dentalLogo.png';
import Modal from 'react-modal';
import closeIcon from './closeIcon.png'

const App = (props) => {
  const axios = require('axios');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer Token eyJraWQiOiJCZlQzR2FET2ZFOVpcL0pIdjFlQjVXdVpYSXVUT2VsMDJQNmVCRDNKVWo1Yz0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiQVBfWVNpV2tMN203TDZqNjVIRHhIUSIsInN1YiI6ImQ3OWIxMzNjLTllZTMtNDU2ZS04ZTFlLWQ0MjQ4OWVlOGNjZiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9Vd2dVQkN2dW8iLCJjb2duaXRvOnVzZXJuYW1lIjoiZDc5YjEzM2MtOWVlMy00NTZlLThlMWUtZDQyNDg5ZWU4Y2NmIiwiYXVkIjoiMTBuaWQybTVnMDJoMHNlZWh1NG02aXY2amYiLCJldmVudF9pZCI6ImEzYjI3MTZlLWRlNjQtNGI5ZS05YTdjLTNjNTFiZWM3NzkzNiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI0OTU3MTMzLCJuYW1lIjoiS2V2aW4iLCJleHAiOjE2MjQ5NjA3MzMsImlhdCI6MTYyNDk1NzEzMywiZmFtaWx5X25hbWUiOiJrZXZhbnoiLCJqdGkiOiJhYjczYWJmNC02MmUxLTQ0MTctYjdhOC0zYTE1YTIyODg5ZjIiLCJlbWFpbCI6ImtldmluLnJvamFzQGVuZGF2YS5jb20ifQ.fNo0jJA_DrogvaIdelJm3--j1k46q3ZpoBtXhsSkvFHVnz4MQOPiBHscfk6wcHQIBtvLT7LFGCRtlzsO4m6h8ho8DLEO03n0Y0PZQyEidQGjaqa1y59qwNd-yhiuUHVD7sOA8tpNQ9uf_1JAVoZzeBUC6qgt4I0J4J1CE6W_vRxn6eqdDNf57nW-mojus5uRp5UOE8Miu1Yci_0ilUO4LUhS8nyP_DMVTrGaS1xBZDZz0WRBAq6oyCQEYceq376nhVjRNM2kdfiZqf7TrbDxtfs5LT88SaP8nAgCcXuw80OTde2VNJmDRHvPmkFw_pdbWOSfK_vo-WJ4gHBLB88lVg',
    "Access-Control-Allow-Origin": "*"
  }

  axios.get(
    'https://0n3nnyqhaa.execute-api.us-east-1.amazonaws.com/dev/benefit?benefitType=fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6', {
    headers: headers
  })
  .then((response) => {
    console.log(response)
  })
  

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

  const [currentBenefitType, setCurrentBenefitType] = useState({}); 


  const [subOptionsModal, setSubOptionsModal] = useState([]);
  const benefits = [
    {
      "Id": "892137a4-de8d-4064-999e-f0ea59a1048f",
      "Name": "Plan Medico De 60 a 63 años",
      "Description": "Plan Medico De 60 a 63 años",
      "ServiceProvider": {
          "Id": "346730ef-aaa9-47a7-9464-1bb802268285",
          "Name": "Colsanitas"
      },
      "BenefitType": {
          "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
          "Name": "Plan Medico"
      },
      "Cost": 207200,
      "Extensible": true
    },
    {
      "Id": "29d3f530-3db3-4e69-8f9c-86cbc091b539",
      "Name": "Plan Medico Mayores de 64 años",
      "Description": "Plan Medico Mayores de 64 años",
      "ServiceProvider": {
          "Id": "346730ef-aaa9-47a7-9464-1bb802268285",
          "Name": "Colsanitas"
      },
      "BenefitType": {
          "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
          "Name": "Plan Medico"
      },
      "Cost": 684300,
      "Extensible": true
    },
    {
      "Id": "c57453d0-452c-4a29-98c0-7cde23752992",
      "Name": "Plan Medico Menores de 60 - Con EPS SURA",
      "Description": "Plan Medico Menores de 60 - Con EPS SURA",
      "ServiceProvider": {
          "Id": "1721e047-fb9b-408e-be65-c2a7e357e2e1",
          "Name": "Poliza Sura (Producto con Extraprima)"
      },
      "BenefitType": {
          "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
          "Name": "Plan Medico"
      },
      "Cost": 236243,
      "Extensible": true
    },
    {
      "Id": "e43df1fd-df3a-4393-851a-53f74bc5f98a",
      "Name": "Plan Medico Menores de 60 - Sin EPS SURA",
      "Description": "Plan Medico Menores de 60 - Sin EPS SURA",
      "ServiceProvider": {
          "Id": "1721e047-fb9b-408e-be65-c2a7e357e2e1",
          "Name": "Poliza Sura (Producto con Extraprima)"
      },
      "BenefitType": {
          "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
          "Name": "Plan Medico"
      },
      "Cost": 247243,
      "Extensible": true
    },
    {
      "Id": "d2839300-6d62-44c2-802f-6632c951939d",
      "Name": "Plan Medico Mayores de 60 - Con EPS SURA",
      "Description": "Plan Medico Mayores de 60 - Con EPS SURA",
      "ServiceProvider": {
          "Id": "1721e047-fb9b-408e-be65-c2a7e357e2e1",
          "Name": "Poliza Sura (Producto con Extraprima)"
      },
      "BenefitType": {
          "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
          "Name": "Plan Medico"
      },
      "Cost": 677718,
      "Extensible": true
    },
    {
      "Id": "0ebe6fe8-67f1-407b-be0c-02c323c5c52d",
      "Name": "Plan Medico Mayores de 60 - Sin EPS SURA",
      "Description": "Plan Medico Mayores de 60 - Sin EPS SURA",
      "ServiceProvider": {
          "Id": "1721e047-fb9b-408e-be65-c2a7e357e2e1",
          "Name": "Poliza Sura (Producto con Extraprima)"
      },
      "BenefitType": {
          "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
          "Name": "Plan Medico"
      },
      "Cost": 710384,
      "Extensible": true
    },
    {
      "Id": "9ba9ab91-01a4-46db-8d34-15e664fe8924",
      "Name": "Plan Medico Menores de 60 - Con EPS Aliansalud",
      "Description": "Plan Medico Menores de 60 - Con EPS Aliansalud",
      "ServiceProvider": {
          "Id": "df2ae924-1a9c-4adb-89dd-8c8011b4e30f",
          "Name": "Colmedica"
      },
      "BenefitType": {
          "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
          "Name": "Plan Medico"
      },
      "Cost": 234983,
      "Extensible": true
    },
    {
      "Id": "5510b80a-bef5-4bd5-807d-cda49d471f14",
      "Name": "Plan Medico Menores de 60 - Sin EPS Aliansalud",
      "Description": "Plan Medico Menores de 60 - Sin EPS Aliansalud",
      "ServiceProvider": {
          "Id": "df2ae924-1a9c-4adb-89dd-8c8011b4e30f",
          "Name": "Colmedica"
      },
      "BenefitType": {
          "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
          "Name": "Plan Medico"
      },
      "Cost": 245173,
      "Extensible": true
    },
    {
      "Id": "abcfb787-5117-4658-b567-a4f4ac92d4f6",
      "Name": "Plan Medico Mayores de 60 - Con EPS Aliansalud",
      "Description": "Plan Medico Mayores de 60 - Con EPS Aliansalud",
      "ServiceProvider": {
          "Id": "df2ae924-1a9c-4adb-89dd-8c8011b4e30f",
          "Name": "Colmedica"
      },
      "BenefitType": {
          "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
          "Name": "Plan Medico"
      },
      "Cost": 780516,
      "Extensible": true
    },
    {
      "Id": "6b033fa6-898f-407c-b046-5e5c3357a58a",
      "Name": "Plan Medico Mayores de 60 - Sin EPS Aliansalud",
      "Description": "Plan Medico Mayores de 60, - Sin EPS Aliansalud",
      "ServiceProvider": {
          "Id": "df2ae924-1a9c-4adb-89dd-8c8011b4e30f",
          "Name": "Colmedica"
      },
      "BenefitType": {
          "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
          "Name": "Plan Medico"
      },
      "Cost": 790706,
      "Extensible": true
    }
  ]

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
        "cost": "700000",
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
        "cost": "700000",
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

  const handleChangeCheckBox = (e) => {
    setCurrentBenefitType({
      "id": "29d3f530-3db3-4e69-8f9c-86cbc091b539",
      "name": "Plan Medico Mayores de 64 años",
      "serviceProvider": {
        "id": e.target.value
      },
      "benefitType": {
        "id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
        "name": "Plan Medico"
      },
      "amountOfPeople": 0,
      "isEmployeeChoice": false,
      "cost": 0,
    })
  };

  const serviceProviders = () => {
    return benefits.map((benefit) => {return benefit.ServiceProvider})
  }

  const uniqueByKey = (array, key) => {
    return [...new Map(array.map((x) => [x[key], x])).values()];
  }

  const displayEntriesOptions = (val) => {
    return uniqueByKey(serviceProviders(), val).map((serviceProviderName, index) => {
      return (
        <option value={serviceProviderName.Id}>{serviceProviderName.Name}</option>
      )
    })
  } 

  const addBenefit = () => {

  }

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
                <img className="inline-block modal-logo" src={headerLogo} onClick={closeModal}/>
                <h1 className="inline-block text-lg endava-text-color">Selecciona las opciones de tu beneficio</h1>
               
              </div>
              <div className="modal-body">
                <div className="modal-first-options my-5">
                  <div className="text-black">                          
                    <div className="relative inline-block w-full text-gray-700">
                      <select className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Proovedor" value={'asd'} onChange={handleChangeCheckBox}>
                        { benefits.length > 0 && displayEntriesOptions("Id")}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                      </div>
                    </div>
                    <div className="relative inline-block w-full text-gray-700 my-5">
                      <select className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Proovedor" value={'asd'} onChange={handleChangeCheckBox}>
                        { benefits.length > 0 && benefits.map((benefit) => {
                          return (
                            <option data-name={benefit.Name} data-cost={benefit.Cost} value={benefit.Id}>{benefit.Name}</option>
                          )
                        })}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                      </div>
                    </div>       
                  </div>
                </div>
                <div className="grid grid-cols-4 text-center m-auto">
                  <p className="text-black font-bold">Cantidad</p>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Total"/>
                  <p className="text-black text-right font-bold"> Precio P/U</p>
                  <p className="text-black">12000U</p>                 
                </div>
                <div className="grid grid-cols-2 text-center m-auto my-5">
                  <div>
                    <input className="s" id="username" type="checkbox" placeholder="Total"/>
                    <label className="text-black"> Lo quiero para mi</label>
                  </div>
                  <p className="text-black">Total $ {12}</p>
                </div>
                <img className="add-icon mr-2 float-right relative right-10" src={addIcon} onClick={addBenefit}/>
                <div className="summary-benefit clear-both font-bold text-black">
                  <p className="text-center">Resumen</p>
                </div>
                <p className="text-black text-xs text-center my-5 clear-both">*Valores sujetos a verificación. <span className="endava-text-color">Ver mas información.</span></p>
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
