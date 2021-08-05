import React from 'react'
import endavaLogo from '../../../assets/images/endavaLogo.jpg'

const Header = () => {
    return (
        <header className="text-gray-600 body-font bg-teal shadow-lg">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a href="./" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img src={endavaLogo} alt="Endava.com" />
                </a>
                <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <h1 className="font-semibold text-xl text-yellow-500">
                        Flexible Benefits
                    </h1>
                </div>
                <div className="inline-flex items-center py-1 px-6 mt-4 mr-12 md:mt-0">
                    &nbsp;
                </div>
            </div>
        </header>
    )
}

export default Header