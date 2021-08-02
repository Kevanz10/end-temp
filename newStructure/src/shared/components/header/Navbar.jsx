import React from 'react'
import logo from '../../../assets/images/endavaLogo.jpg';
import '../../../assets/css/navbar.css'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'

const Navbar = ({ children }) => {
    return (
        <nav className="flex items-center justify-between flex-wrap pl-6 pr-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={logo}/>
      </div>
      <div className="block lg:hidden">
        
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto  pt-4">
        <div className="text-sm lg:flex-grow">
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 mr-4">
            Download report file
          </a>
        </div>
        <div>
          { children }
          <div className="inline-block">
            <AmplifySignOut class="pr-5"/>
          </div>
          <div className="ml-6 rounded-question-mark inline-block text-sm px-4 py-2 mt-4 lg:mt-0 relative hover-trigger top-4">
            <QuestionMarkCircleIcon className="mx-auto h-8 w-8" onClick={() => ""}/>
            <div className="absolute bg-white border border-grey-100 px-4 py-2 hover-target">
              <p className="text-black text-xs">
                Si tienes dudas sobre los beneficios, escribenos a <span className="endava-text-color">HRC.colombia@endava.com</span>.com
                <br/>
                Si deseas reportar un inconveniente, por favor escribenos a <span className="endava-text-color">FBsupport@endava.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    )
}

export default Navbar
