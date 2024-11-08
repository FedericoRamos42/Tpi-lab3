import React from 'react'

const ErrorForm = () => {
    return (
        <div className='m-4'>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-center rounded relative mb-4" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline text-sm pl-2">Hubo un error. Por favor, inténtalo de nuevo más tarde.</span>
            </div>
        </div>
    )
}

export default ErrorForm;