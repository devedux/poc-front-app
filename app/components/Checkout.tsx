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
    <div data-test-id="modular-checkout">
      <h1 data-test-id="checkout-title">Order de tu pedido</h1>

      <div data-test-id="order-summary">
        <p data-test-id="order-amount">Total: $100.00 USD</p>
        <p data-test-id="payment-method">Método: DEUNA</p>
      </div>

      {/* NIVEL FÁCIL: data-test-id renombrado + texto del botón cambiado */}
      {!confirmed ? (
        <button
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Confirmar pago'}
        </button>
      ) : (
        <div data-test-id="confirmation-message">
          <p>Pago confirmado exitosamente</p>
          <button data-test-id="cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      )}

      {/* NIVEL MEDIO: onClick movido del div wrapper al button */}
      <div data-test-id="alternative-pay-wrapper">
        <button
          data-test-id="alternative-pay-btn"
          onClick={() => alert('Pago alternativo iniciado')}
        >
          Pagar con otro método
        </button>
      </div>

      {/* NIVEL DIFÍCIL: ahora depende de prop Y de que no esté confirmado */}
      {isUserEligible && !confirmed && (
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
