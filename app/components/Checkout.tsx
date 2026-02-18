'use client'

import { useState } from 'react'

interface CheckoutProps {
  isUserEligible?: boolean
}

export default function Checkout({ isUserEligible = true }: CheckoutProps) {
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const handlePay = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setConfirmed(true)
    setLoading(false)
  }

  const handleCancel = () => {
    setConfirmed(false)
  }

  return (
    <div data-test-id="checkout-container">
      <h1 data-test-id="checkout-title">Resumen de tu pedido</h1>

      <div data-test-id="order-summary">
        <p data-test-id="order-amount">Total: $100.00 USD</p>
        <p data-test-id="payment-method">Método: DEUNA</p>
      </div>

      {/* NIVEL FÁCIL: data-test-id y texto directo — fácil de detectar si cambia */}
      {!confirmed ? (
        <button
          data-test-id="checkout-btn"
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Pagar'}
        </button>
      ) : (
        <div data-test-id="confirmation-message">
          <p>Pago confirmado exitosamente</p>
          <button data-test-id="cancel-btn" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      )}

      {/* NIVEL MEDIO: el evento onClick está en el div padre, no en el button */}
      <div
        data-test-id="alternative-pay-wrapper"
        onClick={() => alert('Pago alternativo iniciado')}
      >
        <button data-test-id="alternative-pay-btn">
          Pagar con otro método
        </button>
      </div>

      {/* NIVEL DIFÍCIL: elemento condicionado por prop — puede no estar en el DOM */}
      {isUserEligible && (
        <button
          data-test-id="deuna-express-btn"
          onClick={handlePay}
        >
          Pago Express DEUNA
        </button>
      )}
    </div>
  )
}
