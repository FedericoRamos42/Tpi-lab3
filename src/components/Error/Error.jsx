import {  MDBIcon } from 'mdb-react-ui-kit';

const Error = () => {
    return (
        <div className="w-full text-center text-gray-400">
            <MDBIcon fas icon="exclamation" className='ms-1 mb-3' size='5x'/>
            <p>Ocurrió un error al cargar el contenido. Revisa tu conexión a internet o vuelve a intentarlo en unos minutos.</p>
        </div>
    );
};

export default Error;