import { useState } from "react";
import { MDBInput, MDBBtn, MDBRow, MDBCol, MDBContainer, MDBSpinner } from 'mdb-react-ui-kit';
import { useNavigate, Link } from "react-router-dom";
import ErrorForm from "../Error/ErrorForm";

const FormLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setError(false);
            setLoading(true);

            const response = await fetch("http://localhost:5190/api/Authentication/AuthenticateUser", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw response
            }

            const data = await response.json();

            localStorage.setItem("clinica-token", JSON.stringify(data));

            navigate('/');
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    return (
        <MDBContainer className="p-4 p-md-5 flex items-center justify-center min-w-100% min-h-screen">
            <form onSubmit={handleSubmit} className="border border-gray-50 shadow-md p-12 rounded-lg w-full max-w-[700px]">

                {error && (
                    <ErrorForm />
                )}

                <h3 className="mb-4 text-center font-semibold text-4xl">Ingresa con tu cuenta</h3>
                <div className="w-full flex flex-col items-center justify-center">
                    <MDBCol className="mb-4 w-[90%]">
                        <MDBInput
                            label="Email"
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </MDBCol>
                    <MDBCol className="mb-4 w-[90%]">
                        <MDBInput
                            label="Contraseña"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </MDBCol>

                    <MDBBtn type="submit" color="primary" className="mt-4 w-[90%]" disabled={loading}>
                        {loading ? (
                            <MDBSpinner size='sm' />
                        ) : (
                            <p className="m-0 p-0">Iniciar sesion</p>
                        )}
                    </MDBBtn>
                </div>

                <p className="mt-6 text-center ">
                    ¿No tenes cuenta? <Link to="/register">Registrate aquí</Link>
                </p>
            </form>
        </MDBContainer>
    );
};

// Login.propTypes = {
//     onLogin: PropTypes.func,
// 

export default FormLogin;