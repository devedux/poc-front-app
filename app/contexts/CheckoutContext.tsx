import React, { createContext, useContext, useMemo, useState } from "react"

type CheckoutState = 'idle' | 'loading' | 'confirmed' | 'canceled'

interface CheckoutContextStore {
    state: CheckoutState;
    setState: React.Dispatch<React.SetStateAction<CheckoutState>>
}

const defaultState: CheckoutContextStore = {
    state: 'idle',
    setState: () => { }
}

const CheckoutContext = createContext<CheckoutContextStore>(defaultState)


export const CheckoutProvider = (props: React.PropsWithChildren<{}>) => {
    const [state, setState] = useState<CheckoutState>('idle')

    const store = useMemo(() => ({
        state,
        setState
    }), [])

    return (
        <CheckoutContext.Provider value={store} >{props.children}</CheckoutContext.Provider>
    )
}

export const useCheckoutContext = () => {
    const ctx = useContext(CheckoutContext);
    if (!ctx) {
        throw new Error('useCheckoutContext must be used within CheckoutContext.tsx')
    }

    return ctx
}
