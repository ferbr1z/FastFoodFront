import { useEffect, useState } from 'react'
import { Nav } from './components/Nav.jsx'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductosList } from './components/productos/ProductosList.jsx'
import { Container } from './components/Container.jsx'
import { useErrorModal } from './hooks/useErrorModal.js'
import { ErrorModal } from './components/utils/Modals/ErrorModal.jsx'
import { PedidosList } from './components/pedidos/PedidosList.jsx'
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
              <Route path='/productos' element={<ProductosList />} >
                <Route path=':page' element={<ProductosList />} />
              </Route>
              <Route path='/pedidos' element={<PedidosList />} >
                <Route path=':page' element={<PedidosList />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Container>
        <ErrorModal modalData={errorModalState} closeModal={closeErrorModal} />
    </>
  )
}

export default App
