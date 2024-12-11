import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText
} from '@ionic/react';
import { useAuthContext } from '../context/AuthContext';
import { Container, FormControl, FormLabel } from 'react-bootstrap';

export const LoginPage: React.FC = () => {
  const { login, loading, error } = useAuthContext();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      navigate('/home');
    } catch (err) {
      // El error ya está manejado por el hook
    }
  };

  return (
    <section className='py-3 py-md-5'>
      <Container>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className='card border border-light-subtle rounded-3 shadow-sm'>
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="text-center mb-3">
                  <img src="/logo.jpg" alt="BootstrapBrain Logo" className='img-responsive' width="300" />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row gy-2 overflow-hidden p-sm-3">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <FormControl onChange={handleChange} name='email' className="form-control" placeholder='Usuario' type='text' />
                        <FormLabel>Usuario</FormLabel>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <FormControl onChange={handleChange} name='password' className="form-control" placeholder='Contraseña' type='password' />
                        <FormLabel>Contraseña</FormLabel>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="mt-4 btn btn-warning btn-lg"
                          disabled={loading}
                        >
                          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className="p-2 text-danger text-center fw-bold mt-3">
                      {error}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
};
