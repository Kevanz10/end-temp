import React from 'react'
import addIcon from '../../assets/images/addIcon.png';
import deleteIcon from '../../assets/images/deleteIcon.png';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'

const Benefit = (props) => {
	const { 
		mainLogo, title, subtitle, benefitType, 
		userBenefits, convertToPrice, hoverText,
		filterBenefitsByProviderId, currentBenefitType,
		userBenefitTypesById
	} = props

	const parseTitle = () => {
		return benefitType.name.split(" ")
	}
		
	const editBenefit = () => {
		props.setCurrentBenefitType(benefitType);
		props.setIsOpen(true);
	}

	const getTotalAmount = () => {
		if(userBenefitTypesById(benefitType.id).length < 1){
			return 0;
		}
		return userBenefitTypesById(benefitType.id).map((b) => b.cost).reduce((acc, cost) => cost + acc);
	}

	return (
		<div className="card">
			<div className="cards-header flex flex-row">
				<img className="card-logo" src={mainLogo} />
				<p className="text-lg text-white font-bold">
					{parseTitle()[0]}
					<span className="text-white endava-text-color"> {parseTitle()[1][0]}</span>
					{parseTitle()[1].substring(1)}
				</p>
			</div>
			<div className="card-body">
				<div className="relative flex space-x-4 my-4">
					<div className="flex-1">
						<h1 className="text-lg text-center text-black font-bold">{props.title}</h1>
					</div>
					<div className="benefit-details">
						<QuestionMarkCircleIcon className="add-icon mr-6" onClick={() => ""}/>
					</div>
					<p className="absolute text-black text-xs whitespace-pre-wrap benefit-info p-4">
						{hoverText}
					</p>
				</div>

				<div className="flex space-x-4 my-4">
					<div className="flex-1">
						<p className="pl-5 text-m text-left text-black">{subtitle}</p>
					</div>
					<div onClick={() => editBenefit(props)}>
						<img className="add-icon mr-6 jeje" src={addIcon} />	
					</div>
				</div>

				<div>
					{
						userBenefits.length > 0 && userBenefitTypesById(benefitType.id).map( (userBenefit, index) => {
							return (
								<div className={(index % 2 === 0 ? "benefit-resume-row-gray" : "benefit-resume-row-orange")}>
									<span className="pl-6">{userBenefit.name}</span>
									<div className="relative flex">
										<div className="flex-1 text-center">
											<span className="">{userBenefit.serviceProvider.name} x {userBenefit.amountOfPeople}</span>
										</div>
										<div className="benefit-details pr-5">
											<span className="">{convertToPrice(userBenefit.cost)}</span>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
				<div className="card-details h-40"></div>
				<div className="card-actions">
					<div className="flex space-x-4 my-4">
						<img className="h-8 pl-10" src={deleteIcon} />
						<p className="flex-1 text-lg text-center text-black font-bold">Total</p>
						<p className="flex-1 text-lg text-left text-black font-bold endava-text-color">{convertToPrice(getTotalAmount())}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Benefit
