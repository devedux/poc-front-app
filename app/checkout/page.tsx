import Checkout from '../components/Checkout'
import { CheckoutProvider } from '../contexts/CheckoutContext'

export default function CheckoutPage() {
  return (
    <main>
      <CheckoutProvider>
        <Checkout isUserEligible={true} />
      </CheckoutProvider>
    </main>
  )
}
