import { API, Auth } from 'aws-amplify';
//endpoints
export const getBenefitType = async () => await API.get('FBApi', '/benefitType', {
  headers: { 
    Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
  },
    'queryStringParameters': {
    'max_recs': '200'
  }
})

//benefit
export const getBenefit = async(benefitTypeId) => await API.get('FBApi', '/benefit', {
  headers: { 
    Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
  },
    'queryStringParameters': {
    'max_recs': '200'
  }
});

export const subtitles = [
  "Plan de medicina prepagada", 
  "Plan Dental", 
  "Asegura tu mascota",
  "Seguro de vida, elige tu monto a asegurar:", 
]

export const customStyles = {
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

export const hoverBenefitText = [
  "Podrás tomar un plan médico externo en la categoría de póliza de salud o plan de medicina prepagada, y deberás enviar certificado de afiliación a hrc.colombia@endava.com (No aplica Planes Complementarios ni EPS). \n \nEl colaborador podrá tener un plan médico y sus beneficiarios no estarán sujetos a una afiliación con la misma entidad. \nProducto con IVA del 5%",
  "Producto con IVA del 5%",
  "La afiliación de tus beneficiarios dependerá que seas el titular de ese contrato. \n Producto con IVA del 5%",
  "Producto sin IVA",
  "Producto con IVA del 19%"
]