import React from 'react'
import addIcon from '../../assets/images/addIcon.png';
import deleteIcon from '../../assets/images/deleteIcon.png';

const Benefit = (props) => {
    const { mainLogo, title, subtitle } = props
  
    const parseTitle = () => {
      return title.split(" ")
    }
  
    const editBenefit = () => {
      props.setIsOpen(true)
    }

    return (
        <div className="card">
            <div className="cards-header flex flex-row ...">
                <img className="card-logo" src={mainLogo} />
                <p className="text-lg text-white font-bold">
                    {parseTitle()[0]}
                    <span className="text-white endava-text-color"> {parseTitle()[1][0]}</span>
                    {parseTitle()[1].substring(1)}
                </p>
            </div>
            <div className="card-body">
                <h1 className="text-lg text-center text-black font-bold">{props.title}</h1>
                <div className="flex space-x-4 ... my-4">
                    <div className="flex-1 ...">
                        <p className="pl-5 text-sm text-left text-black">{subtitle}</p>
                    </div>
                    <div onClick={() => editBenefit(props)}>
                        <img className="add-icon mr-2" src={addIcon} />
                    </div>
                </div>

                <div className="card-details h-40">
                </div>
                <div className="card-actions">
                    <div className="flex space-x-4 ... my-4">
                        <img className="h-8" src={deleteIcon} />
                        <p className="flex-1 text-lg text-center text-black font-bold">Total</p>
                        <p className="flex-1 text-lg text-left text-black font-bold endava-text-color">2.000.000</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Benefit
