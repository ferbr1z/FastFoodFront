import { useEffect, useState } from 'react'
import { Nav } from './components/Nav.jsx'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductosView } from './components/productos/ProductosView.jsx'
import { Container } from './components/Container.jsx'
import { useErrorModal } from './hooks/useErrorModal.js'
import { ErrorModal } from './components/utils/Modals/ErrorModal.jsx'
import { PedidosView } from './components/pedidos/PedidosView.jsx'
function App() {
  const { errorModalState, hideErrorModal } = useErrorModal();

  const closeErrorModal = () => {
    hideErrorModal();
  }

  return (
    <>
        <Nav />
        <Container>
          <BrowserRouter>
            <Routes>
              <Route path='/productos' element={<ProductosView />} >
                <Route path=':page' element={<ProductosView />} />
              </Route>
              <Route path='/pedidos' element={<PedidosView />} >
                <Route path=':page' element={<PedidosView />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Container>
        <ErrorModal modalData={errorModalState} closeModal={closeErrorModal} />
    </>
  )
}

export default App
