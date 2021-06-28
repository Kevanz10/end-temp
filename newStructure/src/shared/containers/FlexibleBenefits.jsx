import React, { useState } from 'react'
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

const FlexibleBenefits = (props) => {
    const { user } = props
    console.log(user);
    
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

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

    const handleChangeCheckBox = () => {
        setAcceptTerms(!acceptTerms);
    };

    const displayEntries = (benefitsDts.length > 0 &&
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

    return (
        <div className="wrapper">
            <Navbar>
                <AmplifySignOut />
            </Navbar>

            <div className="flex flex-wrap my-8">
                <div className="m-auto">
                    <div className="grid gap-40 grid-cols-2">
                        <div>
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
                            <a href="" className="flex-1 endava-text-color"> terminos y condiciones </a> <br />
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
                                <img className="close-icon-modal" src={closeIcon} onClick={closeModal} />
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
    )
}

export default FlexibleBenefits
