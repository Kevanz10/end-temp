import React, { useEffect, useState } from 'react'
import Navbar from '../components/header/Navbar';
import Benefit from '../../components/Benefits/Benefit';
import Modal from 'react-modal';
import { getBenefitType, getBenefit, subtitles, customStyles, hoverBenefitText } from '../services/variables.js';
import medicPlanLogo from '../../assets/images/medicPlanLogo.png';
import closeIcon from '../../assets/images/closeIcon.png';
import addIcon from '../../assets/images/addIcon.png';
import saveIcon from '../../assets/images/saveIcon.png';
import '../../assets/css/benefit.css';
import { CheckIcon, XIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'

Modal.setAppElement('#root');

const FlexibleBenefits = (props) => {
  //Endpoints end
  //const { user } = props
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentBenefitDetails, setCurrentBenefitDetails] = useState({});
  const [filterBenefits, setFilterBenefits] = useState([]);

  const [userBenefits, setUserBenefits] = useState([])
  //const [userDetails, setUserDetails] = useState({});

  const [benefitTypes, setBenefitTypes] = useState([]);
  const [benefits, setBenefits] = useState([]);
  
  const [currentBenefitTypeIndex, setCurrentBenefitTypeIndex] = useState();
  const [currentBenefitType, setCurrentBenefitType] = useState({});
  const [tempBenefits, setTempBenefits] = useState([]);

  //UI set
  const addBenefitIcon = document.querySelector('#addBenefitIcon');
  
  const closeModal = () => {
    setCurrentBenefitType({});
    setCurrentBenefitTypeIndex();
    setCurrentBenefitDetails({});
    setTempBenefits([]);
    setFilterBenefits([]);
    setIsOpen(false);
  }

  useEffect(() => {
    getBenefitType().then( (response) => {
      setBenefitTypes(response)
    })
    getBenefit().then((response) => {
      setBenefits(response)
    })
  },[])

  //Filters by benefitType
    const displayProviders = () => {
      return uniqueValuesFilterByKey(filterProviders(), "id").map((serviceProvider) => {
        return (
          <option key={serviceProvider.id.toString()} data-name={serviceProvider.name} value={serviceProvider.id}>{serviceProvider.name}</option>
        )
      })
    }

    const filterProviders = () => {
      return filterBenefitsByType().map((benefit) => { return benefit.serviceProvider })
    }

    const filterBenefitsByType = () => {
      return benefits.filter(
        (benefit) => benefit.benefitType.id === currentBenefitType.id
      )
    }

    const filterBySelectedOption = (val, arr) => {
      return (
        Array.apply(null, arr).filter((a) => a.value === val)[0]
      )
    }
  //end

  const uniqueValuesFilterByKey = (array, key) => {
    return [...new Map(array.map((x) => [x[key], x])).values()];
  }

  //Adds Benefit while the modal is open 
  const addBenefit = () => {
    if(emptyJson(currentBenefitDetails)){
      return;
    }
    if(currentBenefitTypeIndex === undefined){
      setTempBenefits(tempBenefits.concat(currentBenefitDetails))
    }else{
      tempBenefits[getIndexEditingBenefit()] = currentBenefitDetails
      setTempBenefits(tempBenefits)
    }
    
    setCurrentBenefitTypeIndex();
    setCurrentBenefitDetails({});

    addBenefitIcon.src = addIcon;
  }
  
  const getIndexEditingBenefit = () => {
    return tempBenefits.map((benefit) => benefit.index === currentBenefitTypeIndex).indexOf(true)
  }

  const emptyJson = (obj) => {
    if(Object.keys(obj).length === 0)
      return true;
    
    return !obj.amountOfPeople || +obj.amountOfPeople <= 0;
  }

  const handleChangeProvider = (e) => {
    const selectedOptionName = e.target[e.target.selectedIndex].dataset?.name;
    setFilterBenefits(
      filterBenefitsByProviderId(e.target.value)
    );
    setCurrentBenefitDetails({
      "serviceProvider": {
        "id": e.target.value,
        "name": selectedOptionName,
      },
      "benefitType": {
        "id": currentBenefitType.id,
        "name": currentBenefitType.name
      },
      "amountOfPeople": 0,
      "isEmployeeChoice": false,
      "cost": 0
    });
  }

  const handleEmployeeChoiceCheckbox = (e) => {
    setCurrentBenefitDetails({
      ...currentBenefitDetails,
      "isEmployeeChoice": e.target.checked
    });
  }

  const handleBenefitDetailsCheckbox = (e) => {
    let option = filterBySelectedOption(e.target.value, e.target.options)
    setCurrentBenefitDetails({
      ...currentBenefitDetails,
      "id": option.value,
      "name": option.dataset.name,
      "pricePerUnit": option.dataset.cost,
      "amountOfPeople": 0,
      "cost": 0,
      "index": Date.now()
    })
  }

  const handleChangeAcceptTerms = () => {
    setAcceptTerms(!acceptTerms);
  }

  const filterBenefitsByProviderId = (id) => {
    return filterBenefitsByType().filter((benefit) => benefit.serviceProvider.id === id)
  }

  const handleAmountBenefit = (e) => { 
    if (currentBenefitDetails.pricePerUnit === undefined) {
      return;
    }
    if (e.target.value === undefined){
      return;
    }
    if (e.target.value === ''){
      return;
    }

    const targetValue =  parseInt(e.target.value);
    
    if (targetValue < 0){
      setCurrentBenefitDetails({
        ...currentBenefitDetails, 
        "amountOfPeople": 0,
        "cost": 0
      })
      return;
    }
    setCurrentBenefitDetails({
      ...currentBenefitDetails, 
      "amountOfPeople": targetValue,
      "cost": parseFloat(currentBenefitDetails.pricePerUnit) * targetValue,
    })
  }

  const convertToPrice = (val = 0) => {
    return (val).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });
  }

  const deleteCurrentBenefit = (e) => {
    setTempBenefits(
      tempBenefits.filter((benefit) => benefit.index !== e)
    );
  }

  const editCurrentBenefit = (i) => {
    try{
      let selectedBenefit = tempBenefits.filter((benefit) => benefit.index === i)[0]
      setCurrentBenefitTypeIndex(i);
      setCurrentBenefitDetails(
        selectedBenefit
      )
      setFilterBenefits(
        filterBenefitsByProviderId(selectedBenefit.serviceProvider.id)
      )
      addBenefitIcon.src = saveIcon;
    }
    catch(err){ console.log(err.message) }
  }

  const saveTempBenefit = () => {
    setUserBenefits(
      userBenefits.concat(tempBenefits)
    )
    closeModal(true);
  }

  const userBenefitTypesById = (id) => {
    return userBenefits.filter((benefit) => benefit.benefitType.id === id)
  }

  const getBenefitsTotal = () => {
		if(userBenefits.length < 1){
			return 0;
		}
		return userBenefits.map((b) => b.cost).reduce((acc, cost) => cost + acc);
	}

  const clearBenefitType = (childrenUserBenefits) => {
      if( window.confirm("Seguro deseas borrar esta lista de beneficios?") ){
      let difference = userBenefits.filter( benefit => !childrenUserBenefits.includes(benefit))
      setUserBenefits(difference)
    }
  }
  
  return (
    <div className="wrapper">
      <Navbar/>
      <div className="flex flex-wrap my-8">
        <div className="m-auto">
          <div className="grid gap-40 grid-cols-2">
            {
              benefitTypes.length > 0 && benefitTypes.map((benefitType, index) => {
                return(
                  
                    <Benefit 
                      key={benefitType.id.toString()}
                      setIsOpen={setIsOpen}
                      modalIsOpen={modalIsOpen}
                      mainLogo={medicPlanLogo}
                      subtitle={subtitles[index]}
                      benefitType={benefitType}
                      setCurrentBenefitType={setCurrentBenefitType}
                      userBenefits={userBenefitTypesById(benefitType.id)}
                      convertToPrice={convertToPrice}
                      hoverText={hoverBenefitText[index]}
                      clearBenefitType={clearBenefitType}
                    />
                  
                )
              })
            }
          </div>
          <div className="main-card-resume-total text-right my-10">
            <p className="text-black font-bold text-lg">
              Total Beneficios Seleccionados:  <span className="endava-text-color">{convertToPrice(getBenefitsTotal())}</span>
            </p>
            <div className="my-10">
              <p className="text-black font-bold text-xs">
                * Valores sujetos a verificación.
                <a href="./" className="endava-text-color"> Ver más información</a>
              </p>
              <p className="text-black font-bold text-xs">
                ** Si el total de tus beneficios supera el valor de tu People Pass, el excedente será descontado de tu nómina
              </p>
              <p className="text-black font-bold text-xs">
                *** Puedes realizar cambios desde el 1ro de Julio de 2021 al 12 de julio de 2021
              </p>
            </div>
          </div>
          <div className="flex space-x-4 my-20 ">
            <input type="checkbox" id="accept-terms-check" value={acceptTerms} onChange={handleChangeAcceptTerms} />
            <label htmlFor="accept-terms-check" className="flex-1 text-black font-bold">
              He leído y acepto los
              <a href="https://www.endava.com/en/Terms-and-Conditions" target="_blank" rel='noreferrer' className="flex-1 endava-text-color"> terminos y condiciones</a><br/>
              y las <a href="https://www.endava.com/en/Privacy-Notice" target="_blank" rel='noreferrer' className="flex-1 endava-text-color">politicas de privacidad y tratamiento de datos</a>
            </label>
            <button className={"endava-bg-color text-black font-bold py-2 px-4 rounded" + (!acceptTerms ? " cursor-not-allowed" : '')}>Submit</button>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        >
        <div className="modal-benefits">
          <div className="modal-header">
            <img className="close-icon-modal cursor-pointer" src={closeIcon} onClick={closeModal} alt="Close" />
            <img className="inline-block modal-logo" src={medicPlanLogo} alt="Logo"/>
            <h1 className="inline-block text-lg endava-text-color">Selecciona las opciones de tu beneficio</h1>
          </div>
          <div className="modal-body">
            <div className="modal-first-options my-5">
              <div className="text-black">                          
                <div className="relative inline-block w-full text-gray-700">
                  <select className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" 
                    placeholder="Proveedor" onChange={handleChangeProvider}
                    value={currentBenefitDetails.serviceProvider ? currentBenefitDetails.serviceProvider.id :  '0'}>
                    <option value='0' disabled>Selecciona proveedor</option>
                    { benefits.length > 0 && displayProviders() }
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                  </div>
                </div>
                <div className="relative inline-block w-full text-gray-700 my-5">
                  <select className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" 
                    placeholder="Proveedor Details" 
                    onChange={handleBenefitDetailsCheckbox}
                    value={currentBenefitDetails.id ? currentBenefitDetails.id : "0"}
                    disabled={currentBenefitDetails.serviceProvider ? false : true}>
                    <option value='0' disabled>Selecciona opción</option>
                    { filterBenefits.length > 0 && filterBenefits.map((benefit) => {
                      return (
                        <option
                          key={benefit.id.toString()}
                          data-name={benefit.name} 
                          data-cost={benefit.cost} 
                          value={benefit.id}
                        >
                          {benefit.name}
                        </option>
                      )
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                  </div>
                </div>       
              </div>
            </div>
            <div className="grid grid-cols-4 text-center m-auto">
              <p className="text-black font-bold">Cantidad</p>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  type="number" onChange={handleAmountBenefit} 
                  value={currentBenefitDetails.amountOfPeople ? currentBenefitDetails.amountOfPeople : 0}
                  disabled={currentBenefitDetails.id ? false : true}
                />
              <p className="text-black font-bold"> Precio P/U</p>
              <p className="text-black text-left">{currentBenefitDetails.pricePerUnit ? convertToPrice(parseFloat(currentBenefitDetails.pricePerUnit)) : '$0'}</p>                 
            </div>
            <div className="grid grid-cols-2 text-center m-auto my-5">
              <div>
                <input className="s" id="employee-choice" type="checkbox" 
                  onChange={handleEmployeeChoiceCheckbox}
                  disabled={currentBenefitDetails.pricePerUnit ? false : true}
                  checked={currentBenefitDetails.isEmployeeChoice ? true : false}/>
                <label htmlFor="employee-choice" className="text-black"> Lo quiero para mi</label>
              </div>
              <p className="text-black">
                Total {currentBenefitDetails.cost ? convertToPrice(currentBenefitDetails.cost) : '$0'}
              </p>
            </div>
            <img id="addBenefitIcon" className={"add-icon mr-2 float-right relative right-10 cursor-pointer" + (emptyJson(currentBenefitDetails) ? ' opacity-50 cursor-not-allowed': '' ) } src={addIcon} onClick={addBenefit} alt="Add"/>
            <div className="summary-benefit clear-both font-bold text-black">
              <p className="text-center end mb-5">Resumen</p>
            </div>
            <div>
              {
                tempBenefits.length > 0 && (
                  <table style={{background: "#E6E6E6"}} className="border-collapse border border-green-800 table-fixed mr-2 ml-2">
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
                      tempBenefits.map((userBenefit) => {
                        return (
                          <tbody key={userBenefit.index}>
                            <tr>
                              <td className="text-center font-light border text-black text-sm border-green-600">{userBenefit.name}</td>
                              <td className="text-center font-light border text-black text-sm border-green-600">{userBenefit.amountOfPeople}</td>
                              <td className="text-center font-light border text-black text-sm border-green-600">{convertToPrice(userBenefit.cost)}</td>
                              <td className="font-light border text-black text-sm border-green-600">
                                {
                                  userBenefit.isEmployeeChoice ? (<CheckIcon className="endava-text-color mx-auto h-5 w-5"/>) : (<XIcon className="endava-text-color mx-auto h-5 w-5"/>)
                                }
                              </td>
                              <td className="flex">
                                <PencilIcon className="mx-auto h-5 w-5 cursor-pointer" onClick={() => editCurrentBenefit(userBenefit.index)}/>
                                <TrashIcon className="mx-auto h-5 w-5 cursor-pointer" onClick={() => deleteCurrentBenefit(userBenefit.index)}/>
                              </td>
                            </tr>
                          </tbody>
                        )
                      })
                    }
                  </table>
                )
              }
            </div>
            <p className="text-black text-xs text-center my-5 clear-both">*Valores sujetos a verificación. <span className="endava-text-color">Ver mas información.</span></p>
            <div className="modal-footer mx-10">
              <button 
                className={'bg-gray-500 endava-text-color text-black py-2 px-4 rounded text-right float-right mb-5' + (!tempBenefits.length ?  ' cursor-not-allowed' : '') }
                onClick={() => saveTempBenefit()}
                disabled={ !tempBenefits.length }
                >Submit
              </button> 
            </div> 
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default FlexibleBenefits
