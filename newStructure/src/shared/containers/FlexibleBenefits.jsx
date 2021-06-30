import React, { useEffect, useState } from 'react'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import Navbar from '../components/header/Navbar';
import Benefit from '../../components/Benefits/Benefit';
import Modal from 'react-modal';
import { benefitsDts } from '../services/fakeBackend.js'
import medicPlanLogo from '../../assets/images/medicPlanLogo.png';
import odontoPlanLogo from '../../assets/images/odontoPlanLogo.png';
import lifePlanLogo from '../../assets/images/lifeEnsurance.png';
import petPlanLogo from '../../assets/images/petPlanLogo.png';
import closeIcon from '../../assets/images/closeIcon.png';
import addIcon from '../../assets/images/addIcon.png';
import '../../assets/css/benefit.css';
import { CheckIcon, XIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { API, Auth } from 'aws-amplify';

const FlexibleBenefits = (props) => {
  //Endpoints end
  const { user } = props
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentBenefitDetails, setCurrentBenefitDetails] = useState({});
  const [filterBenefits, setFilterBenefits] = useState([]);
  const [tempBenefit, setTempBenefit] = useState({})
  const [userBenefits, setUserBenefits] = useState([])
  const [benefitTypes, setBenefitTypes] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [userDetails, setUserDetails] = useState({});

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
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  //Endpoints start
    //benefitType
  const getBenefitType = async () => await API.get('FBApi', '/benefitType', {
    headers: { 
      Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
    },
    'queryStringParameters': {
      'max_recs': '200'
    }
  })

  //benefit
  const getBenefit = async(benefitTypeId) => await API.get('FBApi', '/benefit', {
    headers: { 
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
    },
    'queryStringParameters': {
        'max_recs': '200'
    }
  });  

  useEffect(() => {
    getBenefitType().then( (response) => {
      setBenefitTypes(response)
    })
    getBenefit().then((response) => {
      setBenefits(response)
    })
  },[])


  const [currentBenefitType, setCurrentBenefitType] = useState({}); 
  const [currentProvider, setCurrentProvider] = useState({});

  const filterBySelectedOption = (val, arr) => {
    return (
      Array.apply(null, arr).filter((a) => a.value == val)[0]
    )
  }

  const subtitles = [
    "Plan de medicina prepagada", 
    "Plan Dental", 
    "Seguro de vida, elige tu monto a asegurar:", 
    "Asegura tu mascota"
  ]

  // const benefits = [
  //   {
  //     "Id": "892137a4-de8d-4064-999e-f0ea59a1048f",
  //     "Name": "Plan Medico De 60 a 63 años",
  //     "Description": "Plan Medico De 60 a 63 años",
  //     "ServiceProvider": {
  //         "Id": "346730ef-aaa9-47a7-9464-1bb802268285",
  //         "Name": "Colsanitas"
  //     },
  //     "BenefitType": {
  //         "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
  //         "Name": "Plan Medico"
  //     },
  //     "Cost": 207200,
  //     "Extensible": true
  //   },
  //   {
  //     "Id": "29d3f530-3db3-4e69-8f9c-86cbc091b539",
  //     "Name": "Plan Medico Mayores de 64 años",
  //     "Description": "Plan Medico Mayores de 64 años",
  //     "ServiceProvider": {
  //         "Id": "346730ef-aaa9-47a7-9464-1bb802268285",
  //         "Name": "Colsanitas"
  //     },
  //     "BenefitType": {
  //         "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
  //         "Name": "Plan Medico"
  //     },
  //     "Cost": 684300,
  //     "Extensible": true
  //   },
  //   {
  //     "Id": "c57453d0-452c-4a29-98c0-7cde23752992",
  //     "Name": "Plan Medico Menores de 60 - Con EPS SURA",
  //     "Description": "Plan Medico Menores de 60 - Con EPS SURA",
  //     "ServiceProvider": {
  //         "Id": "1721e047-fb9b-408e-be65-c2a7e357e2e1",
  //         "Name": "Poliza Sura (Producto con Extraprima)"
  //     },
  //     "BenefitType": {
  //         "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
  //         "Name": "Plan Medico"
  //     },
  //     "Cost": 236243,
  //     "Extensible": true
  //   },
  //   {
  //     "Id": "e43df1fd-df3a-4393-851a-53f74bc5f98a",
  //     "Name": "Plan Medico Menores de 60 - Sin EPS SURA",
  //     "Description": "Plan Medico Menores de 60 - Sin EPS SURA",
  //     "ServiceProvider": {
  //         "Id": "1721e047-fb9b-408e-be65-c2a7e357e2e1",
  //         "Name": "Poliza Sura (Producto con Extraprima)"
  //     },
  //     "BenefitType": {
  //         "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
  //         "Name": "Plan Medico"
  //     },
  //     "Cost": 247243,
  //     "Extensible": true
  //   },
  //   {
  //     "Id": "d2839300-6d62-44c2-802f-6632c951939d",
  //     "Name": "Plan Medico Mayores de 60 - Con EPS SURA",
  //     "Description": "Plan Medico Mayores de 60 - Con EPS SURA",
  //     "ServiceProvider": {
  //         "Id": "1721e047-fb9b-408e-be65-c2a7e357e2e1",
  //         "Name": "Poliza Sura (Producto con Extraprima)"
  //     },
  //     "BenefitType": {
  //         "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
  //         "Name": "Plan Medico"
  //     },
  //     "Cost": 677718,
  //     "Extensible": true
  //   },
  //   {
  //     "Id": "0ebe6fe8-67f1-407b-be0c-02c323c5c52d",
  //     "Name": "Plan Medico Mayores de 60 - Sin EPS SURA",
  //     "Description": "Plan Medico Mayores de 60 - Sin EPS SURA",
  //     "ServiceProvider": {
  //         "Id": "1721e047-fb9b-408e-be65-c2a7e357e2e1",
  //         "Name": "Poliza Sura (Producto con Extraprima)"
  //     },
  //     "BenefitType": {
  //         "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
  //         "Name": "Plan Medico"
  //     },
  //     "Cost": 710384,
  //     "Extensible": true
  //   },
  //   {
  //     "Id": "9ba9ab91-01a4-46db-8d34-15e664fe8924",
  //     "Name": "Plan Medico Menores de 60 - Con EPS Aliansalud",
  //     "Description": "Plan Medico Menores de 60 - Con EPS Aliansalud",
  //     "ServiceProvider": {
  //         "Id": "df2ae924-1a9c-4adb-89dd-8c8011b4e30f",
  //         "Name": "Colmedica"
  //     },
  //     "BenefitType": {
  //         "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
  //         "Name": "Plan Medico"
  //     },
  //     "Cost": 234983,
  //     "Extensible": true
  //   },
  //   {
  //     "Id": "5510b80a-bef5-4bd5-807d-cda49d471f14",
  //     "Name": "Plan Medico Menores de 60 - Sin EPS Aliansalud",
  //     "Description": "Plan Medico Menores de 60 - Sin EPS Aliansalud",
  //     "ServiceProvider": {
  //         "Id": "df2ae924-1a9c-4adb-89dd-8c8011b4e30f",
  //         "Name": "Colmedica"
  //     },
  //     "BenefitType": {
  //         "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
  //         "Name": "Plan Medico"
  //     },
  //     "Cost": 245173,
  //     "Extensible": true
  //   },
  //   {
  //     "Id": "abcfb787-5117-4658-b567-a4f4ac92d4f6",
  //     "Name": "Plan Medico Mayores de 60 - Con EPS Aliansalud",
  //     "Description": "Plan Medico Mayores de 60 - Con EPS Aliansalud",
  //     "ServiceProvider": {
  //         "Id": "df2ae924-1a9c-4adb-89dd-8c8011b4e30f",
  //         "Name": "Colmedica"
  //     },
  //     "BenefitType": {
  //         "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
  //         "Name": "Plan Medico"
  //     },
  //     "Cost": 780516,
  //     "Extensible": true
  //   },
  //   {
  //     "Id": "6b033fa6-898f-407c-b046-5e5c3357a58a",
  //     "Name": "Plan Medico Mayores de 60 - Sin EPS Aliansalud",
  //     "Description": "Plan Medico Mayores de 60, - Sin EPS Aliansalud",
  //     "ServiceProvider": {
  //         "Id": "df2ae924-1a9c-4adb-89dd-8c8011b4e30f",
  //         "Name": "Colmedica"
  //     },
  //     "BenefitType": {
  //         "Id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
  //         "Name": "Plan Medico"
  //     },
  //     "Cost": 790706,
  //     "Extensible": true
  //   }
  // ]

  const serviceProviders = () => {
    return benefits.map((benefit) => {return benefit.serviceProvider})
  }

  const uniqueByKey = (array, key) => {
    return [...new Map(array.map((x) => [x[key], x])).values()];
  }

  const displayEntriesOptions = (val) => {
    return uniqueByKey(serviceProviders(), val).map((serviceProvider, index) => {
      return (
        <option data-name={serviceProvider.name} data-id={serviceProvider.id} value={serviceProvider.id}>{serviceProvider.name}</option>
      )
    })
  } 

  const addBenefit = () => {
    let tempUserBenefits = userBenefits.concat(currentBenefitDetails)
    setUserBenefits(tempUserBenefits)
    setCurrentBenefitDetails({})
    setCurrentProvider({});
    setTempBenefit({});
  }


  const handleChangeProvider = (e) => {
    const selectedOption = filterBySelectedOption(e.target.value, e.target.options);
    const tempBenefits = benefits.filter((benefit) => benefit.serviceProvider.id == selectedOption.dataset.id)
    setCurrentProvider(selectedOption.dataset)
    setFilterBenefits(tempBenefits);
    setTempBenefit({
      ...tempBenefit,
      "cost": 0
    })
  }

  const handleEmployeeChoiceCheckbox = (e) => {
    setCurrentBenefitDetails({
      ...currentBenefitDetails,
      "isEmployeeChoice": e.target.checked
    });
  }

  const handleChangeCheckBox = (e) => {
  };

  const handleBenefitDetailsCheckbox = (e) => {
    const selectedOption = filterBySelectedOption(e.target.value, e.target.options)
    setCurrentBenefitDetails({
      "id": e.target.value,
      "name": selectedOption.dataset.name,
      "ServiceProvider": {
        "Id": selectedOption.dataset.Id,
        "Name": selectedOption.dataset.providerName
      },
      "benefitType": {
        "id": "fcc0c8a9-ca3b-41fc-92c3-3b730b8682a6",
        "name": "Plan Medico"
      },
      "amountOfPeople": 0,
      "isEmployeeChoice": false,
      "cost": 0,
    })
    setTempBenefit({
      ...selectedOption.dataset
    })
  }

  const handleAmountBenefit = (e) => {
    const tempAmount = e.target.value
    if (currentBenefitDetails.cost == undefined) {
      return;
    }
    if (e.target.value == undefined){
      return;
    }
    if (e.target.value == ''){
      return;
    }
    if (parseInt(tempAmount) < 0){
      setCurrentBenefitDetails({
        ...currentBenefitDetails, 
        "amountOfPeople": 0,
        "totalCost": 0
      })
      return;
    }
    setCurrentBenefitDetails({
      ...currentBenefitDetails, 
      "amountOfPeople": e.target.value,
      "totalCost": parseFloat(tempBenefit.cost) * e.target.value
    })
  }

  const convertToPrice = (val) => {
    return (val).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });
  }

  const displayEntriesDetails = (benefitsDts.length > 0 &&
    benefitsDts.map((benefit, index) => {
      return (
        benefit.serviceProvider.map((provider, i) => {
          return (
            <div>
              <div>
                <div className="grid grid-cols-6 gap-4 text-black">
                  <p className="col-start-1 col-span-2 font-light text-right">{provider.name}</p>
                  <p className="col-start-3 font-medium">${provider.cost}</p>
                  <input className="col-start-4 total-sub-benefit" type="text" value="" />
                  <p className="col-start-6">$0</p>
                </div>
              </div>
            </div>
          )
        })
      )
    })
  )

  const deleteCurrentBenefit = (e) => {
    let deletedBenefits = [...userBenefits];
    setUserBenefits(deletedBenefits.splice(e, 1));
  }
    return (
      <div className="wrapper">
        <Navbar>
          <AmplifySignOut />
        </Navbar>

            <div className="flex flex-wrap my-8">
                <div className="m-auto">
                  <div className="grid gap-40 grid-cols-2">
                    {
                      benefitTypes.length > 0 && benefitTypes.map((benefitType, index) => {
                        return(
                          <div>
                            <Benefit
                              setIsOpen={setIsOpen}
                              modalIsOpen={modalIsOpen}
                              mainLogo={medicPlanLogo}
                              title={benefitType.name}
                              subtitle={subtitles[index]} />
                          </div>
                        )
                      })
                    }

                      {/*<div>
                          <Benefit
                              setIsOpen={setIsOpen}
                              modalIsOpen={modalIsOpen}
                              mainLogo={medicPlanLogo}
                              title="Plan Médico"
                              subtitle="Plan de medicina prepagada" />
                      </div>
                      <div>
                          <Benefit
                              setIsOpen={setIsOpen}
                              modalIsOpen={modalIsOpen}
                              modalIsOpen={modalIsOpen}
                              mainLogo={odontoPlanLogo}
                              title="Plan Dental"
                              subtitle="Plan Dental" />
                      </div>
                      <div>
                          <Benefit
                              setIsOpen={setIsOpen}
                              modalIsOpen={modalIsOpen}
                              modalIsOpen={modalIsOpen}
                              mainLogo={lifePlanLogo}
                              title="Seguro Vida"
                              subtitle="Seguro de vida, elige tu monto a asegurar:" />
                      </div>
                      <div>
                          <Benefit
                              setIsOpen={setIsOpen}
                              modalIsOpen={modalIsOpen}
                              modalIsOpen={modalIsOpen}
                              mainLogo={petPlanLogo}
                              title="Seguro Mascotas"
                              subtitle="Asegura tu mascota" />
                      </div>*/}
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
                        <input type="text" type="checkbox" value={acceptTerms} />
                        <p className="flex-1 text-black font-bold">
                          He leído y acepto los
                          <a href="https://www.endava.com/en/Terms-and-Conditions" target="_blank" className="flex-1 endava-text-color"> terminos y condiciones</a><br/>
                          y las <a href="https://www.endava.com/en/Privacy-Notice" target="_blank" className="flex-1 endava-text-color">politicas de privacidad y tratamiento de datos</a>
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
                          <img className="inline-block modal-logo" src={medicPlanLogo} onClick={closeModal}/>
                          <h1 className="inline-block text-lg endava-text-color">Selecciona las opciones de tu beneficio</h1>
                        </div>
                        <div className="modal-body">
                          <div className="modal-first-options my-5">
                            <div className="text-black">                          
                              <div className="relative inline-block w-full text-gray-700">
                                <select className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" 
                                    placeholder="Proveedor" onChange={handleChangeProvider}
                                    value={currentProvider.id ? currentProvider.id :  '0'}>
                                   <option value='0' disabled>Selecciona proveedor</option>
                                  { benefits.length > 0 && displayEntriesOptions("id") }
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                                </div>
                              </div>
                              <div className="relative inline-block w-full text-gray-700 my-5">
                                <select className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" 
                                    placeholder="Proveedor Details" 
                                    onChange={handleBenefitDetailsCheckbox}
                                    value={currentBenefitDetails.id ? currentBenefitDetails.id : "0"}
                                    disabled={currentProvider.id ? false : true}>
                                  <option value='0' disabled>Selecciona opción</option>
                                  { filterBenefits.length > 0 && filterBenefits.map((benefit) => {
                                    return (
                                      <option data-provider-name={benefit.serviceProvider.name} data-provider-id={benefit.serviceProvider.id} data-name={benefit.name} data-cost={benefit.cost} value={benefit.id}>{benefit.name}</option>
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
                            <input 
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                              type="number" placeholder="Total" onChange={handleAmountBenefit} 
                              value={currentBenefitDetails.amountOfPeople ? currentBenefitDetails.amountOfPeople : ''}
                              disabled={tempBenefit.cost ? false : true}
                            />
                            <p className="text-black font-bold"> Precio P/U</p>
                            <p className="text-black text-left">{tempBenefit.cost ? convertToPrice(parseFloat(tempBenefit.cost)) : '$0'}</p>                 
                          </div>
                          <div className="grid grid-cols-2 text-center m-auto my-5">
                            <div>
                              <input className="s" id="username" type="checkbox" placeholder="Total" 
                                onChange={handleEmployeeChoiceCheckbox}
                                disabled={tempBenefit.cost ? false : true}/>
                              <label className="text-black"> Lo quiero para mi</label>
                            </div>
                            <p className="text-black">Total {currentBenefitDetails.totalCost ? convertToPrice(currentBenefitDetails.totalCost) : '$0'}</p>
                          </div>
                          <img className="add-icon mr-2 float-right relative right-10" src={addIcon} onClick={addBenefit}/>
                          <div className="summary-benefit clear-both font-bold text-black">
                            <p className="text-center end mb-5">Resumen</p>
                            
                          </div>
                          <div>
                            <table className="border-collapse border border-green-800 table-fixed mr-2 ml-2">
                              <thead>
                                <tr>
                                  <th className="font-bold border border-green-600 w-2/3">Beneficio</th>
                                  <th className="font-bold border border-green-600 ">Cantidad</th>
                                  <th className="font-bold border border-green-600 w-1/6">Total</th>
                                  <th className="font-bold border border-green-600">Para mi</th>
                                  <th className="font-bold border border-green-600 w-1/5"></th>
                                </tr>
                              </thead>
                              
                                {
                                  userBenefits.length > 0 && userBenefits.map((userBenefit, index) => {
                                    return (
                                      <tbody>
                                        <tr>
                                          <td className="text-center font-light border text-black text-sm border-green-600 ...">{userBenefit.name}</td>
                                          <td className="text-center font-light border text-black text-sm border-green-600 ...">{userBenefit.amountOfPeople}</td>
                                          <td className="text-center font-light border text-black text-sm border-green-600 ...">{convertToPrice(userBenefit.totalCost)}</td>
                                          <td className="font-light border text-black text-sm border-green-600 ...">
                                            {
                                              userBenefit.isEmployeeChoice ? (<CheckIcon className="endava-text-color mx-auto h-5 w-5"/>) : (<XIcon className="endava-text-color mx-auto h-5 w-5"/>)
                                            }
                                          </td>
                                          <td className="flex">
                                            <PencilIcon className="mx-auto h-5 w-5" onClick={() => deleteCurrentBenefit(index)}/>
                                            <TrashIcon className="mx-auto h-5 w-5" onClick={() => deleteCurrentBenefit(index)}/>
                                          </td>
                                        </tr>
                                      </tbody>
                                    )
                                  })
                                }
                            </table>
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
    )
}

export default FlexibleBenefits
